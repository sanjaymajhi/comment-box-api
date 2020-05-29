const validator = require("express-validator");

const Comment = require("../models/comments");

exports.comments = (req, res, next) => {
  Comment.find({}).exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (result) {
      res.status(200).json({ comments: result });
    }
  });
};

exports.postComment = [
  validator
    .body("name", "name cannot be empty")
    .isLength({ min: 1 })
    .escape()
    .trim(),
  validator
    .body("value", "comment cannot be empty")
    .isLength({ min: 1 })
    .escape()
    .trim(),
  async (req, res, next) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors });
      return;
    }

    const comment = new Comment({
      name: req.body.name,
      value: req.body.value,
    });
    await comment.save((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ value: comment });
    });
  },
];

exports.upVote = (req, res, next) => {
  Comment.findById(req.params.id).exec(async (err, result) => {
    if (err) {
      return next(err);
    }
    if (result) {
      const comment = { ...result._doc };
      comment.upvotes += 1;
      await Comment.findByIdAndUpdate(comment._id, comment, {}, (err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus = 200;
        res.end();
      });
    }
  });
};

exports.downVote = (req, res, next) => {
  Comment.findById(req.params.id).exec(async (err, result) => {
    if (err) {
      return next(err);
    }
    if (result) {
      const comment = { ...result._doc };
      comment.downvotes += 1;
      await Comment.findByIdAndUpdate(comment._id, comment, {}, (err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus = 200;
        res.end();
      });
    }
  });
};
