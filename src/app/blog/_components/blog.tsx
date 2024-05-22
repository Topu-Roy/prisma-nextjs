import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { type BlogType } from "../blogPostArray";
import { Text } from "@/app/_components/text";
import { Calendar, NotebookPen } from "lucide-react";

type Props = {
  blog: BlogType;
};

export default function Blog({ blog }: Props) {
  const { id, headline, thumbnail, article, postDate, author } = blog;
  return (
    <div className="flex w-full flex-col items-center justify-start space-y-3 rounded-lg border bg-white p-2">
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg">
        <Image src={thumbnail} alt={headline} height={1024} width={1024} />
      </div>
      <Text
        size="lg"
        className="line-clamp-2 h-[3.5rem] text-center font-semibold"
      >
        {headline}
      </Text>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <NotebookPen />
          <Text className="line-clamp-1">{author.name}</Text>
        </div>
        <div className="h-4 w-0.5 rounded-xl bg-black/50" />
        <div className="flex items-center justify-center gap-2">
          <Calendar />
          <span>{postDate}</span>
        </div>
      </div>

      <Text size="s" className="line-clamp-3">
        {article.intro}
      </Text>

      <Link href={`/blog/${id}`} className="w-full">
        <Button className="h-14 w-full rounded-sm bg-slate-200 text-gray-800 hover:bg-primary hover:text-white">
          Read more
        </Button>
      </Link>
    </div>
  );
}
