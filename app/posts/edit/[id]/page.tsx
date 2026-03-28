import api from "../../../../api/axios";
import { Post } from "../../../../types/post";
import { notFound } from "next/navigation";
import EditPostForm from "../../../../components/EditPostForm";

async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Next.js 15 비동기 params 처리
  const post = await getPost(id);

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto p-8 pt-16">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          글 수정하기 ✏️
        </h1>
        <p className="text-gray-500">내용을 고치고 다시 씨앗을 심어보세요.</p>
      </header>

      {/* 기존 데이터를 폼에 넘겨줍니다 */}
      <EditPostForm post={post} />
    </main>
  );
}
