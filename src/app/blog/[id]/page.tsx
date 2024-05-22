import React from "react";
import Image from "next/image";
import { blogPosts } from "../blogPostArray";
import RecommendedBlogs from "./recommendedBlogs";
import { Heading } from "@/app/_components/heading";
import { Text } from "@/app/_components/text";

export default function BlogDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const parsedId = parseInt(id);
  const blog = blogPosts.find((item) => item.id === parsedId);
  if (!blog) {
    return (
      <div className="mx-auto mt-[6rem] max-w-7xl pb-14">
        <p className="text-center">Sorry, Could not find the article.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-200">
      <div className="prose mx-auto mt-[4rem] max-w-7xl px-4 py-2 sm:py-3 md:py-4 xl:px-6">
        <Heading className="my-4 pt-2 text-center sm:mt-8 sm:text-left md:hidden">
          {blog.headline}
        </Heading>

        <div className="flex w-full items-center justify-center overflow-hidden rounded-lg lg:h-[30rem]">
          <Image
            className="my-0 w-full py-0"
            width={1800}
            height={900}
            src={blog.cover}
            alt={blog.headline}
          />
        </div>

        <Heading className="my-4 hidden pt-2 md:block">{blog.headline}</Heading>

        <div className="flex items-center justify-start gap-4 pt-8 md:pt-2">
          <Image
            className="m-0 rounded-full p-0"
            height={80}
            width={80}
            src={blog.author.imageURL}
            alt={blog.author.name}
          />
          <div className="flex h-full w-full flex-col items-start justify-start">
            <Text size="lg" className="m-0 font-semibold text-black/80">
              {blog.author.name}
            </Text>
            <Text size="s" className="m-0">
              {blog.postDate}
            </Text>
          </div>
        </div>

        <h2 className="group cursor-pointer hover:underline">
          Overview <span className="opacity-0 group-hover:opacity-100">#</span>
        </h2>

        <p>{blog.article.intro}</p>

        {blog.article.blocks.map((textBlock) => (
          <div
            key={`${textBlock.heading.slice(0, 3)}-${textBlock.text.slice(0, 3)}-textBlock`}
          >
            <h2
              key={textBlock.heading}
              className="group cursor-pointer hover:underline"
            >
              {textBlock.heading}{" "}
              <span className="opacity-0 group-hover:opacity-100">#</span>
            </h2>
            <p>{textBlock.text}</p>
          </div>
        ))}

        <div className="mx-auto my-16 h-[2px] w-[50%] bg-black/30" />

        <Heading className="mt-4 pb-8 text-center">You might also like</Heading>
        <RecommendedBlogs currentBlogId={blog.id} blogs={blogPosts} />
      </div>
    </div>
  );
}
