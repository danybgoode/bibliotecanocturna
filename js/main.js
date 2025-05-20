const isLocalhost = window.location.hostname === "localhost";
const BASE_URL = isLocalhost ? "http://localhost:5433" : "https://api.bibliotecanocturna.com.mx";

let formData = {};

function showConfirmation() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const plan = document.getElementById("plan").value;

  formData = { email, password, plan };

  const details = document.getElementById("confirm-details");
  details.innerHTML = `
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Plan:</strong> ${plan}</li>
  `;

  document.getElementById("form-step").style.display = "none";
  document.getElementById("confirm-step").style.display = "block";
}

function goBack() {
  document.getElementById("confirm-step").style.display = "none";
  document.getElementById("form-step").style.display = "block";
}

async function submitSignup() {
  const messageEl = document.getElementById("message");
  messageEl.innerText = "Creating account...";

  try {
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      messageEl.style.color = "lightgreen";
      messageEl.innerText = "Account created! Redirecting to login...";
      setTimeout(() => {
        window.location.href = "https://api.bibliotecanocturna.com.mx/login";
      }, 2000);
    } else {
      messageEl.style.color = "salmon";
      messageEl.innerText = result.error || "Something went wrong.";
    }
  } catch (err) {
    messageEl.style.color = "salmon";
    messageEl.innerText = "Could not connect to server.";
    console.error(err);
  }
}