"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import toast, { Toaster } from "react-hot-toast";
import { User } from "@prisma/client";

interface DeleteForm {
  session: Session | null;
  data: {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    user: User;
  }[];
}

const DeleteForm: FC<DeleteForm> = ({ session, data }) => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  async function handleDelete(id: number) {
    toast.loading("Deleting...");
    let userEmail = session?.user?.email;
    const data = await fetch("/api/deletePost", {
      method: "POST",
      body: JSON.stringify({ userEmail, id }),
    });
    const res = await data.json();
    router.refresh();
    toast.dismiss();
    toast.success("Deleted!");
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <button
        onClick={toggleForm}
        className="relative my-4 p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
      >
        <span className="relative px-6 py-3 transition-all ease-out border border-gray-500 hover:border-gray-300 rounded-md duration-400">
          <span className="relative text-white font-normal">
            Delete Project
          </span>
        </span>
      </button>
      {showForm && (
        <div className="flex flex-col gap-2 my-4 mb-8 text-white cursor-pointer">
          {data.map((project, i) => (
            <div
              key={i}
              className="p-8 w-full flex gap-8 rounded-lg bg-neutral-950 hover:bg-neutral-900 duration-150"
              onClick={() => handleDelete(project.id)}
            >
              <span>{project.title}</span>
              <span>
                Created:{" "}
                {new Date(project.createdAt.toString()).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DeleteForm;
