if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// Create default admin
let users = JSON.parse(localStorage.getItem("users"));

if (!users.some(u => u.role === "admin")) {
  users.push({
    email: "admin@system.com",
    password: "admin123",
    role: "admin"
  });
  localStorage.setItem("users", JSON.stringify(users));
}
if (!localStorage.getItem("jobs")) {
  localStorage.setItem("jobs", JSON.stringify([]));
}
