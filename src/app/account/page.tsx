import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Form from "@/components/form";
import Table from "@/components/table";
import { User } from "@prisma/client";

export const revalidate = 0;

export default async function Home() {
  const session = await getServerSession(authOptions);

  const data: {
    title: string;
    description: string;
    createdAt: Date;
    user: User;
  }[] = await getPosts();

  async function getPosts() {
    let userEmail = session?.user?.email;
    const data = await fetch(`${process.env.BASE_URL}/api/getAccountPosts`, {
      method: "POST",
      body: JSON.stringify({ userEmail }),
    });
    const res = await data.json();
    return res;
  }

  return (
    <main className="mx-auto p-8 w-full max-w-5xl">
      {session && (
        <button className="text-blue-500 p-2 border-blue-600 border-2 rounded-lg my-4 hover:bg-blue-600/20">
          <a href="/api/auth/signout">Log out</a>
        </button>
      )}
      {!session && (
        <button className="text-blue-500 p-2 border-blue-600 border-2 rounded-lg my-4 hover:bg-blue-600/20">
          <a href="/api/auth/signin">Log in to create a post</a>
        </button>
      )}
      {session && (
        <div className="flex flex-row gap-4 text-white items-center">
          <img
            src={session?.user?.image?.toString()}
            alt="Profile picture"
            className="w-12 h-12 rounded-full"
          />
          <p>{session?.user?.name}</p>
          <p className="text-gray-600">{session?.user?.email}</p>
        </div>
      )}
      {session && (
        <a href="/" className="text-white underline my-4">
          Back to Home Page
        </a>
      )}
      {session && <Form session={session} />}
      <h1 className="text-4xl text-white mb-4">Your Posts</h1>
      <Table data={data} />
    </main>
  );
}
