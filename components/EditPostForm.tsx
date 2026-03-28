"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "api/axios";
import { Post } from "types/post";

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [gameId, setGameId] = useState<number>(post?.game?.id || 1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. 서버에 수정 요청 보내기
      await api.patch(`/posts/${post.id}`, {
        title,
        content,
        gameId: Number(gameId),
      });

      // 2. 성공 알림 (선택 사항이지만 사용자 경험상 추천!)
      alert("씨앗 정보를 수정했습니다! ✨");

      // 3. 메인 화면으로 이동
      router.push("/");

      // 4. 서버 데이터를 다시 불러오도록 새로고침 트리거
      // 이걸 해줘야 메인 목록에서 바뀐 제목이 바로 보입니다.
      router.refresh();
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 문제가 생겼어요. 다시 시도해 주세요!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 게임 선택 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          게임 카테고리
        </label>
        <select
          value={gameId}
          onChange={(e) => setGameId(Number(e.target.value))}
          className="w-full p-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value={1}>League of Legends</option>
          <option value={2}>발로란트</option>
          <option value={3}>메이플스토리</option>
        </select>
      </div>

      {/* 제목 입력 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          내용
        </label>
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all disabled:bg-gray-300"
      >
        {isLoading ? "수정 사항 반영 중..." : "수정 완료하기"}
      </button>
    </form>
  );
}
