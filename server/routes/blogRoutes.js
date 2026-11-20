
const express = require("express");

const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL BLOGS + SEARCH + CATEGORY FILTER
router.get("/", async (req, res) => {
    try {
        const { search, category } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }

        const blogs = await Blog.find(filter)
            .populate("author", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(blogs);

    } catch (error) {
        console.error("Get Blogs Error:", error);

        res.status(500).json({
            message: "Could not fetch blogs."
        });
    }
});

// GET LOGGED-IN USER'S BLOGS
router.get("/my-blogs", authMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find({
            author: req.user.userId
        })
            .populate("author", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(blogs);

    } catch (error) {
        res.status(500).json({
            message: "Could not fetch your blogs."
        });
    }
});

// CREATE BLOG
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, category, content } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const allowedCategories = [
            "Technology",
            "Education",
            "Lifestyle",
            "Travel",
            "Programming",
            "Other"
        ];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid blog category."
            });
        }

        const blog = await Blog.create({
            title,
            category,
            content,
            author: req.user.userId
        });

        const savedBlog = await Blog.findById(blog._id)
            .populate("author", "name");

        res.status(201).json({
            message: "Blog created successfully!",
            blog: savedBlog
        });

    } catch (error) {
        console.error("Create Blog Error:", error);

        res.status(500).json({
            message: "Could not create blog."
        });
    }
});

// GET SINGLE BLOG
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "name");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        res.status(200).json(blog);

    } catch (error) {
        res.status(400).json({
            message: "Invalid blog ID."
        });
    }
});

// UPDATE BLOG
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, category, content } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const allowedCategories = [
            "Technology",
            "Education",
            "Lifestyle",
            "Travel",
            "Programming",
            "Other"
        ];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                message: "Invalid blog category."
            });
        }

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only update your own blogs."
            });
        }

        blog.title = title;
        blog.category = category;
        blog.content = content;

        await blog.save();

        const updatedBlog = await Blog.findById(blog._id)
            .populate("author", "name");

        res.status(200).json({
            message: "Blog updated successfully!",
            blog: updatedBlog
        });

    } catch (error) {
        console.error("Update Blog Error:", error);

        res.status(400).json({
            message: "Could not update blog."
        });
    }
});

// DELETE BLOG
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found."
            });
        }

        if (blog.author.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You can only delete your own blogs."
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Blog deleted successfully!"
        });

    } catch (error) {
        console.error("Delete Blog Error:", error);

        res.status(400).json({
            message: "Could not delete blog."
        });
    }
});

module.exports = router;
