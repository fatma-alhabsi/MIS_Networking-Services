const services = {
  installation: {
    title: "Network Installation",
    description:
      "We design and install reliable network infrastructures for offices, homes, and enterprises. Our team ensures secure, high-performance setups tailored to your needs.",
    features: [
      "LAN & WAN installation",
      "Router and switch configuration",
      "Structured cabling",
      "Wi-Fi access point setup"
    ],
    price: "Starting from $150"
  },

  troubleshooting: {
    title: "Network Troubleshooting",
    description:
      "We diagnose and resolve network issues efficiently, minimizing downtime and improving performance for your systems.",
    features: [
      "Connectivity issue diagnosis",
      "Speed optimization",
      "Device configuration fixes",
      "Network health checks"
    ],
    price: "From $50 per visit"
  },

  security: {
    title: "Security & Firewalls",
    description:
      "Protect your network and data using industry-standard security solutions, including firewall setup, VPNs, and access control.",
    features: [
      "Firewall installation",
      "VPN configuration",
      "Access control policies",
      "Security audits"
    ],
    price: "Custom pricing"
  },

  server: {
    title: "Server & Cloud Setup",
    description:
      "Deploy on-premise and cloud servers to support your business operations securely and reliably.",
    features: [
      "Windows/Linux server setup",
      "Cloud migration",
      "Backup solutions",
      "Monitoring & maintenance"
    ],
    price: "Starting from $200"
  }
};

const params = new URLSearchParams(window.location.search);
const type = params.get("type");
const service = services[type];

if (!service) {
  document.getElementById("serviceTitle").innerText = "Service not found";
} else {
  document.getElementById("serviceTitle").innerText = service.title;
  document.getElementById("serviceDescription").innerText = service.description;
  document.getElementById("price").innerText = service.price;

  const featuresList = document.getElementById("features");
  service.features.forEach(f => {
    const li = document.createElement("li");
    li.innerText = f;
    featuresList.appendChild(li);
  });
}

// Auto-fill request page
document.getElementById("requestBtn").onclick = () => {
  window.location.href = `request.html?service=${type}`;
};
