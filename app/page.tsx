import api from "../api/axios";
import { Post } from "../types/post";
import Link from "next/link";

// 데이터를 가져오는 함수
async function getPosts(): Promise<Post[]> {
  try {
    const response = await api.get("http://127.0.0.1:4000/posts");
    return response.data;
  } catch (error) {
    console.error("게시글 로딩 실패:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-green-600">
          🌾 쌀더팜 (Ssal-The-Farm)
        </h1>
        <p className="text-gray-500 mt-2">
          게이머들을 위한 따끈따끈한 정보 공유소
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-6">최근 게시글</h2>

        {posts.length === 0 ? (
          <p className="text-gray-400">
            등록된 게시글이 없습니다. 첫 글을 남겨보세요!
          </p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              // 👇 여기 Link 태그를 추가해서 감싸주세요!
              <Link href={`/posts/${post.id}`} key={post.id}>
                <article className="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>No. {post.id}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
      <div className="fixed bottom-10 right-10 z-50">
        <Link
          href="/posts/create"
          className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-[0_10px_40px_rgba(34,197,94,0.4)] hover:bg-green-700 hover:scale-110 hover:rotate-12 transition-all duration-300 group"
        >
          <span className="text-3xl font-light group-hover:hidden">+</span>
          <span className="hidden group-hover:inline text-sm font-bold">
            작성
          </span>
        </Link>
      </div>
    </main>
  );
}
