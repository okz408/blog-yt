"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async (title: string, description: string) => {
  const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/api/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

const PostBlog = () => {
  const router = useRouter();
  const titleref = useRef<HTMLInputElement | null>(null);
  const descref = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("Loading...");
    await postBlog(titleref.current?.value!, descref.current?.value!);
    
    toast.success("投稿しました");
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleref}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descref}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default PostBlog;