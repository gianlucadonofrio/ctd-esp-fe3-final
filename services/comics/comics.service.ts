export const getComicsPaginated = async (quantity: number, page: number) => {
  const offset = quantity * (page - 1);
  const params = new URLSearchParams();

  if (offset) params.set("offset", `${offset}`);
  if (quantity) params.set("limit", `${quantity}`);

  const paramsString = params.toString();
  const response = await fetch(`/api/comics?${paramsString}`);
  return await response.json();
};

export const getComicById = async (id: number) => {
  const response = await fetch(`/api/comics/${id}`);
  return await response.json();
};
