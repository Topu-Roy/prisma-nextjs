import React from 'react'
import { type User, columns } from "./columns"
import { DataTable } from "./data-table"
import { getAllUsersByAdminId } from '@/actions/userAction'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

// async function getData(): Promise<Array<Omit<Omit<User, "id">, "authId">>> {
async function getData(): Promise<Array<User>> {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) return redirect("/home");

    const users = await getAllUsersByAdminId({ adminId: user.id });

    if (!users) return redirect("/home");

    return users;
}

export default async function Customers() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
