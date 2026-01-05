// initAdmin.js (hoặc để trong Login useEffect)
export function initAdmin() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const hasAdmin = users.some((u) => u.role === "admin");

  if (!hasAdmin) {
    users.push({
      id: Date.now(),
      email: "admin@gmail.com",
      password: "123",
      username: "admin",
      role: "admin",
      blocked: false,
      avatar: "/image/avatar.jpg",
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}
