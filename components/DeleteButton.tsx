"use client";

import api from "../api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말로 이 씨앗(게시글)을 뽑아버리시겠습니까? 🌾")) return;

    setIsDeleting(true);
    try {
      // 백엔드 NestJS의 @Delete(':id') 엔드포인트 호출
      await api.delete(`/posts/${id}`);
      alert("게시글이 성공적으로 삭제되었습니다.");

      // 메인 페이지로 이동 후 데이터 새로고침
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중에 문제가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
        isDeleting
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm"
      }`}
    >
      {isDeleting ? "삭제 중..." : "게시글 삭제"}
    </button>
  );
}
