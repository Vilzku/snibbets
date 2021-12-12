import axios from "axios";
import { VoteType } from "../types";

export const getVotes = async (
  snippetId: string
): Promise<VoteType[] | void> => {
  try {
    const res = await axios.get(`/api/votes/${snippetId}`);
    if (res.status === 200) {
      return res.data as VoteType[];
    }
    throw new Error();
  } catch (err: any) {
    if (err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const postVote = async (
  id: string,
  positive: boolean,
  type: "snippet" | "comment"
) => {
  try {
    const res = await axios.post(`/api/votes/`, {
      snippetId: type === "snippet" ? id : undefined,
      commentId: type === "comment" ? id : undefined,
      positive,
    });
    if (res.status === 200) {
      return res.data as VoteType;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const updateVote = async (id: string, positive: boolean) => {
  try {
    const res = await axios.patch(`/api/votes/${id}`, {
      positive,
    });
    if (res.status === 200) {
      return res.data as VoteType;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const deleteVote = async (id: string) => {
  try {
    await axios.delete(`/api/votes/${id}`);
    return true;
  } catch (err: any) {
    if (err.response.status === 500) {
      throw new Error("Server error, try again later");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};
