interface UserData {
  id: string;
  username: string;
}

interface SnippetType {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface CommentType {
  id: string;
  snippetId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface VoteType {
  id: string;
  userId: string;
  snippetId?: string;
  commentId?: string;
  positive: boolean;
}

export type { UserData, SnippetType, CommentType, VoteType };
