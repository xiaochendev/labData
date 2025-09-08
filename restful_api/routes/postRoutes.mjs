import express from "express";
import { posts } from "../data/posts.mjs";
import { comments } from "../data/comments.mjs";
const router = express.Router();

// GET /api/posts?userId=<VALUE>
  // Retrieves all posts by a user with the specified postId.
  // It is common for APIs to have multiple endpoints that accomplish the same task. This route uses a "userId" query parameter to filter posts, while the one above uses a route parameter.
// GET /posts/:id/comments
  // Retrieves all comments made on the post with the specified id.
// GET /posts/:id/comments?userId=<VALUE>
  // Retrieves all comments made on the post with the specified id by a user with the specified userId.


// @route GET /api/posts
// @desc Get all posts
// @access Public
router
  .route("/")
  .get((req, res) => {
    res.json(posts);
  })

  // @route   POST /api/posts
  // @desc    Create a new post
  // @body    userId=<number>, title=<string>, content=<string>
  // @access  Public
  .post((req, res) => {
    const { userId, title, content } = req.body; // grabbing data the client entered through req.body
    let id = posts[posts.length - 1].id + 1; // creating a new id
    // let id = posts.length++;

    // creating a new object that will be pushed to the posts array
    if (userId && title && content) {
      const post = {
        id: id,
        userId: userId,
        title: title,
        content: content,
      };
      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else {
      res.json({ error: "Insufficient Data" });
    }
  });

// @route   GET /api/posts/:id
// @desc    Get a single post by its ID
// @access  Public
// @route   PATCH /api/posts/:id
// @desc    Update a post by its ID
// @access  Public
// @route   DELETE /api/posts/:id
// @desc    Delete a post by its ID
// @access  Public
router
  .route("/:id")
  .get((req, res) => {
    const post = posts.find((post) => post.id == req.params.id);

    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // find the item that the client wants to update
    const id = req.params.id;
    const data = req.body;
    const post = posts.find((post, i) => {
      if (post.id == id) {
        for (const item in data) {
          // in the posts array grab the post that the client wants to change
          posts[i][item] = data[item]; // make the change
        }
        return true;
      }
    });

    // send a response
    if (post) {
      res.json(posts);
    } else next();
  })

  .delete((req, res, next) => {
    // find the post that the client want to delete
    const id = req.params.id;
    const post = posts.find((post, i) => {
      if (post.id == id) {
        posts.splice(i, 1); // remove the post at index i
        return true;
      }
    });

    // send the client a response
    if (post) {
      res.json(posts);
    } else next();
  });

// @route   GET /api/posts/:id/comments
// @desc    Retrieve all comments made on a specific post
// @query   userId (optional) - Filters comments to only those made by the specified user
// @param   id - ID of the post to retrieve comments for
// @access  Public
router
  .route('/:id/comments')
  .get((req, res, next) => {
      const { id } = req.params;
      const { userId } = req.query;

      let postComments = comments.filter((comment) => comment.postId == id);

      // Filter by userId if provided
      if (userId) {
          postComments = postComments.filter((comment) => comment.userId == userId);
      }
    
      if (postComments.length > 0) {
          res.json(postComments);
      } else {
        next(); // Triggers global 404 if no comments found
      }
  })

export default router;