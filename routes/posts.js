const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// แสดงหน้าหลัก + โพสต์ทั้งหมด
router.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

// แสดงฟอร์มสร้างโพสต์
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// สร้างโพสต์ใหม่
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.redirect('/');
});

// แสดงโพสต์เดียว
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/show', { post });
});

module.exports = router;