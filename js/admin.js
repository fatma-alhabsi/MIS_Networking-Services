
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "admin") {
  window.location.href = "../login.html";
}

document.getElementById("welcome").innerText =
  "Welcome, Admin: " + user.email;

function loadRequests() {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let technicians = users.filter(u => u.role === "technician");

  let tbody = document.getElementById("requests");
  tbody.innerHTML = "";

  if (jobs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No requests yet</td></tr>`;
    return;
  }

  jobs.forEach(job => {
    let tr = document.createElement("tr");

   tr.innerHTML = `
  <td>${job.title}</td>
  <td>${job.client}</td>
  <td>
    <span class="badge ${job.status.toLowerCase()}">
      ${job.status}
    </span>
  </td>
  <td>${job.technician || "Not assigned"}</td>
  <td>
    <select onchange="assignTechnician(${job.id}, this.value)">
      <option value="">Select</option>
      ${technicians.map(t => `<option value="${t.email}">${t.email}</option>`).join("")}
    </select>
  </td>
`;


    tbody.appendChild(tr);
  });
}

function assignTechnician(jobId, technicianEmail) {
  if (!technicianEmail) return;

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let job = jobs.find(j => j.id === jobId);
  if (!job) return;

  job.technician = technicianEmail;
  job.status = "Assigned";

  localStorage.setItem("jobs", JSON.stringify(jobs));
  loadRequests();
}

loadRequests();
