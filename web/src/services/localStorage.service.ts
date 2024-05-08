export const save = (key: string, value: string | object) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const get = (key: string) => {
  const element = localStorage.getItem(key);
  return JSON.parse(element || "{}");
};

export const remove = (key: string) => {
  localStorage.removeItem(key);
};
