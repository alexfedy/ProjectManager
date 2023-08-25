import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Form from "@/components/form";

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
    id: number;
    title: string;
    content: string;
    published: boolean;
  }[] = await getPosts();

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
      {session && <Form session={session} />}
      <h1 className="text-4xl text-white mb-4">Public Posts</h1>
      <div className="rounded-lg relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Content
              </th>
              <th scope="col" className="px-6 py-3">
                Published
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((post) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.id}
                </th>
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{post.content}</td>
                <td className="px-6 py-4">{post.published.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
