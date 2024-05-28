'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import Dropzone from 'react-dropzone'
import { updateImageUrl } from '@/actions/productAction'
import { Cloud, File, Loader2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export default function UpdateImage() {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [updatingURL, setUpdatingURL] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id || id === null) {
        return (
            <div className="mt-[4rem] py-20 max-w-7xl mx-auto text-center">
                Product id not found
            </div>
        )
    }

    const { isUploading, startUpload } = useUploadThing('imageUploader')

    const startFakedUploadProgress = () => {
        setUploadProgress(0)

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 90) {
                    clearInterval(interval)
                    return prevProgress
                }

                return prevProgress + 5
            })
        }, 500)

        return interval;
    }

    return (
        <div className='mt-[4rem] py-20 max-w-7xl mx-auto'>
            <Dropzone
                multiple={false}
                onDrop={async (acceptedFiles) => {
                    // Start the progress bar
                    const progressInterval = startFakedUploadProgress()

                    // Upload the file to uploadthing
                    const res = await startUpload(acceptedFiles)

                    if (!res) {
                        setUploadProgress(0)
                        toast({
                            variant: 'destructive',
                            title: "Something went wrong",
                            description: "Only images can be uploaded",
                        })
                    }

                    if (!res) {
                        return toast({
                            title: 'Something went wrong',
                            description: 'File not saved on the database',
                            variant: 'destructive',
                        })
                    }

                    //* If upload is successful we save the url to the database
                    if (res[0]?.url) {
                        setUpdatingURL(true);

                        // Clear interval after the upload
                        clearInterval(progressInterval)
                        setUploadProgress(100)

                        //* Saving the url to the database
                        const response = await updateImageUrl({
                            productId: id,
                            imageUrl: res[0].url
                        })

                        if (response.status === 'NOT_FOUND') {
                            setUpdatingURL(false);
                            return toast({
                                title: 'Something went wrong',
                                description: 'Product not found on the database',
                                variant: 'destructive',
                            })
                        }

                        if (response.status === 'FAILED') {
                            setUpdatingURL(false);
                            return toast({
                                title: 'Something went wrong',
                                description: 'Failed to update url on the database',
                                variant: 'destructive',
                            })
                        }

                        if (response.status === 'SUCCESS') {
                            router.replace(`/shop/${id}`)
                        }

                    }
                }}
            >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                    <div
                        {...getRootProps()}
                        className="border-[2px] h-64 m-4 border-dashed border-gray-300 rounded-lg"
                    >
                        <div className="flex justify-center items-center h-full w-full">
                            <label
                                htmlFor="dropzone_file"
                                className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
                            >
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                    <p className="mb-2 text-sm text-zinc-700">
                                        <span className="font-semibold">Click to upload</span> or Drag &apos;n&apos; drop
                                    </p>
                                    <p>
                                        Image&apos;s only
                                    </p>
                                </div>

                                {acceptedFiles && acceptedFiles[0] ? (
                                    <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline-[1.5px] outline-zinc-200 divide-x divide-zinc-200">
                                        <div className="px-3 py-2 grid place-items-center">
                                            <File className="h-4 w-4 text-blue-500" />
                                        </div>
                                        <div className="px-3 py-2 truncate">
                                            <p className=" text-sm truncate">
                                                {acceptedFiles[0].name}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}

                                {isUploading ? (
                                    <div className={
                                        cn("w-full mt-4 max-w-xs mx-auto", uploadProgress === 0 ? "hidden" : '')
                                    }>
                                        <Progress
                                            successColor={uploadProgress === 100 ? "bg-green-500" : ''}
                                            value={uploadProgress}
                                            className="h-2 bg-zinc-300"
                                        />
                                    </div>
                                ) : null}

                                {uploadProgress === 100 && updatingURL ? (
                                    <div className="flex justify-center items-center flex-col pt-4 gap-2 text-zinc-500 text-sm text-center">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <p>Redirecting...</p>
                                    </div>
                                ) : null}

                                <input
                                    {...getInputProps()}
                                    className="hidden"
                                    type="file"
                                    id="dropzone_file"
                                />
                            </label>
                        </div>
                    </div>
                )}

            </Dropzone>
        </div>
    )
}
