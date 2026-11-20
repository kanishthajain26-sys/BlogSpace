
const API = "http://localhost:5000/api";

const token = localStorage.getItem("token");

if (!token) {
    window.location.replace("login.html");
}

const form = document.getElementById("blogForm");

if (form) {

    const blogId = new URLSearchParams(
        window.location.search
    ).get("id");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    // Load existing blog for editing

    async function loadBlogForEdit() {

        if (!blogId) return;

        try {

            const response = await fetch(
                `${API}/blogs/${encodeURIComponent(blogId)}`
            );

            const blog = await response.json();

            if (!response.ok) {
                throw new Error(blog.message);
            }

            const profileResponse = await fetch(
                `${API}/auth/profile`,
                { headers }
            );

            const profile = await profileResponse.json();

            if (!profileResponse.ok ||
                String(blog.author?._id) !== String(profile._id)) {

                throw new Error("You can only edit your own blogs.");
            }

            document.getElementById("title").value = blog.title;
            document.getElementById("category").value = blog.category;
            document.getElementById("content").value = blog.content;

            document.getElementById("formTitle").textContent =
                "Edit Blog";

            document.getElementById("submitBtn").textContent =
                "Update Blog";

        } catch (error) {

            alert(error.message);
            window.location.href = "dashboard.html";
        }
    }

    // Create or Update Blog

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const message = document.getElementById("message");

        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value.trim();

        try {

            const response = await fetch(
                blogId
                    ? `${API}/blogs/${encodeURIComponent(blogId)}`
                    : `${API}/blogs`,
                {
                    method: blogId ? "PUT" : "POST",
                    headers,
                    body: JSON.stringify({
                        title,
                        category,
                        content
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            message.style.color = "green";

            message.textContent = blogId
                ? "Blog updated successfully!"
                : "Blog published successfully!";

            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);

        } catch (error) {

            message.style.color = "red";
            message.textContent = error.message;
        }

    });

    loadBlogForEdit();
}
