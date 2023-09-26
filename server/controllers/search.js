const db = require("../connect.js");
const jwt = require("jsonwebtoken");

const getFilters = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const searchUser = req.query.searchQuery;

        const query = `
            SELECT uid,username,profilepic FROM users WHERE username LIKE (?)
        `

        db.query(query, [`${searchUser}%`], (err, data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json(data);
        });
    });

}

module.exports = { getFilters };