"use server"

import { db } from "@/server/db";

type UserInfo = {
    authId: string;
    role: "USER" | "ADMIN";
    imageUrl: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
}

export async function syncUser(props: UserInfo) {
    //* First we check if the user has already been created
    const isUserAlreadyExist = await db.user.findFirst({
        where: {
            authId: props.authId,
        },
    });

    if (isUserAlreadyExist) {

        // * If anything changes to the user profile
        // * Then we update database also
        if (props.firstName !== isUserAlreadyExist.firstName) {
            const updateUser = await db.user.update({
                where: {
                    id: isUserAlreadyExist.id
                },
                data: {
                    firstName: props.firstName
                }
            })

            return { user: updateUser };
        }

        if (props.lastName !== isUserAlreadyExist.lastName) {
            const updateUser = await db.user.update({
                where: {
                    id: isUserAlreadyExist.id
                },
                data: {
                    lastName: props.lastName
                }
            })

            return { user: updateUser };
        }

        if (props.imageUrl !== isUserAlreadyExist.imageUrl) {
            const updateUser = await db.user.update({
                where: {
                    id: isUserAlreadyExist.id
                },
                data: {
                    imageUrl: props.imageUrl
                }
            })

            return { user: updateUser };
        }

        return { user: isUserAlreadyExist };
    }

    //* If the user does not exist in the database
    //* Then we create a new user in the database
    const newUser = await db.user.create({
        data: {
            authId: props.authId,
            imageUrl: props.imageUrl,
            role: props.role,
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email,
        },
    });

    return { user: newUser };
}