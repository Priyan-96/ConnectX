const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getlikes = (req, res) => {

    const query = `
        SELECT luserid FROM likes WHERE lpostid = ?
    `

    db.query(query, [req.query.postId], (err, data) => {
        if (err) return res.status(409).json(err);
        return res.status(200).json(data.map(like => like.luserid))
    });
}

const addlike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(409).jaon("Invalid Token!")

        const query = "INSERT INTO likes (`luserid`,`lpostid`) VALUES (?, ?)";

        const values = [
            userInfo.id,
            req.query.postId,
        ]

        db.query(query, values, (err, data) => {
            if (err) return res.status(409).json(err);

            return res.status(200).json("Liked Successfully!")
        })


    });

}

const deletelike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, 'secretKey', (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!")

        const query = "DELETE FROM likes WHERE `luserid` = ? AND lpostid = ?"

        db.query(query, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json("Like removed Successfully!")
        })
    });
}

module.exports = {
    getlikes,
    addlike,
    deletelike,
};