
const API_BASE = "https://blogspace-us0g.onrender.com/api";

let allBlogs = [];

function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Update navbar after login

function updateNavbar() {
    const nav = document.getElementById("navButtons");

    if (!nav) return;

    const token = localStorage.getItem("token");

    if (token) {
        nav.innerHTML = `
            <a class="login-btn" href="pages/dashboard.html">
                Dashboard
            </a>

            <a class="signup-btn" href="#" id="homeLogout">
                Logout
            </a>
        `;

        document.getElementById("homeLogout")
            .addEventListener("click", function(event) {
                event.preventDefault();

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.reload();
            });
    }
}

// Display blogs

function renderBlogs(blogs) {
    const container = document.getElementById("blogContainer");

    if (!container) return;

    if (blogs.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                No blogs found.
            </p>
        `;
        return;
    }

    container.innerHTML = blogs.map(blog => `
        <article class="blog-card">

            <div class="blog-image">
                ${escapeHTML(blog.category)}
            </div>

            <div class="blog-info">

                <span>${escapeHTML(blog.category)}</span>

                <h3>${escapeHTML(blog.title)}</h3>

                <p>
                    ${escapeHTML((blog.content || "").slice(0, 130))}
                    ...
                </p>

                <p>
                    By ${escapeHTML(blog.author?.name || "Unknown")}
                </p>

                <a href="pages/blog-details.html?id=${encodeURIComponent(blog._id)}">
                    Read More
                </a>

            </div>
        </article>
    `).join("");
}

// Search and category filter

function filterBlogs() {
    const search = document
        .getElementById("searchInput")
        ?.value.toLowerCase() || "";

    const category = document
        .getElementById("categoryFilter")
        ?.value || "";

    const filteredBlogs = allBlogs.filter(blog => {

        const matchesSearch =
            `${blog.title} ${blog.content} ${blog.author?.name || ""}`
            .toLowerCase()
            .includes(search);

        const matchesCategory =
            !category || blog.category === category;

        return matchesSearch && matchesCategory;
    });

    renderBlogs(filteredBlogs);
}

// Fetch all blogs from backend

async function loadBlogs() {
    const container = document.getElementById("blogContainer");

    try {
        const response = await fetch(`${API_BASE}/blogs`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not load blogs");
        }

        allBlogs = data;

        filterBlogs();

    } catch (error) {
        if (container) {
            container.innerHTML = `
                <p class="empty-message">
                    ${escapeHTML(error.message)}.
                    Make sure backend is running.
                </p>
            `;
        }
    }
}

updateNavbar();

document.getElementById("searchInput")
    ?.addEventListener("input", filterBlogs);

document.getElementById("categoryFilter")
    ?.addEventListener("change", filterBlogs);

loadBlogs();

