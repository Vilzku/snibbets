import axios from "axios";
import { SnippetType } from "../types";

interface ParamsType {
  amount?: number;
  page?: number;
  sortBy?: "title" | "createdAt" | "updatedAt";
  order?: "desc" | "asc";
  search?: string;
}

export const getAllSnippets = async (
  params: ParamsType = {} as ParamsType
): Promise<SnippetType[] | void> => {
  try {
    const url = createUrl("/api/snippets", params);
    const res = await axios.get(url);
    if (res.status === 200) {
      return res.data as SnippetType[];
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const getSnippet = async (id: string): Promise<SnippetType | void> => {
  try {
    const res = await axios.get(`/api/snippets/${id}`);
    if (res.status === 200) {
      return res.data as SnippetType;
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

export const getUserSnippets = async (
  userId: string
): Promise<SnippetType[] | void> => {
  try {
    const res = await axios.get(`/api/snippets/user/${userId}`);
    if (res.status === 200) {
      return res.data as SnippetType[];
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const postSnippet = async (title: string, content: string) => {
  try {
    const res = await axios.post("/api/snippets", { title, content });
    if (res.status === 200) {
      return res.data as SnippetType;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

export const putSnippet = async (
  id: string,
  title: string,
  content: string
) => {
  try {
    const res = await axios.put(`/api/snippets/${id}`, { title, content });
    if (res.status === 200) {
      return res.data as SnippetType;
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

export const deleteSnippet = async (id: string) => {
  try {
    const res = await axios.delete(`/api/snippets/${id}`);
    if (res.status === 204) {
      return true;
    }
    throw new Error();
  } catch (err: any) {
    if (err.response && err.response.status === 500) {
      throw new Error(
        "Something went wrong on the server side, try again later"
      );
    } else if (err.response && err.response.status === 401) {
      throw new Error("Could not delete snippet");
    } else {
      throw new Error("Something went wrong, reload the page and try again");
    }
  }
};

/**
 * Create a url with the given query params
 */
const createUrl = (url: string, params: any) => {
  let first = true;
  for (const key in params) {
    if (params[key]) {
      if (first) {
        url += `?${key}=${params[key]}`;
        first = false;
      } else url += `&${key}=${params[key]}`;
    }
  }
  return url;
};
