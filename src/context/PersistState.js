export const saveState = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getState = (key) => {
  const savedState = window.localStorage.getItem(key);
  if (!saveState) return undefined;
  return JSON.parse(savedState);
};
