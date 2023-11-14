const db = require("../connect.js");
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    try {
      const hashedPassword = await argon2.hash(password);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  };

const signup = (req, res) => {
    try {
        const { username, password } = req.body;
        const selectQuery = "SELECT * from users WHERE username = ?";
        db.query(selectQuery, [username], async (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (data.length) return res.status(490).json("User already exists!");

            const hashedPassword = await hashPassword(password);

            const query = "INSERT INTO users (`username`,`password`) VALUES (?,?)";
            db.query(query, [username, hashedPassword], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(222).json("User created successfully!");
            });
        });
    } catch (error) {
        alert(error);
    }

}

const login = (req, res) => {
    try {
        const { username, password } = req.body;
        const loggedPassword = password;
        const query = "SELECT * FROM users WHERE username = ?";
        db.query(query, [username], async (err, data) => {
            if (err) return res.status(500).json(err);
            if (!data.length) return res.status(490).json("Invalid Credentials!");
            const userPassword = data[0].password;
            const isValidPassword = await argon2.verify(userPassword, loggedPassword);
            if (!isValidPassword) {
                return res.status(490).json("Invalid Password!");
            }
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);

            //JWT Token
            const token = jwt.sign({ id: data[0].uid }, "secretKey");
            const { password, ...others } = data[0];
            res.cookie("accessToken", token, {
                expires: expirationDate,
                httpOnly: true,

            })
            res.status(200).json(others);
        });

    } catch (error) {
        alert(error);
    }
}

const logout = (req, res) => { 
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    });
    return res.status(200).json("User has logged out!");
}

module.exports = { signup, login, logout };