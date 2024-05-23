import Image from 'next/image';
import React from 'react';
import { Heading } from '@/app/_components/heading';
import { Text } from '@/app/_components/text';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type props = {
    teamMembers: {
        id: number;
        role: string;
        name: string;
        imageUrl: string;
    }[];
    className?: string;
};

export default function Team(props: props) {
    const { teamMembers, className } = props;
    return (
        <div className={cn("pb-10 md:pb-14 lg:pb-16", className)}>
            <Heading className="text-center py-10 md:py-14 lg:py-16">Meet Our Talented Team Members</Heading>
            <div className="flex flex-wrap justify-center items-center gap-2 mx-auto max-w-7xl">
                {teamMembers.map((member) => (
                    <Card key={`${member.id}-member-card`} className='w-[45%] md:w-[31%] p-2'>
                        <Image
                            className='rounded-md aspect-square'
                            src={member.imageUrl}
                            height={400}
                            width={400}
                            alt={member.name + " " + member.role}
                        />
                        <div className="flex md:flex-col lg:flex-row justify-start items-center gap-2 py-2">
                            <Text className='font-semibold' size='md'>{member.name}</Text>
                            <Text className='' size='xs'>({member.role})</Text>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
