export const save = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const get = (key: string) => {
  const element = localStorage.getItem(key);
  return JSON.parse(element || "{}");
};

export const remove = (key: string) => {
  localStorage.removeItem(key);
};
