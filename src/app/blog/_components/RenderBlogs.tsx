"use client";
import React, { useEffect, useRef, useState } from "react";
import { type BlogType } from "../blogPostArray";
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/lib/utils";
import Blog from "./blog";

type props = {
  blogs: BlogType[];
};

export default function RenderBlogs(props: props) {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 9;
  let totalPages = useRef(Math.ceil(props.blogs.length / itemPerPage));
  let lastIndex = useRef(0);

  useEffect(() => {
    setBlogs(props.blogs.slice(0, itemPerPage));
    totalPages.current = Math.ceil(props.blogs.length / itemPerPage);
  }, [props.blogs]);

  useEffect(() => {
    lastIndex.current = currentPage * itemPerPage;
    const paginatedBlog = props.blogs.slice(
      lastIndex.current - itemPerPage,
      lastIndex.current,
    );
    setBlogs(paginatedBlog);
  }, [currentPage, props.blogs]);

  const PaginationButtons = [];
  for (let i = 1; i <= totalPages.current; i++) {
    PaginationButtons.push(
      <Button
        key={`${i}-button`}
        variant={currentPage === i ? "default" : "outline"}
        onClick={() => handlePaginationClick(i)}
        className="rounded-full"
      >
        {i}
      </Button>,
    );
  }

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    scrollToTop();
  };

  return (
    <div className="py-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:px-0">
        {blogs.map((item) => (
          <div key={`${item.id}-blog`}>
            <Blog blog={item} />
          </div>
        ))}
      </div>

      <div className="mx-auto flex w-full items-center justify-center gap-3">
        {PaginationButtons}
      </div>
    </div>
  );
}
