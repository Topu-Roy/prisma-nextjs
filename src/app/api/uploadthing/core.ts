import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/server/db";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            // This code runs on your server before upload
            const { getUser } = getKindeServerSession()
            const user = await getUser()

            if (!user) throw new UploadThingError("Unauthorized");

            const userFromDB = await db.user.findFirst({
                where: {
                    authId: user.id
                }
            })

            if (userFromDB?.role !== 'ADMIN') throw new UploadThingError("Forbidden");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { isAdmin: true }
        })
        .onUploadComplete(async ({ file }) => ({ fileUrl: file.url })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;