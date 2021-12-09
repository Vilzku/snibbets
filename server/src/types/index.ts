interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  picture?: string;
  bio?: string;
}

interface Snippet {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Comment {
  id: string;
  snippetId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

interface Vote {
  id: string;
  userId: string;
  snippetId?: string;
  commentId?: string;
  positive: boolean;
}

export { User, Snippet, Comment, Vote };
