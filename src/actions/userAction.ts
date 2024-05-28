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

export async function getTotalUsersCount({ authId }: { authId: string }) {

    const admin = await db.user.findFirst({
        where: {
            authId,
        }
    })

    if (!admin || admin.role !== 'ADMIN') {
        return null;
    }

    const userCount = await db.user.count();

    return userCount;
}