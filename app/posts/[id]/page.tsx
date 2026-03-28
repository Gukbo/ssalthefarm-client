import api from "../../../api/axios";
import { Post } from "../../../types/post";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "../../..//components/DeleteButton"; // 👈 추가

async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 여기서 await이 꼭 필요합니다!
  const post = await getPost(id);

  if (!post) {
    notFound(); // 데이터를 못 찾으면 Next.js의 기본 404 페이지를 보여줌
  }

  return (
    <main className="max-w-3xl mx-auto p-8 pt-16">
      <Link
        href="/"
        className="text-sm text-green-600 font-medium mb-8 inline-block"
      >
        ← 목록으로 돌아가기
      </Link>

      <article className="bg-white">
        <header className="mb-8 pb-8 border-b border-gray-100">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="text-gray-400 text-sm">
            <span>농부 #{post.id}</span>
            <span className="mx-2">·</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </header>

        <section className="text-lg text-gray-800 leading-relaxed min-h-[300px] whitespace-pre-wrap">
          {post.content}
        </section>

        {/* 푸터 영역에 삭제 버튼 배치 */}
        <footer className="mt-16 pt-8 border-t border-gray-100 flex justify-end gap-4">
          <Link
            href={`/posts/edit/${post.id}`}
            className="px-6 py-2.5 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-gray-100 transition-all"
          >
            수정하기
          </Link>
          {/* 👇 삭제 버튼 컴포넌트 호출 */}
          <DeleteButton id={post.id} />
        </footer>
      </article>
    </main>
  );
}
