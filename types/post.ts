export interface Post {
  id: number;
  title: string;
  content: string;
  game: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    nickname: string;
  };
  createdAt: string;
}
