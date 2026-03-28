"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "api/axios";
import Link from "next/link";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gameId, setGameId] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. DTO 규격에 맞춰 userId와 gameId를 함께 보냅니다.
      await api.post("/posts", {
        title,
        content,
        userId: 1, // 👈 아직 로그인이 없으니 임시로 1번 유저라고 뻥칩시다!
        gameId: Number(gameId), // 👈 선택한 게임 ID (숫자형으로 변환)
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("글 작성 실패:", error);
      alert("데이터 형식이 안 맞나 봐요! (DTO 체크 필수)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-8 pt-16">
      <Link
        href="/"
        className="text-sm text-gray-400 hover:text-green-600 mb-8 inline-block transition-colors"
      >
        ← 돌아가기
      </Link>

      <header className="mb-12">
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          새 글 쓰기 🌾
        </h1>
        <p className="text-gray-500">
          쌀더팜의 새로운 정보를 동료 농부들과 공유해보세요.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
            게임 카테고리
          </label>
          <select
            value={gameId}
            onChange={(e) => setGameId(Number(e.target.value))}
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
          >
            <option value={1}>League of Legends</option>
            <option value={2}>발로란트</option>
            <option value={3}>메이플스토리</option>
          </select>
        </div>

        {/* 제목 입력 */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-bold text-gray-700 mb-2 ml-1"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg"
          />
        </div>

        {/* 내용 입력 */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-bold text-gray-700 mb-2 ml-1"
          >
            내용
          </label>
          <textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="동료들에게 들려줄 이야기를 적어주세요..."
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none leading-relaxed"
          />
        </div>

        {/* 하단 버튼 구역 */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95"
            }`}
          >
            {isLoading ? "씨앗 심는 중..." : "게시글 등록하기"}
          </button>
        </div>
      </form>
    </main>
  );
}
