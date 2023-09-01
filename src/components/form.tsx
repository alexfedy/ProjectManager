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
  const [link, setLink] = useState("");
  const [showForm, setShowForm] = useState(false);
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
        body: JSON.stringify({ title, content, link, userEmail }),
      });
      const res = await data.json();
      router.refresh();
      setTitle("");
      setContent("");
      setLink("");
    }
  }

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <button
        onClick={toggleForm}
        className="relative my-4 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
      >
        <span className="relative px-6 py-3 transition-all ease-out border border-neutral-500 hover:border-neutral-600 rounded-md duration-400">
          <span className="relative text-white font-normal">Add Project</span>
        </span>
      </button>
      {showForm && (
        <form
          onSubmit={loadPostSubmission}
          className="mb-12 bg-neutral-950 p-8 rounded-lg text-white text-lg"
        >
          <div className="mb-6">
            <label className="block mb-2 text-sm font-mediumtext-white">
              Title
            </label>
            <input
              type="text"
              className="bg-neutral-900 border border-neutral-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
              placeholder=""
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-mediumtext-white">
              Description (optional)
            </label>
            <textarea
              className="bg-neutral-900 border border-neutral-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-mediumtext-white">
              Link (optional)
            </label>
            <input
              type="text"
              className="bg-neutral-900 border border-neutral-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setLink(e.target.value)}
              value={link}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-8 rounded-md bg-neutral-700 text-white hover:bg-neutral-900 hover:text-white/50 duration-150"
          >
            Post
          </button>
        </form>
      )}
    </>
  );
};

export default Form;
