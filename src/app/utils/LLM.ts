export const processResponseData = (data: string[]) => {
  return data
    .map((item) => item.replace(/\n\d/g, ""))
    .filter((item) => !/^\d/.test(item));
};
