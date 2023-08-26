"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import toast, { Toaster } from "react-hot-toast";

interface Form {
  session: Session | null;
}

const Form: FC<Form> = ({ session }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function loadPostSubmission(e: React.FormEvent) {
    toast.promise(submitPost(e), {
      loading: "Uploading...",
      success: "Posted!",
      error: "Error posting",
    });

    async function submitPost(e: React.FormEvent) {
      e.preventDefault();
      if (!title.length) {
        return;
      }
      let userEmail = session?.user?.email;
      const data = await fetch("/api/createPost", {
        method: "POST",
        body: JSON.stringify({ title, content, userEmail }),
      });
      const res = await data.json();
      router.refresh();
      setTitle("");
      setContent("");
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form onSubmit={loadPostSubmission} className="my-8">
        <h1 className="text-4xl text-white mb-4">Create Post</h1>
        <h1 className="text-lg text-gray-600 mb-4">
          Username: {session?.user?.name}
        </h1>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            className="bg-black/20 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=""
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Content
          </label>
          <input
            type="text"
            className="bg-black/20 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
