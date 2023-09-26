const db = require('../connect.js');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {

    const userId = req.query.userId;

    const query = `
        SELECT * FROM users WHERE uid = ?
    `

    db.query(query, [userId], (err, data) => {
        if (err) return res.status(409).json(err);
        const { password, ...info } = data[0];
        return res.status(200).json(info);
    });
}

const updateUser = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "UPDATE users set `username` = ?, `userbio` = ?, `profilepic` = ? WHERE `uid` = ?";

        const fetchQuery = "SELECT * FROM users WHERE `uid` = ?"

        const values = [
            req.body.username,
            req.body.userbio,
            req.body.profilepic,
            userInfo.id,
        ];

        console.log("Backend values : ",values);

        db.query(query, values, (err, data) => {
            if (err) res.status(409).json("Error in Updating!");

            if (data.affectedRows > 0) {

                db.query(fetchQuery, userInfo.id, (err, newData) => {
                    if (err) return res.status(409).json(err);

                    const { password, ...others } = newData[0];
                    console.log("Refetched Details : " + others);
                    return res.status(200).json(others);
                })
            }

            return res.status(409).status("User can only its details!");
        })
    })
}

module.exports = {
    getUsers,
    updateUser,
};