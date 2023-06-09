const router = require("express").Router();
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

router.post("/register/teacher", async (req, res, next) => {
  //register a teacher who is also admin
  try {
    const newTeacher = new Teacher({
      password: req.body.password, //hash the password if needed else just enter the password
      ...req.body,
    });

    await newTeacher.save();
    res.status(200).json("Teacher Created!");
  } catch (error) {
    next(error);
  }
});

router.post("/login/teacher", async (req, res, next) => {
  //login for teacher(admin)
  try {
    const user = await Teacher.findOne({ email: req.body.email });
    if (!user) return res.status(403).json("Wrong Email!");

    /* const isCorrect = await bcrypt.compare(req.body.password, user.password); */ //if password hashed

    /* if (!isCorrect) {
      return res.status(403).json("Wrong Password!");
    } */

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "24h",
    });
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ user: others, token: token });
  } catch (err) {
    next(err);
  }
});

router.post("/register/student", async (req, res, next) => {
  //register a teacher who is also admin
  try {
    const newStudent = new Student({
      password: req.body.password, //hash the password if needed else just enter the password
      ...req.body,
    });

    await newStudent.save();
    res.status(200).json("Student Created!");
  } catch (error) {
    next(error);
  }
});

router.post("/login/student", async (req, res, next) => {
  //login for teacher(admin)
  try {
    const user = await Student.findOne({ email: req.body.email });
    if (!user) return res.status(403).json("Wrong Email!");

    /* const isCorrect = await bcrypt.compare(req.body.password, user.password); */ //if password hashed

    /* if (!isCorrect) {
      return res.status(403).json("Wrong Password!");
    } */

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "24h",
    });
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ user: others, token: token });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res) => {
  req.logout();
});

module.exports = router;
