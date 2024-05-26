"use client";
import React, { Suspense, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import Dropzone from "react-dropzone";

import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

import { CheckCheck, Cloudy, LoaderCircle } from "lucide-react";

function UploaderComponent() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [updatingImageUrl, setUpdatingImageUrl] = useState(false);
  const [updateComplete, setUpdatingComplete] = useState(false);

  //* Getting id from search parameters
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader");

  //* Validating the id
  if (!id || id === undefined) return redirect('/error')
  const expectedIdSchema = z.string().min(20).max(28);
  const parsedId = expectedIdSchema.safeParse(id);

  //* This is to show a progress bar when uploading
  const startFakedUploadProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval);
          return prevProgress;
        }

        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  async function updateImage(url: string) {
    setUpdatingImageUrl(true);
    const res = await fetch("/api/product/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parsedId.data,
        image: url,
      }),
    });

    if (!res.ok) {
      setUpdatingImageUrl(false);
      return toast({
        title: "Something went wrong",
        description: "File not saved on the database",
        variant: "destructive",
      });
    }

    if (res.ok) {
      const product: unknown = res.json();

      // * Reset the loading state
      setUpdatingImageUrl(false);
      setUpdatingComplete(true);

      // * Redirect to the product detail page
      // @ts-expect-error
      router.replace(`/shop/${product.id}`);

      return toast({
        title: "Success",
        description: "File saved on the database",
      });
    }
  }

  if (parsedId.error) {
    return (
      <div className="mx-auto mt-[6rem] max-w-lg">
        The recently created product was not found !!
      </div>
    );
  }

  return (
    <div className="mx-auto mt-[6rem] max-w-lg">
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          const progressInterval = startFakedUploadProgress();

          // Upload the file to uploadthing
          const res = await startUpload(acceptedFile);

          if (!res) {
            setUploadProgress(0);
            toast({
              variant: "destructive",
              title: "Something went wrong",
              description: "Only images can be uploaded",
            });
          } else {
            if (!res[0]?.url) {
              setUploadProgress(0);
              return toast({
                title: "Something went wrong",
                description: "File not saved on the database",
                variant: "destructive",
              });
            }

            // Clear interval after the upload
            clearInterval(progressInterval);
            setUploadProgress(100);

            // Update image url in the database
            await updateImage(res[0]?.url);
          }
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className="mx-auto flex size-[25rem] flex-col items-center justify-center rounded-md border-2 border-dashed"
          >
            <div className="flex flex-col items-center justify-center">
              <Cloudy />
              <span className="text-center">
                Drag &apos;n&apos; drop here or click to upload image
              </span>
            </div>
            {isUploading ? (
              <div
                className={cn(
                  "mx-auto mt-4 w-full max-w-xs",
                  uploadProgress === 0 ? "hidden" : "",
                )}
              >
                <Progress
                  successColor={uploadProgress === 100 ? "bg-green-500" : ""}
                  value={uploadProgress}
                  className="h-2 bg-zinc-300"
                />
              </div>
            ) : null}

            {uploadProgress === 100 ? (
              <div className="flex items-center justify-center gap-2 pt-4 text-center text-sm text-zinc-500">
                <CheckCheck className="text-green-500" />
                <p>Upload complete...</p>
              </div>
            ) : null}

            {updatingImageUrl === true ? (
              <div className="flex flex-col items-center justify-center gap-2 pt-4 text-center text-sm text-zinc-500">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                <p>Updating in the database...</p>
              </div>
            ) : null}

            {updateComplete ? (
              <div className="flex flex-col items-center justify-center gap-2 pt-4 text-center text-sm text-zinc-500">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                <span>Updating in the database</span>
              </div>
            ) : null}

            <input
              {...getInputProps()}
              className="hidden"
              type="file"
              id="dropzone_file"
            />
          </div>
        )}
      </Dropzone>
    </div>
  );
}

export default function UploadImage() {
  return (
    <Suspense>
      <UploaderComponent />
    </Suspense>
  )
}
