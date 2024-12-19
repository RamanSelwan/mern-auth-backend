const {
  signupValidation,
  loginValidation,
} = require("../middleware/AuthValidator");
const { signup, login } = require("../controllers/AuthController");

const router = require("express").Router();

//sign up route

router.post("/signup", signupValidation, signup);
//login routes
router.post("/login", loginValidation, login);

module.exports = router;
