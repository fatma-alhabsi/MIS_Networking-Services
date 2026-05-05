const TAX_RATE = 0.05; // 5% VAT (Oman-style, easy to change)
// Admin protection
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "admin") {
  window.location.href = "../login.html";
}

// Optional welcome text (only if element exists)
const welcome = document.getElementById("welcome");
if (welcome) {
  welcome.innerText = "Welcome, Admin: " + user.email;
}

const JOB_PAYMENT = 100; // Flat rate per completed job

function loadBilling() {
  const requests = JSON.parse(localStorage.getItem("requests")) || [];
  const completed = requests.filter(r => r.status === "Completed");

  const tbody = document.getElementById("billingTable");
  tbody.innerHTML = "";

  let totalRevenue = 0;

  if (completed.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No completed jobs</td></tr>`;
  } else {
    completed.forEach(r => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${r.title}</td>
        <td>${r.client}</td>
        <td>${r.technician}</td>
        <td>${JOB_PAYMENT}</td>
        <td>
          <button onclick="generateInvoice('${r.title}')">
            Generate Invoice
          </button>
        </td>
      `;

      tbody.appendChild(tr);
      totalRevenue += JOB_PAYMENT;
    });
  }

  document.getElementById("totalRevenue").innerText = totalRevenue;
}

function generateInvoice(title) {
  const requests = JSON.parse(localStorage.getItem("requests")) || [];
  const job = requests.find(r => r.title === title);

  if (!job) return;

  const subtotal = JOB_PAYMENT;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const invoiceData = {
    invoiceNo: "INV-" + Date.now(), // unique invoice number
    date: new Date().toLocaleDateString(),
    title: job.title,
    client: job.client,
    technician: job.technician,
    subtotal,
    tax,
    total
  };

  localStorage.setItem("currentInvoice", JSON.stringify(invoiceData));
  window.location.href = "invoice.html";
}

loadBilling();