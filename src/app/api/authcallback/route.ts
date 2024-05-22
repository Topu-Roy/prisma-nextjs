import { db } from "@/server/db";
import { authCallbackBodySchema } from "@/zod/authcallback/authcallback";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    if (!body) return NextResponse.json({ message: "Body not found" }, { status: 401 });

    //* We validate the body of the request
    const validateBody = authCallbackBodySchema.safeParse(body);
    if (!validateBody.success) return NextResponse.json({ message: validateBody.error }, { status: 500 });

    //* First we check if the user has already been created
    const isUserAlreadyExist = await db.user.findFirst({
        where: {
            authId: validateBody.data.authId,
        },
    });

    if (isUserAlreadyExist) {

        // * If any changes have been made to the user profile
        // * Then we update database also
        if (validateBody.data.firstName !== isUserAlreadyExist.firstName) {
            const updateUser = await db.user.update({
                where: {
                    id: isUserAlreadyExist.id
                },
                data: {
                    firstName: validateBody.data.firstName
                }
            })

            return NextResponse.json({ user: updateUser }, { status: 200 });
        }

        if (validateBody.data.lastName !== isUserAlreadyExist.lastName) {
            const updateUser = await db.user.update({
                where: {
                    id: isUserAlreadyExist.id
                },
                data: {
                    lastName: validateBody.data.lastName
                }
            })

            return NextResponse.json({ user: updateUser }, { status: 200 });
        }

        if (validateBody.data.imageUrl !== isUserAlreadyExist.imageUrl) {
            const updateUser = await db.user.update({
                where: {
                    id: isUserAlreadyExist.id
                },
                data: {
                    imageUrl: validateBody.data.imageUrl
                }
            })

            return NextResponse.json({ user: updateUser }, { status: 200 });
        }

        return NextResponse.json({ user: isUserAlreadyExist }, { status: 200 });
    }

    //* If the user does not exist in the database
    //* Then we create a new user in the database
    const newUser = await db.user.create({
        data: {
            authId: validateBody.data.authId,
            imageUrl: validateBody.data.imageUrl,
            role: validateBody.data.role,
            firstName: validateBody.data.firstName,
            lastName: validateBody.data.lastName,
            email: validateBody.data.email,
        },
    });

    return NextResponse.json({ user: newUser }, { status: 200 });
}
