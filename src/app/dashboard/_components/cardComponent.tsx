import { Text } from "@/app/_components/text"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

type CardComponentPropsType = {
    count: number,
    title: string,
    icon: React.ReactElement,
    iconClassName?: string,
    link: string
}

export default function CardComponent({ count, title, icon, iconClassName, link }: CardComponentPropsType) {
    return (
        <Link href={link} className="w-full">
            <Card className='p-4 text-left space-y-3 w-full'>
                <div className="flex justify-between items-center">
                    <Text muted size='md' className='font-bold'>
                        {title}
                    </Text>
                    <span className={cn('text-black/40', iconClassName)}>
                        {icon}
                    </span>
                </div>
                <Text size='max' className='font-bold text-black/90'>
                    {count}
                </Text>
            </Card>
        </Link>
    )
}