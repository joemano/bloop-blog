const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');

exports.getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const pageNumber = Number(page);

    // This is the number of posts per page
    const LIMIT = 8;

    // This is the first index of every page
    const startIndex = (pageNumber - 1) * 8;

    // Knowing the total is important for know the last page we can go to
    const total = await PostMessage.countDocuments({});

    // Find the newest posts up to the limit skipping to the starting index of the page
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: pageNumber, numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');

    // $or to find a match either tags or title of posts
    // Because tags is an array $in is used to look for matching tags in the array
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.status(200).json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  // check if it's a mongoose object
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { id: _id } = req.params;

  // check if it's a mongoose object
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  await PostMessage.findByIdAndRemove(_id);

  res.json({ message: 'Post deleted successfully!' });
};

exports.likePost = async (req, res) => {
  const { id: _id } = req.params;

  // check if user is authenticated
  if (!req.userId) return res.json({ message: 'Not authenticated.' });

  // check if it's a mongoose object
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No post with that id');
  }

  const post = await PostMessage.findById(_id);

  // Posts will keep track of which users already liked it using the user id
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // Like the post
    post.likes.push(req.userId);
  } else {
    // unlike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

exports.commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  // check if user is authenticated
  if (!req.userId) return res.json({ message: 'Not authenticated.' });

  // check if it's a mongoose object
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id');
  }

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};