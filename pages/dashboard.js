
const API = "https://blogspace-us0g.onrender.com/api";

const token = localStorage.getItem("token");

if (!token) {
    window.location.replace("login.html");
}

const headers = {
    "Authorization": `Bearer ${token}`
};

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Load Profile and My Blogs

async function loadDashboard() {

    try {

        const profileResponse = await fetch(
            `${API}/auth/profile`,
            { headers }
        );

        if (profileResponse.status === 401) {
            throw new Error("Session expired. Please login again.");
        }

        const user = await profileResponse.json();

        if (!profileResponse.ok) {
            throw new Error(user.message);
        }

        document.getElementById("userName").textContent =
            `Name: ${user.name}`;

        document.getElementById("userEmail").textContent =
            `Email: ${user.email}`;

        const blogsResponse = await fetch(
            `${API}/blogs/my-blogs`,
            { headers }
        );

        const blogs = await blogsResponse.json();

        if (!blogsResponse.ok) {
            throw new Error(blogs.message);
        }

        const container = document.getElementById("myBlogs");

        if (blogs.length === 0) {
            container.innerHTML = `
                <p class="empty-message">
                    You have not created any blogs yet.
                </p>
            `;
            return;
        }

        container.innerHTML = blogs.map(blog => `

            <article class="dashboard-blog">

                <h3>${escapeHTML(blog.title)}</h3>

                <span>${escapeHTML(blog.category)}</span>

                <p>
                    ${escapeHTML((blog.content || "").slice(0, 140))}
                </p>

                <div class="blog-actions">

                    <a href="blog-details.html?id=${encodeURIComponent(blog._id)}">
                        Read
                    </a>

                    <a href="create-blog.html?id=${encodeURIComponent(blog._id)}">
                        Edit
                    </a>

                    <button
                        type="button"
                        data-delete-id="${escapeHTML(blog._id)}">
                        Delete
                    </button>

                </div>

            </article>

        `).join("");

        container.querySelectorAll("[data-delete-id]")
            .forEach(button => {
                button.addEventListener("click", function() {
                    deleteBlog(button.dataset.deleteId);
                });
            });

    } catch (error) {

        alert(error.message);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.replace("login.html");
    }
}

// Delete Blog

async function deleteBlog(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `${API}/blogs/${encodeURIComponent(id)}`,
            {
                method: "DELETE",
                headers
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        alert("Blog deleted successfully!");

        loadDashboard();

    } catch (error) {
        alert(error.message);
    }
}

// Logout

document.getElementById("logoutBtn")
    .addEventListener("click", function(event) {

        event.preventDefault();

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.replace("login.html");
    });

loadDashboard();

