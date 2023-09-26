const db = require("../connect.js");
const jwt = require("jsonwebtoken");

const getSuggestions = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const userId = userInfo.id;

        const query = `SELECT DISTINCT u.uid, u.username, u.profilepic FROM users AS u WHERE u.uid NOT IN (
          SELECT followedid
          FROM relationships
          WHERE followerid = (?)
        ) AND u.uid != (?)`

        db.query(query, [userId, userInfo.id], (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json(data);
        })

    })
}

module.exports = { getSuggestions };