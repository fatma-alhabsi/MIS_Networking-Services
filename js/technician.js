const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "technician") {
  window.location.href = "../login.html";
}

document.getElementById("welcome").innerText =
  "Welcome, Technician: " + user.email;

function loadJobs() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const myJobs = jobs.filter(j => j.technician === user.email);

  const tbody = document.getElementById("jobsTable");
  tbody.innerHTML = "";

  if (myJobs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">No assigned jobs</td></tr>`;
    return;
  }

  myJobs.forEach(job => {
    const tr = document.createElement("tr");

    /* Contact links */
    const contactHTML = `
      <a href="mailto:${job.client}">📧 Email</a><br>
      ${job.clientPhone !== "N/A"
        ? `<a href="https://wa.me/${job.clientPhone}" target="_blank">💬 WhatsApp</a>`
        : ""}
    `;

    /* Status selector */
    const statusSelect = document.createElement("select");
    ["Assigned", "In Progress", "Completed", "Resolved Remotely"].forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.innerText = s;
      if (job.status === s) opt.selected = true;
      statusSelect.appendChild(opt);
    });

    /* Notes */
    const notes = document.createElement("textarea");
    notes.placeholder = "Resolution notes...";
    notes.style.width = "100%";
    notes.value = job.notes || "";

    /* Update button */
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Save";
    updateBtn.onclick = () => {
      const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const idx = allJobs.findIndex(j => j.id === job.id);

      allJobs[idx].status = statusSelect.value;
      allJobs[idx].notes = notes.value;

      localStorage.setItem("jobs", JSON.stringify(allJobs));
      alert("Job updated successfully");
      loadJobs();
    };

    tr.innerHTML = `
      <td>${job.service}</td>
      <td>${job.client}</td>
      <td>${job.deadline || "-"}</td>
      <td>${job.status}</td>
      <td>${contactHTML}</td>
      <td></td>
    `;

    tr.children[5].appendChild(notes);

    const tdUpdate = document.createElement("td");
    tdUpdate.appendChild(statusSelect);
    tdUpdate.appendChild(updateBtn);

    tr.appendChild(tdUpdate);
    tbody.appendChild(tr);
  });
}

loadJobs();
