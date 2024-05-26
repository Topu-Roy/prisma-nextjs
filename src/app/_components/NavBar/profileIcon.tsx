import React from 'react'
import Link from 'next/link';
import { Text } from '../text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getUserDetailsByAuthId } from '@/actions/userAction';
import { fallbackUserImageUrl } from '@/lib/defaults';
import { cn } from '@/lib/utils';

type Props = {
    userId: string;
    firstName: string;
    lastName: string;
}

export default async function ProfileIcon({ userId, firstName, lastName }: Props) {
    const user = await getUserDetailsByAuthId({ authId: userId })
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className={cn("ring-1 ring-primary", user?.imageUrl === fallbackUserImageUrl ? "p-2" : "")}>
                    <AvatarImage
                        src={user?.imageUrl ?? fallbackUserImageUrl}
                        alt={`${firstName} ${lastName}`}
                    />
                    <AvatarFallback>{firstName[0]?.toUpperCase()}{lastName[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className='max-w-md p-0'>
                <Card className='gap-4 divide-y flex flex-col justify-center items-center p-8'>
                    <div className="flex flex-col justify-center items-center gap-2">
                        {/* //TODO: Upload own profile image */}
                        <Avatar className={cn("ring-1 ring-primary", user?.imageUrl === fallbackUserImageUrl ? "p-2" : "")}>
                            <AvatarImage
                                src={user?.imageUrl ?? fallbackUserImageUrl}
                                alt={`${firstName} ${lastName}`}
                            />
                            <AvatarFallback>{firstName[0]?.toUpperCase()}{lastName[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Text className='font-semibold'>{`${firstName} ${lastName}`}</Text>
                    </div>
                    <Link href={'/api/auth/logout?post_logout_redirect_url=/authcallback'}>
                        <Button>Log Out</Button>
                    </Link>
                </Card>
            </PopoverContent>
        </Popover>
    )
}
