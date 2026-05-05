const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "client") {
  window.location.href = "../login.html";
}

document.getElementById("welcome").innerText =
  "Welcome, " + user.email;

const serviceBox = document.getElementById("serviceBox");
const selectedService = localStorage.getItem("selectedService");

// Render service selector
if (selectedService) {
  serviceBox.innerHTML = `
    <label>Service</label>
    <input type="text" id="service" value="${selectedService}" readonly>
  `;
} else {
  serviceBox.innerHTML = `
    <p style="color:#a00">
      No service selected.
    </p>
    <a href="../index.html" class="btn-primary">
      Choose a Service
    </a>
  `;
}

// Load jobs
function loadMyRequests() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const myJobs = jobs.filter(j => j.client === user.email);

  const tbody = document.getElementById("myRequests");
  tbody.innerHTML = "";

  if (myJobs.length === 0) {
    tbody.innerHTML =
      `<tr><td colspan="3">No requests yet</td></tr>`;
    return;
  }

  myJobs.forEach(job => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${job.title}</td>
      <td>${job.status}</td>
      <td>${job.notes || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Create request
function createRequest() {
  if (!selectedService) {
    alert("Please select a service first.");
    return;
  }

  const description = document.getElementById("description").value.trim();
  if (!description) {
    alert("Please describe your issue.");
    return;
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs.push({
    id: Date.now(),
    title: selectedService,
    description,
    client: user.email,
    technician: null,
    status: "Pending",
    deadline: null,
    notes: ""
  });

  localStorage.setItem("jobs", JSON.stringify(jobs));
  localStorage.removeItem("selectedService");

  alert("Request submitted successfully!");
  window.location.reload();
}

loadMyRequests();
