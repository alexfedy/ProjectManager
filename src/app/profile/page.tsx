import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Form from "@/components/deleteForm";
import Table from "@/components/table";
import { User } from "@prisma/client";

export const revalidate = 0;

const bgStyles = {
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "black",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  const data: {
    id: number;
    title: string;
    description: string;
    link: string;
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
    <div style={bgStyles}>
      <main className="relative mx-auto p-8 w-full max-w-5xl">
        {session && (
          <a href="/api/auth/signout">
            <button
              type="button"
              className="mr-8 text-black bg-white hover:bg-white/80 duration-150 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mb-8 tracking-tight"
            >
              Sign out
            </button>
          </a>
        )}
        <a
          href="/"
          className="border-l w-fit text-white hover:text-gray-300 duration-150 text-xs px-5 py-2.5 text-center items-center mb-8 tracking-tight"
        >
          Back to Home Page
        </a>
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
        {session && data && data.length > 0 && (
          <Form session={session} data={data} />
        )}
        {(!data || data.length <= 0) && (
          <h1 className="mt-12 pb-2 text-5xl bg-gradient-to-t from-gray-300 to-white bg-clip-text text-transparent mb-4 font-semibold tracking-tight">
            You do not have any projects.
          </h1>
        )}
        {data && data.length > 0 && (
          <>
            <h1 className="mt-12 pb-2 text-5xl bg-gradient-to-t from-gray-300 to-white bg-clip-text text-transparent mb-4 font-semibold tracking-tight">
              Your Projects
            </h1>
            <Table data={data} />
          </>
        )}
      </main>
    </div>
  );
}
