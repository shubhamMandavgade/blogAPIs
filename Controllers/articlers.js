const express = require('express');
var router = express.Router();
const conn = require('../db')


//all blogs with comments
router.get('/api/articles',(req, res) => {
    let sql = "SELECT A.arcticle_id as article_id, A.title as title, A.nickname as nickname,A.content as content,C.cmt_id as comment_id, C.nickname as cmt_nickname,C.comment_cont as comments, A.created_at as blog_created_at, C.created_at as cooment_at from articles A left join comments C on A.arcticle_id = C.FK_arcticle_id";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //comments on particular blog
  router.get('/api/comments-on-blog',(req, res) => {
    let sql = "select * from comments where FK_arcticle_id="+req.query.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //All comments
  router.get('/api/comments',(req, res) => {
    let sql = "select * from comments";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

  //All comments with sub comments
  router.get('/api/comments-on-comments',(req, res) => {
    let sql = "SELECT A.arcticle_id as article_id, A.title as title, A.nickname as nickname,A.content as content,C.cmt_id as comment_id, C.nickname as cmt_nickname,C.comment_cont as comments, A.created_at as blog_created_at, C.created_at as cooment_at from articles A left join comments C on A.arcticle_id = C.FK_arcticle_id;";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  //show single articles
  router.get('/api/articles/:id',(req, res) => {
    let sql = "SELECT * FROM articles WHERE article_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
   
  var moment = require('moment');
  var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  //add new blog
  router.post('/api/blog',(req, res) => {
    let data = {title: req.body.title, nickname: req.body.nickname,content: req.body.content,created_at:mysqlTimestamp};
    let sql = "INSERT INTO articles SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err){
        console.log(err)
        res.send(err)
      }else{
        res.send(results);
      }
    });
  });

  //add comment on particular blog
  router.post('/api/comments',(req, res) => {
    let data = {nickname: req.body.nickname,comment_cont: req.body.comment_cont,created_at:mysqlTimestamp,FK_arcticle_id:req.body.FK_arcticle_id};
    let sql = "INSERT INTO comments SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err){
        console.log(err)
        res.send(err)
      }else{
        res.send(results);
      }    });
  });
   
  
  //add comments on comments
  router.post('/api/comments-on-comments',(req, res) => {
    let data = {nickname: req.body.nickname,comments: req.body.comments,created_at:mysqlTimestamp,comment_id:req.body.comment_id};
    let sql = "INSERT INTO comments_on_comments SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err){
        console.log(err)
        res.send(err)
      }else{
        res.send(results);
      }    });
  });

  module.exports = router;