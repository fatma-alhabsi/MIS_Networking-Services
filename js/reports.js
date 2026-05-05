const role = localStorage.getItem("role");
if (role !== "admin") {
  window.location.href = "../login.html";
}

const requests = JSON.parse(localStorage.getItem("requests")) || [];

document.getElementById("totalRequests").innerText = requests.length;
document.getElementById("pending").innerText =
  requests.filter(r => r.status !== "Completed").length;
document.getElementById("completed").innerText =
  requests.filter(r => r.status === "Completed").length;

// Technician workload
const techStats = {};
requests
  .filter(r => r.status === "Completed")
  .forEach(r => {
    techStats[r.technician] = (techStats[r.technician] || 0) + 1;
  });

const table = document.getElementById("techReport");
Object.keys(techStats).forEach(tech => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${tech}</td>
    <td>${techStats[tech]}</td>
  `;
  table.appendChild(row);
});