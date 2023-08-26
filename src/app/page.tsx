import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Form from "@/components/form";
import Table from "@/components/table";
import { User } from "@prisma/client";

export const revalidate = 0;

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  if (!res.ok) {
    console.log(res);
  }
  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  const data: {
    title: string;
    description: string;
    createdAt: Date;
    user: User;
  }[] = await getPosts();

  return (
    <div className="h-full w-full min-h-screen bg-gradient-to-tl from-[#8349ff]/50 from-30% to-[#1e278d]/50 to-90%">
      <main className="relative mx-auto p-8 w-full max-w-5xl">
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
          <a href="/account" className="text-white my-4 underline border-white">
            View Account
          </a>
        )}
        {session && <Form session={session} />}
        <h1 className="text-4xl text-white mb-4">Public Posts</h1>
        <Table data={data} />
      </main>
    </div>
  );
}
