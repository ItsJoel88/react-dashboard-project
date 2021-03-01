import jsCookie from "js-cookie";

// export const cookieName = process.env.REACT_APP_COOKIENAME;
export const cookieName = "authorization"

// /**
//  * Get User from Local Storage
//  * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
//  * @return {obeject} UserData
//  * {
//  *  username: string,
//  *  role: string
//  * }
//  */

// export const getMenus = async () => {
//   let { response, error } = await apiGetMenus();
//   if (response && response.data && response.data.result) {
//     localStorage.setItem("menus", JSON.stringify(response.data.result));
//     return true;
//   } else if (error) {
//     return false;
//   }
// };

// export const getSettings = async () => {
//   let { response, error } = await apiGetSettings();
//   if (response && response.data && response.data.result) {
//     localStorage.setItem("settings", JSON.stringify(response.data.result));
//     return true;
//   } else if (error) {
//     return false;
//   }
// };

// export const removeToken = () => {
//   Object.keys(jsCookie.get()).forEach((cookie) => {
//     jsCookie.remove(cookie);
//   });
// };
// export const setToken = ({ token }) => {
//   jsCookie.set(cookieName, token);
// };

// export const setUserData = (data) => {
//   jsCookie.set("user", JSON.stringify(data));
// };

// export const getUserData = () => {
//   return jsCookie.get("user") ? JSON.parse(jsCookie.get("user")) : {};
// };

// export const setUserSetting = (setting) => {
//   jsCookie.set("setting", JSON.stringify(setting));
// };
// export const getUserSetting = () => {
//   return jsCookie.get("setting") ? JSON.parse(jsCookie.get("setting")) : {};
// };

export const getAuthenticated = () => {
  const token = jsCookie.get(cookieName);
  if (!token) {
    jsCookie.remove("user");
  }

  return token ? token : false;
};