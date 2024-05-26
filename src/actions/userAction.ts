"use server"

import { db } from "@/server/db"

export async function getUserDetailsByAuthId({ authId }: { authId: string }) {
    const user = await db.user.findFirst({
        where: {
            authId: authId,
        }
    })

    return user;
}