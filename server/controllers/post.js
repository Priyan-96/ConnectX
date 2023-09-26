const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment')

const getPosts = (req, res) => {

    const userId = req.query.userId;

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");
        const query = ((userId === 'undefined')) ? `
        SELECT DISTINCT p.*, u.uid AS userId, u.username, u.profilepic 
        FROM posts AS p 
        JOIN users AS u ON (u.uid = p.puserid) 
        LEFT JOIN relationships AS r ON (p.puserid = r.followedid) 
        WHERE r.followerid = ? OR p.puserid = ? 
        ORDER BY p.pid DESC
        ` : `SELECT p.*, u.uid AS userId, 
        u.username, u.profilepic 
        FROM posts AS p 
        JOIN users AS u ON (u.uid = p.puserid) WHERE p.puserid = ?
        ORDER BY p.pid DESC
        `

        const values = (userId === 'undefined') ? [userInfo.id, userInfo.id] : userId;

        db.query(query, values, (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json(data);
        });

    });
}


const addPost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "INSERT INTO posts (`pdesc`,`pimg`, `puserid`,`pcreateat`) VALUES (?)"

        const values = [
            req.body.desc,
            req.body.pimg,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ];

        db.query(query, [values], (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json("Post created!");
        });
    });

}

const deletePost = (req, res) => {

    const postId = req.query.postId;
    

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "DELETE FROM posts WHERE `puserid` = (?) AND `pid` = (?)"

        db.query(query, [userInfo.id, postId], (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json(data);
        });
    });
}

module.exports = {
    getPosts,
    addPost,
    deletePost,
};
