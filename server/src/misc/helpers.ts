import { Snippet, User, Vote } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortList = (list: any[], sortBy: string, order: string) => {
  list.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
    return 0;
  });
  return list;
};

export const createSnippetObject = (snippet: Snippet) => {
  return {
    id: snippet.id,
    userId: snippet.user_id,
    title: snippet.title,
    content: snippet.content,
    createdAt: snippet.created_at,
    updatedAt: snippet.updated_at,
  };
};

export const createUserObject = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.created_at,
    bio: user.bio,
  };
};

export const createVoteObject = (vote: Vote) => {
  return {
    id: vote.id,
    userId: vote.user_id,
    snippetId: vote.snippet_id,
    commentId: vote.comment_id,
    positive: vote.positive,
  };
};
