export const setLocalStorage = (prop, data) => {
  localStorage.setItem(prop, data);
};

export const getLocalStorage = (prop) => {
  return localStorage.getItem(prop);
};

export const deleteLocalStorage = (prop) => {
  return localStorage.removeItem(prop);
};

export default {
  getLocalStorage,
  setLocalStorage,
  deleteLocalStorage
};
