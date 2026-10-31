
const express = require("express");

const router = express.Router();

let blogs = [];

// CREATE BLOG API
router.post("/create", (req, res) => {
  const { title, category, content, author } = req.body;

  if (!title || !category || !content || !author) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newBlog = {
    id: Date.now(),
    title,
    category,
    content,
    author,
    createdAt: new Date()
  };

  blogs.push(newBlog);

  res.status(201).json({
    message: "Blog published successfully!",
    blog: newBlog
  });
});

// GET ALL BLOGS API
router.get("/", (req, res) => {
  res.status(200).json({
    blogs: blogs
  });
});

// EDIT BLOG API
router.put("/:id", (req, res) => {
  const blogId = Number(req.params.id);

  const { title, category, content } = req.body;

  const blog = blogs.find(function (blog) {
    return blog.id === blogId;
  });

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found"
    });
  }

  if (!title || !category || !content) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  blog.title = title;
  blog.category = category;
  blog.content = content;

  res.status(200).json({
    message: "Blog updated successfully!",
    blog: blog
  });
});

// DELETE BLOG API
router.delete("/:id", (req, res) => {
  const blogId = Number(req.params.id);

  const blogIndex = blogs.findIndex(function (blog) {
    return blog.id === blogId;
  });

  if (blogIndex === -1) {
    return res.status(404).json({
      message: "Blog not found"
    });
  }

  blogs.splice(blogIndex, 1);

  res.status(200).json({
    message: "Blog deleted successfully!"
  });
});

module.exports = router;
