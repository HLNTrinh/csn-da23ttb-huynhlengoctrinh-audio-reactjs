export function isLoggedIn() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  return user !== null;
}
