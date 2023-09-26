const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getComments = (req, res) => {

    const query = `
        SELECT c.*, u.uid, u.username, u.profilepic
        FROM comments as c 
        JOIN users as u ON (c.cuserid = u.uid)
        WHERE c.cpostid = ? 
        ORDER BY c.ccreateat DESC
    `;

    db.query(query, [req.query.postId], (err, data) => {
        if (err) return res.status(409).json(err);
        return res.status(200).json(data);
    });
}

const addComment = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "INSERT INTO comments (cdesc,cuserid,cpostid,ccreateat) VALUES (?)"

        const values = [
            req.body.desc,
            userInfo.id,
            req.query.postId,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]

        db.query(query, [values], (err,data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json("Comments posted successfully!");
        })
    });

}

module.exports = {
    getComments,
    addComment,
};