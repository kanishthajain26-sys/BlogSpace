
const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE BLOG API
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newBlog = new Blog({
      title,
      category,
      content,
      author: req.user,
      user: req.user
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog published successfully!",
      blog: newBlog
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET LOGGED-IN USER'S BLOGS
router.get("/my-blogs", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({
      user: req.user
    }).sort({ createdAt: -1 });

    res.status(200).json({ blogs });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET ALL BLOGS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({ blogs });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET SINGLE BLOG
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({ blog });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// EDIT BLOG
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const blog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user
      },
      { title, category, content },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized"
      });
    }

    res.status(200).json({
      message: "Blog updated successfully!",
      blog
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// DELETE BLOG
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found or unauthorized"
      });
    }

    res.status(200).json({
      message: "Blog deleted successfully!"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
