import axios from "axios";
import { CommentType } from "../types";

export const getComments = async (snippetId: string) => {
  try {
    const res = await axios.get(`/api/snippets/${snippetId}/comments`);
    if (res.status === 200) {
      return res.data as CommentType[];
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else if (err.response && err.response.status === 404) {
      throw new Error("Snippet not found");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const postComment = async (snippetId: string, comment: string) => {
  try {
    const res = await axios.post(`/api/snippets/${snippetId}/comments`, {
      content: comment,
    });
    if (res.status === 200) {
      return res.data as CommentType;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else if (err.response && err.response.status === 404) {
      throw new Error("Snippet not found");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const deleteComment = async (snippetId: string, commentId: string) => {
  try {
    const res = await axios.delete(
      `/api/snippets/${snippetId}/comments/${commentId}`
    );
    if (res.status === 204) {
      return true;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else if (err.response && err.response.status === 404) {
      throw new Error("Snippet not found");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const editComment = async (
  snippetId: string,
  commentId: string,
  comment: string
) => {
  try {
    const res = await axios.put(
      `/api/snippets/${snippetId}/comments/${commentId}`,
      {
        content: comment,
      }
    );
    if (res.status === 200) {
      return res.data as CommentType;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else if (err.response && err.response.status === 404) {
      throw new Error("Snippet not found");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};
