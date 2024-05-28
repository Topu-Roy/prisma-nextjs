"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteUserByEmail, removeAsAdmin } from "@/actions/userAction"
import { useRouter } from "next/navigation"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { toast } from "@/components/ui/use-toast"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    id: string;
    authId: string;
    role: "USER" | "ADMIN";
    email: string | null;
    imageUrl: string | null;
    firstName: string | null;
    lastName: string | null;
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "firstName",
        header: "FirstName",
    },
    {
        accessorKey: "lastName",
        header: "LastName",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "imageUrl",
        header: "ImageUrl",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { getUser, isLoading } = useKindeBrowserClient();
            const admin = getUser();
            const user = row.original;
            const router = useRouter();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.email ?? "")}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                async function removeAdmin() {
                                    //* If auth id is not loaded yet
                                    if (isLoading) {
                                        return toast({
                                            title: "Resources loading",
                                            description: "Please wait...",

                                        })
                                    }

                                    if (!user.email) return;

                                    const res = await removeAsAdmin({
                                        adminId: admin?.id!,
                                        targetId: user.id,
                                    })

                                    if (res.action === 'UNAUTHORIZED') {
                                        return toast({
                                            variant: "destructive",
                                            title: "Unauthorized",
                                            description: "You are not authorized to perform this action",
                                        });
                                    }

                                    if (res.action === 'ALREADY_USER') {
                                        return toast({
                                            title: "Already user",
                                            description: "This user is already a user",
                                        });
                                    }

                                    if (res.action === 'MADE_USER') {
                                        router.refresh();
                                        return toast({
                                            title: "Role changed",
                                            description: "This admin is now an user",
                                        });
                                    }
                                }

                                void removeAdmin();
                            }}
                        >
                            Remove admin
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="bg-rose-400 hover:bg-rose-500"
                            onClick={() => {
                                async function deleteUser() {

                                    if (!user.email) return;

                                    await deleteUserByEmail({
                                        email: user.email,
                                        id: user.id,
                                    })
                                }

                                void deleteUser().then(() => { router.refresh() });
                            }}
                        >
                            Delete user
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
