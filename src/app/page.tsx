import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Form from "@/components/form";
import Table from "@/components/table";
import { User } from "@prisma/client";

export const revalidate = 0;

const bgStyles = {
  height: "100%",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "black",
};

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);
  if (!res.ok) {
    console.log(res);
    return null;
  }
  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const data: {
    title: string;
    description: string;
    link: string;
    createdAt: Date;
    user: User;
  }[] = await getPosts();
  return (
    <div style={bgStyles}>
      <main className="relative mx-auto p-8 w-full max-w-5xl">
        {session && (
          <a href="/api/auth/signout">
            <button
              type="button"
              className="text-black bg-white hover:bg-white/80 duration-150 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mb-8 tracking-tight"
            >
              Sign out
            </button>
          </a>
        )}
        {!session && (
          <a href="/api/auth/signin">
            <button
              type="button"
              className="text-black bg-white hover:bg-white/80 duration-150 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center mb-8 tracking-tight"
            >
              <svg
                className="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Github
            </button>
          </a>
        )}
        {session && (
          <div className="p-2 border-t border-b border-gray-600 flex flex-row gap-4 text-white items-center">
            <img
              src={session?.user?.image?.toString()}
              alt="Profile picture"
              className="w-12 h-12 rounded-full"
            />
            <p>{session?.user?.name}</p>
            <p className="text-gray-600">{session?.user?.email}</p>
            <a href="/profile" className="text-xs text-blue-400">
              View Profile
            </a>
          </div>
        )}
        {session && <Form session={session} />}
        {(!data || data.length <= 0) && (
          <h1 className="mt-12 pb-2 text-5xl bg-gradient-to-t from-gray-300 to-white bg-clip-text text-transparent mb-4 font-semibold tracking-tight">
            There are no public projects yet.
          </h1>
        )}
        {data && data.length > 0 && (
          <>
            <h1 className="mt-12 pb-2 text-5xl bg-gradient-to-t from-gray-300 to-white bg-clip-text text-transparent mb-4 font-semibold tracking-tight">
              Public Projects
            </h1>
            <Table data={data} />
          </>
        )}
      </main>
    </div>
  );
}
