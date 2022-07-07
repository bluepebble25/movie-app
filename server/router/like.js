const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

router.post('/getLikes', (req, res) => {

  let variable = {};

  if(req.body.movieId) {
    variable = { movieId: req.body.movieId }
  } else {
    variable = { commentId: req.body.commentId }
  }

  Like.find(variable)
    .exec((err, likes) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, likes });
    })
});

router.post('/getDislikes', (req, res) => {

  let variable = {};

  if(req.body.movieId) {
    variable = { movieId: req.body.movieId }
  } else {
    variable = { commentId: req.body.commentId }
  }

  Dislike.find(variable)
    .exec((err, dislikes) => {
      if(err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislikes });
    })
});

router.post('/upLike', (req, res) => {
  let variable = {};

  if(req.body.movieId) {
    variable = { movieId: req.body.movieId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  // 만약 dislike가 이미 클릭되어있다면 like 정보를 저장하면서 dislike 기록 삭제
  const like = new Like(variable);
  like.save((err, likeResult) => {
    if(err) return res.json({ success: false, err })

    Dislike.findOneAndDelete(variable)
      .exec((err, disLikeResult) => {
        if(err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
      });
  })

});

router.post('/upDisLike', (req, res) => {
  let variable = {};

  if(req.body.movieId) {
    variable = { movieId: req.body.movieId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId, userId: req.body.userId }
  }

  const dislike = new Dislike(variable);
  dislike.save((err, dislikeResult) => {
    if(err) return res.json({ success: false, err })

    Like.findOneAndDelete(variable)
      .exec((err, likeResult) => {
        if(err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true });
      });
  })

});

module.exports = router;