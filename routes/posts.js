const express = require('express');
const {db} = require('../config/db');
const router = express.Router();

// Create a new post
router.post('/',(req,res)=>{
    const {title,content,category,tags} = req.body;
    const query = 'INSERT INTO posts (title,content,category,tags,createdAt,updatedAt) VALUES (?,?,?,?,NOW(),NOW())';
    db.query(query,[title,content,category,JSON.stringify(tags)],(err,result)=>{
        if (err) return res.status(400).json({error:err.message});
        res.status(201).json({id:result.insertId,title,content,category,tags,createdAt:new Date(),updatedAt:new Date()});
    });
});

// Update an existing post
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {title,content,category,tags} = req.body;
    const query = 'UPDATE posts SET title = ?, content = ?,category = ?, tags = ?, updatedAt = NOW() WHERE id=?';
    db.query(query,[title,content,category,JSON.stringify(tags),id],(err,result) => {
        if(err) return res.status(400).json({error:err.message});
        if(result.affectedRows === 0) return res.status(404).json({error:'Post not found'});
        res.status(200).json({id,title,content,category,tags,updatedAt:new Date()});
    });
});

// Delete a post
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const query = 'DELETE FROM posts WHERE id = ?';
    db.query(query,[id],(err,result)=>{
        if(err) return res.status(400).json({error:err.message});
        if(result.affectedRows===0) return res.status(404).json({error:'Post not found'});
        res.status(204).send();
    });
});

// Get a single post
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const query = 'SELECT * FROM posts WHERE id = ?';
    db.query(query,[id],(err,results)=>{
        if(err) return res.status(400).json({error:err.message});
        if(results.length===0) return res.status(404).json({error:'Post not found'});
        res.status(200).json(results[0]);
    });
});

// Get all posts with optional search
router.get('/',(req,res)=>{
    const {term} = req.query;
    const query = term 
    ? 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? OR category LIKE ?'
    : 'SELECT * FROM posts';
    const params = term ? [`%${term}%`,`%${term}%`,`%${term}%`] : [];
    db.query(query,params,(err,results)=>{
        if(err) return res.status(400).json({error:err.message});
        res.status(200).json(results);
    });
});

module.exports = router;