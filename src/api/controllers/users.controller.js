const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");


const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const createdUser = newUser.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      user: null,
    });
  } catch (error) {
    return next(error);
  }
};


const login = async (req, res, next) => {
  try {
    
    const userInfo = await User.findOne({ username: req.body.username });
    
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      
      userInfo.password = null;
      
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        user: userInfo,
        token: token,
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { login, register, logout };
