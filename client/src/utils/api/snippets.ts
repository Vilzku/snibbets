import axios from "axios";
import { SnippetType } from "../types";

interface ParamsType {
  amount?: number;
  page?: number;
  sortBy?: "title" | "createdAt" | "updatedAt";
  order?: "desc" | "asc";
}

export const getAllSnippets = async (
  params: ParamsType = {} as ParamsType
): Promise<SnippetType[] | void> => {
  try {
    const url = createUrl("/api/snippets", params);
    console.log(url);
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
      throw new Error("Something went wrong, try again later");
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
