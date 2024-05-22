import React from "react";
import RenderBlogs from "./_components/RenderBlogs";
import { blogPosts } from "./blogPostArray";
import { Heading } from "../_components/heading";
import { Text } from "../_components/text";

export default function BlogPage() {
  return (
    <div className="mt-[4rem] bg-gray-200 pt-2 md:pt-4 lg:pt-6">
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <Heading className="text-center">Read Our Latest Blog</Heading>
        <Text size="lg" muted={true} className="px-4 text-center">
          We write various things related to furniture, from tips and what
          things <br className="hidden md:block" />
          you need to pay attention to when choosing furniture
        </Text>
      </div>
      <RenderBlogs blogs={blogPosts} />
    </div>
  );
}
