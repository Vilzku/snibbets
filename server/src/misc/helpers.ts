// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortList = (list: any[], sortBy: string, order: string) => {
  list.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
    return 0;
  });
  return list;
};
