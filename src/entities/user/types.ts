export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'banned' | 'pending';
  createdAt: string; // ISO string
};
