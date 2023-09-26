const db = require("../connect.js");
const jwt = require("jsonwebtoken");

const getRelationships = (req, res) => {

    const query = `SELECT followerid FROM relationships where followedid = ?`;

    db.query(query, [req.query.followedid], (err, data) => {
        if (err) return res.status(409).json(err);
        return res.status(200).json(data.map(relationship => relationship.followerid));
    });
}

const addRelationship = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err,userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "INSERT INTO relationships (`followerid`,`followedid`) VALUES (?)";

        const values = [
            userInfo.id,
            req.query.followedid,
        ];

        db.query(query, [values], (err,data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json("Followed successfully!");
        });
    });
}

const deleteRelationship = (req, res) => {

    const token = req.cookies.accessToken;

    if (!token) return res.status(409).json("User Not Logged In!");

    jwt.verify(token, "secretKey", (err,userInfo) => {
        if (err) return res.status(409).json("Invalid Token!");

        const query = "DELETE FROM relationships WHERE `followerid` = ? AND `followedid` = ?";

        db.query(query, [userInfo.id,req.query.followedid],(err,data) => {
            if (err) return res.status(409).json(err);
            return res.status(200).json("Unfollowed successfully!");
        });
    });
}

module.exports = {
    getRelationships,
    addRelationship,
    deleteRelationship,
};