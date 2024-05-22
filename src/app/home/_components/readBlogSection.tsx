import React from "react";
import { blogPosts } from "../../blog/blogPostArray";
import Blog from "@/app/blog/_components/blog";
import { Heading } from "@/app/_components/heading";
import { Text } from "@/app/_components/text";

export default function ReadBlogSection() {
  const blogsMobile = blogPosts.slice(0, 2);
  const blogsTablet = blogPosts.slice(0, 4);
  const blogsDesktop = blogPosts.slice(0, 6);
  const blogsWideScreen = blogPosts.slice(0, 8);

  return (
    <section className="bg-white py-10 ">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex w-full flex-col items-center justify-start gap-4 pb-4">
          <Heading className="text-center !font-semibold tracking-[-0.50px]">
            Read Our Latest Blog
          </Heading>
          <Text size="md" muted={true} className="text-center">
            We write various things related to furniture, from tips and what
            things I need to pay attention to when choosing furniture
          </Text>
        </div>

        <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-4 sm:hidden">
          {blogsMobile.map((item) => (
            <div className="mx-auto w-[95%]" key={`${item.id}-blog`}>
              <Blog blog={item} />
            </div>
          ))}
        </div>

        <div className="mx-auto hidden w-full flex-wrap items-center justify-center gap-4 sm:flex lg:hidden ">
          {blogsTablet.map((item) => (
            <div className="w-[47%]" key={`${item.id}-blog`}>
              <Blog blog={item} />
            </div>
          ))}
        </div>

        <div className="mx-auto hidden w-full flex-wrap items-center justify-center gap-4 lg:flex xl:hidden ">
          {blogsDesktop.map((item) => (
            <div className="w-[30%]" key={`${item.id}-blog`}>
              <Blog blog={item} />
            </div>
          ))}
        </div>

        <div className="mx-auto hidden w-full flex-wrap items-center justify-center gap-4 xl:flex ">
          {blogsWideScreen.map((item) => (
            <div className="flex-1" key={`${item.id}-blog`}>
              <Blog blog={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
