export const save = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const get = (key: string) => {
  return localStorage.getItem(key);
};

export const remove = (key: string) => {
  localStorage.removeItem(key);
};
