import axios from "axios";

const api = axios.create({
  // 환경변수가 없으면 기본값으로라도 작동하게 설정
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000",
});

export default api; // 👈 default가 있어야 { } 없이 임포트 가능합니다.
