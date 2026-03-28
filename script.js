// Theme Toggle for all pages
document.addEventListener("DOMContentLoaded", function () {
  const themeSwitch = document.getElementById("themeSwitch");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    if (themeSwitch) themeSwitch.checked = false;
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    if (themeSwitch) themeSwitch.checked = true;
  }

  if (themeSwitch) {
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Load result on result page
  if (document.getElementById("resultContent")) {
    displayResult();
  }
});

function calculateRisk() {
  let name = document.getElementById("name").value.trim();
  let delivery = parseFloat(document.getElementById("delivery").value);
  let defect = parseFloat(document.getElementById("defect").value);
  let cancel = parseFloat(document.getElementById("cancel").value);
  let delay = parseFloat(document.getElementById("delay").value);

  if (!name || isNaN(delivery) || isNaN(defect) || isNaN(cancel) || isNaN(delay)) {
    alert("Please fill in all fields.");
    return;
  }

  let riskScore =
    (100 - delivery) * 0.4 +
    defect * 0.2 +
    cancel * 0.2 +
    delay * 0.2;

  let riskLevel = "";
  let riskDescription = "";

  if (riskScore <= 20) {
    riskLevel = "LOW RISK";
    riskDescription = "This supplier demonstrates strong performance across key indicators such as timely delivery, low defect rate, minimal cancellations, and limited delays. Based on the provided data, the supplier appears reliable and suitable for continued business engagement.";
  } else if (riskScore <= 50) {
    riskLevel = "MEDIUM RISK";
    riskDescription = "This supplier shows moderate risk due to noticeable concerns in one or more performance areas. While the supplier may still be usable, closer monitoring and periodic evaluation are recommended before making long-term procurement decisions.";
  } else {
    riskLevel = "HIGH RISK";
    riskDescription = "This supplier presents significant risk based on poor performance indicators such as lower delivery reliability, higher defect levels, increased cancellations, or frequent delays. Careful review and risk mitigation strategies are strongly advised before proceeding.";
  }

  const resultData = {
    name,
    delivery,
    defect,
    cancel,
    delay,
    riskScore: riskScore.toFixed(2),
    riskLevel,
    riskDescription
  };

  localStorage.setItem("riskwiseResult", JSON.stringify(resultData));
  window.location.href = "result.html";
}

function displayResult() {
  const data = JSON.parse(localStorage.getItem("riskwiseResult"));

  if (!data) {
    document.getElementById("resultContent").innerHTML = "<p>No assessment data found.</p>";
    return;
  }

  document.getElementById("resultContent").innerHTML = `
    <p><strong>Supplier Name:</strong> ${data.name}</p>
    <p><strong>On-Time Delivery Rate:</strong> ${data.delivery}%</p>
    <p><strong>Defective Product Rate:</strong> ${data.defect}%</p>
    <p><strong>Order Cancellation Rate:</strong> ${data.cancel}%</p>
    <p><strong>Delay Frequency:</strong> ${data.delay} per month</p>
    <hr>
    <p class="score"><strong>Risk Score:</strong> ${data.riskScore}</p>
    <p class="level"><strong>Risk Level:</strong> ${data.riskLevel}</p>
    <p class="description"><strong>Assessment Summary:</strong> ${data.riskDescription}</p>
  `;
}

function downloadPDF() {
  const data = JSON.parse(localStorage.getItem("riskwiseResult"));
  if (!data) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Light gray background
  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, 210, 297, 'F');

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("RiskWise", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Smarter Supplier Decisions Start Here.", 105, 28, { align: "center" });

  // Box
  doc.setDrawColor(0);
  doc.rect(15, 35, 180, 220);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Supplier Risk Assessment Report", 105, 48, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let y = 65;
  doc.text(`Supplier Name: ${data.name}`, 25, y); y += 12;
  doc.text(`On-Time Delivery Rate: ${data.delivery}%`, 25, y); y += 12;
  doc.text(`Defective Product Rate: ${data.defect}%`, 25, y); y += 12;
  doc.text(`Order Cancellation Rate: ${data.cancel}%`, 25, y); y += 12;
  doc.text(`Delay Frequency: ${data.delay} per month`, 25, y); y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Risk Score: ${data.riskScore}`, 25, y); y += 14;
  doc.text(`Risk Level: ${data.riskLevel}`, 25, y); y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Assessment Summary:", 25, y); y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const wrappedText = doc.splitTextToSize(data.riskDescription, 160);
  doc.text(wrappedText, 25, y);

  y += wrappedText.length * 7 + 20;

  doc.setFontSize(10);
  doc.text("Contact: riskwisesafe@gmail.com | 1234567890", 25, 265);
  doc.text("Generated by RiskWise - Supplier Risk Assessment Platform", 25, 273);

  doc.save("RiskWise_Supplier_Risk_Report.pdf");
}// Theme Toggle for all pages
document.addEventListener("DOMContentLoaded", function () {
  const themeSwitch = document.getElementById("themeSwitch");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    if (themeSwitch) themeSwitch.checked = false;
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    if (themeSwitch) themeSwitch.checked = true;
  }

  if (themeSwitch) {
    themeSwitch.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Load result on result page
  if (document.getElementById("resultContent")) {
    displayResult();
  }

  // Initialize default supplier historical data if not present
  initializeHistoricalData();
});

function initializeHistoricalData() {
  if (!localStorage.getItem("supplierDatabase")) {
    const supplierDatabase = {
      "alpha traders": {
        name: "Alpha Traders",
        delivery: 95,
        defect: 3,
        cancel: 2,
        delay: 1
      },
      "beta supplies": {
        name: "Beta Supplies",
        delivery: 82,
        defect: 8,
        cancel: 5,
        delay: 3
      },
      "gamma industries": {
        name: "Gamma Industries",
        delivery: 68,
        defect: 15,
        cancel: 10,
        delay: 6
      },
      "delta logistics": {
        name: "Delta Logistics",
        delivery: 90,
        defect: 4,
        cancel: 3,
        delay: 2
      }
    };

    localStorage.setItem("supplierDatabase", JSON.stringify(supplierDatabase));
  }
}

function fetchHistoricalData() {
  const searchName = document.getElementById("historyName").value.trim().toLowerCase();
  const historyResult = document.getElementById("historyResult");

  if (!searchName) {
    historyResult.innerHTML = `<p class="history-message error">Please enter a supplier name to fetch data.</p>`;
    return;
  }

  const supplierDatabase = JSON.parse(localStorage.getItem("supplierDatabase")) || {};
  const supplier = supplierDatabase[searchName];

  if (supplier) {
    // Auto-fill form
    document.getElementById("name").value = supplier.name;
    document.getElementById("delivery").value = supplier.delivery;
    document.getElementById("defect").value = supplier.defect;
    document.getElementById("cancel").value = supplier.cancel;
    document.getElementById("delay").value = supplier.delay;

    historyResult.innerHTML = `
      <div class="history-success">
        <p><strong>Data fetched successfully for:</strong> ${supplier.name}</p>
        <p>The supplier details have been auto-filled into the assessment form below. You may review or edit the values before submitting.</p>
      </div>
    `;
  } else {
    historyResult.innerHTML = `
      <div class="history-message error">
        <p><strong>No historical data found.</strong></p>
        <p>Please enter supplier details manually in the form below.</p>
      </div>
    `;
  }
}

function calculateRisk() {
  let name = document.getElementById("name").value.trim();
  let delivery = parseFloat(document.getElementById("delivery").value);
  let defect = parseFloat(document.getElementById("defect").value);
  let cancel = parseFloat(document.getElementById("cancel").value);
  let delay = parseFloat(document.getElementById("delay").value);

  if (!name || isNaN(delivery) || isNaN(defect) || isNaN(cancel) || isNaN(delay)) {
    alert("Please fill in all fields.");
    return;
  }

  let riskScore =
    (100 - delivery) * 0.4 +
    defect * 0.2 +
    cancel * 0.2 +
    delay * 0.2;

  let riskLevel = "";
  let riskDescription = "";

  if (riskScore <= 20) {
    riskLevel = "LOW RISK";
    riskDescription = "This supplier demonstrates strong performance across key indicators such as timely delivery, low defect rate, minimal cancellations, and limited delays. Based on the provided data, the supplier appears reliable and suitable for continued business engagement.";
  } else if (riskScore <= 50) {
    riskLevel = "MEDIUM RISK";
    riskDescription = "This supplier shows moderate risk due to noticeable concerns in one or more performance areas. While the supplier may still be usable, closer monitoring and periodic evaluation are recommended before making long-term procurement decisions.";
  } else {
    riskLevel = "HIGH RISK";
    riskDescription = "This supplier presents significant risk based on poor performance indicators such as lower delivery reliability, higher defect levels, increased cancellations, or frequent delays. Careful review and risk mitigation strategies are strongly advised before proceeding.";
  }

  // Save/update supplier in historical database
  const supplierDatabase = JSON.parse(localStorage.getItem("supplierDatabase")) || {};
  supplierDatabase[name.toLowerCase()] = {
    name,
    delivery,
    defect,
    cancel,
    delay
  };
  localStorage.setItem("supplierDatabase", JSON.stringify(supplierDatabase));

  const resultData = {
    name,
    delivery,
    defect,
    cancel,
    delay,
    riskScore: riskScore.toFixed(2),
    riskLevel,
    riskDescription
  };

  localStorage.setItem("riskwiseResult", JSON.stringify(resultData));
  window.location.href = "result.html";
}

function displayResult() {
  const data = JSON.parse(localStorage.getItem("riskwiseResult"));

  if (!data) {
    document.getElementById("resultContent").innerHTML = "<p>No assessment data found.</p>";
    return;
  }

  document.getElementById("resultContent").innerHTML = `
    <p><strong>Supplier Name:</strong> ${data.name}</p>
    <p><strong>On-Time Delivery Rate:</strong> ${data.delivery}%</p>
    <p><strong>Defective Product Rate:</strong> ${data.defect}%</p>
    <p><strong>Order Cancellation Rate:</strong> ${data.cancel}%</p>
    <p><strong>Delay Frequency:</strong> ${data.delay} per month</p>
    <hr>
    <p class="score"><strong>Risk Score:</strong> ${data.riskScore}</p>
    <p class="level"><strong>Risk Level:</strong> ${data.riskLevel}</p>
    <p class="description"><strong>Assessment Summary:</strong> ${data.riskDescription}</p>
  `;
}

function downloadPDF() {
  const data = JSON.parse(localStorage.getItem("riskwiseResult"));
  if (!data) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("RiskWise", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Smarter Supplier Decisions Start Here.", 105, 28, { align: "center" });

  doc.setDrawColor(0);
  doc.rect(15, 35, 180, 220);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Supplier Risk Assessment Report", 105, 48, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let y = 65;
  doc.text(`Supplier Name: ${data.name}`, 25, y); y += 12;
  doc.text(`On-Time Delivery Rate: ${data.delivery}%`, 25, y); y += 12;
  doc.text(`Defective Product Rate: ${data.defect}%`, 25, y); y += 12;
  doc.text(`Order Cancellation Rate: ${data.cancel}%`, 25, y); y += 12;
  doc.text(`Delay Frequency: ${data.delay} per month`, 25, y); y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Risk Score: ${data.riskScore}`, 25, y); y += 14;
  doc.text(`Risk Level: ${data.riskLevel}`, 25, y); y += 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Assessment Summary:", 25, y); y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const wrappedText = doc.splitTextToSize(data.riskDescription, 160);
  doc.text(wrappedText, 25, y);

  doc.setFontSize(10);
  doc.text("Contact: riskwisesafe@gmail.com | 1234567890", 25, 265);
  doc.text("Generated by RiskWise - Supplier Risk Assessment Platform", 25, 273);

  doc.save("RiskWise_Supplier_Risk_Report.pdf");
}
