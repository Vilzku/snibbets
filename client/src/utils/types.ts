interface UserData {
  id: string;
  username: string;
  email: string;
  bio: string;
  createdAt: string;
}

interface SnippetType {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface CommentType {
  id: string;
  snippetId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface VoteType {
  id: string;
  userId: string;
  snippetId?: string;
  commentId?: string;
  positive: boolean;
}

export type { UserData, SnippetType, CommentType, VoteType };
