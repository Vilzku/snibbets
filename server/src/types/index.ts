interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  created_at: Date;
  bio?: string;
}

interface Snippet {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

interface Comment {
  id: string;
  snippet_id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

interface Vote {
  id: string;
  user_id: string;
  snippet_id?: string;
  comment_id?: string;
  positive: boolean;
}

export { User, Snippet, Comment, Vote };
