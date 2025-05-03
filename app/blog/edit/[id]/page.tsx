"use client";

import React, { use } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

const editBlog = async (title: string, description: string, id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, id }),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

const deleteBlog = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  const data = await res.json();
  return data.posts;
}

const EditPost = ({params}: {params: Promise<{ id: string }>}) => {
  const router = useRouter();
  const titleref = useRef<HTMLInputElement | null>(null);
  const descref = useRef<HTMLTextAreaElement | null>(null);
  const paramsData = use(params);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading("Loading...");
    await editBlog(titleref.current?.value!, descref.current?.value!, paramsData.id);
    
    toast.success("編集しました");
    router.push("/");
    router.refresh();
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    toast.loading("Loading...");
    await deleteBlog(paramsData.id);
    
    toast.success("削除しました");
    router.push("/");
    router.refresh();
  }

  useEffect(() => {
    getBlogById(paramsData.id)
      .then((data) => {
        titleref.current!.value = data.title;
        descref.current!.value = data.description;
      })
      .catch((error) => {
        toast.error("ブログの取得に失敗しました");
      }
    );
  }, [paramsData.id]);

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
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
              更新
            </button>
            <button onClick={handleDelete} className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditPost;