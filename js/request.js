// Get selected service from URL
const params = new URLSearchParams(window.location.search);
const serviceKey = params.get("service");

const serviceNames = {
  installation: "Network Installation",
  troubleshooting: "Network Troubleshooting",
  security: "Security & Firewalls",
  server: "Server & Cloud Setup"
};

// Auto-fill service
document.getElementById("service").value =
  serviceNames[serviceKey] || "Custom Service";

// Handle form submission
document.getElementById("requestForm").addEventListener("submit", e => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Please login first to submit a request");
    window.location.href = "login.html";
    return;
  }

  const job = {
    id: Date.now(),
    service: document.getElementById("service").value,
    description: document.getElementById("description").value,
    date: document.getElementById("date").value,
    client: user.email,
    status: "Pending"
  };

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Your service request has been submitted successfully!");
  window.location.href = "client/dashboard.html";
});
const job = {
  id: Date.now(),
  service: document.getElementById("service").value,
  description: document.getElementById("description").value,
  date: document.getElementById("date").value,
  client: user.email,
  clientPhone: user.phone || "N/A",
  status: "Pending"
};
