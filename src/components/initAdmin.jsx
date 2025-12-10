// src/utils/initAdmin.js
export function initAdmin() {
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users["admin@example.com"]) {
    users["admin@example.com"] = { password: "123", role: "admin" };
    localStorage.setItem("users", JSON.stringify(users));
  }
}
