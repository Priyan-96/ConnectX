const db = require('../connect.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getActivities = (req, res) => {

    const query = "SELECT a.aname, u.username, u.profilepic FROM activities AS a LEFT JOIN users AS u ON (a.auserid = u.uid) ORDER BY a.acreateat DESC";

    db.query(query, (err,data) => {
        if (err) return res.status(409).json(err);

        return res.status(200).json(data);
    })
}

const addActivity = (req, res) => {

    const aname = req.body.aname;

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "INSERT INTO activities (`aname`, `auserid`, `acreateat`) VALUES (?, ?, ?)";

        const values = [
            aname,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        ]

        console.log("Values : ", values);

        db.query(query, values, (err, data) => {
            if (err) return res.status(409).json(err);
            console.log("Check Activity Table!");

            return res.status(200).json("Activity updated!");
        })
    })

}

const deleteActivity = (req, res) => {

    console.log("Body : ", req.query)
    const aname = req.query.aname;

    const token = req.cookies.accessToken;
    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        console.log("Deleting Query!");
        const query = "DELETE FROM activities WHERE `aname` = (?) AND auserid = (?)";

        const values = [
            aname,
            userInfo.id,
        ]

        console.log("Values : ", values);

        db.query(query, values, (err, data) => {
            if (err) return res.status(409).json(err);
            console.log("Check Activity Table!");

            return res.status(200).json("Activity updated!");
        })
    })
}

module.exports = {
    getActivities,
    addActivity,
    deleteActivity,
}