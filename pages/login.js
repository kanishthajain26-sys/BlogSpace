
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch(
            "https://blogspace-us0g.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        if (!data.token) {
            throw new Error("Login token not received");
        }

        // Save the latest login token
        localStorage.setItem("token", data.token);

        // Save user details
        localStorage.setItem("user", JSON.stringify(data.user));

        message.textContent = "Login successful!";

        window.location.href = "dashboard.html";

    } catch (error) {
        message.textContent = error.message;
    }
});

