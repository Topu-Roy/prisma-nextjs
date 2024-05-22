import React from "react";
import { type BlogType } from "../blogPostArray";
import Blog from "../_components/blog";

type Props = {
  currentBlogId: number;
  blogs: Array<BlogType>;
};

export default function RecommendedBlogs({ blogs, currentBlogId }: Props) {
  function shuffleArray(array: Array<BlogType>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]] as [BlogType, BlogType];
    }
    return array;
  }
  const blogsWithoutCurrentOne = blogs.filter(
    (product) => product.id !== currentBlogId,
  );

  const blogsToRender = shuffleArray(blogsWithoutCurrentOne);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {blogsToRender.slice(5, 8).map((item) => (
        <div key={`${item.id}-recommended`}>
          <Blog blog={item} />
        </div>
      ))}
    </div>
  );
}
