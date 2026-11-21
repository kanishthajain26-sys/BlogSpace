
const API = "https://blogspace-us0g.onrender.com/api";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Register User

if (registerForm) {

    registerForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("message");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match";
            return;
        }

        try {

            const response = await fetch(`${API}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            message.style.color = "green";
            message.textContent = "Account created successfully!";

            registerForm.reset();

            setTimeout(function() {
                window.location.href = "login.html";
            }, 1000);

        } catch (error) {
            message.style.color = "red";
            message.textContent = error.message;
        }

    });
}

// Login User

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("message");

        try {

            const response = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "dashboard.html";

        } catch (error) {
            message.textContent = error.message;
        }

    });
}

