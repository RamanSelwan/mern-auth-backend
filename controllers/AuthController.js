const UserModal = require("../modals/user"); // Importing User model
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jwt for token generation

// **Signup Controller**
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Extracting user input from request body

    // 1. Check if user already exists in the database
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // 2. Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user instance with hashed password
    const newUser = new UserModal({ name, email, password: hashedPassword });
    await newUser.save(); // Save the new user to the database

    // 4. Send a success response
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    // 5. Handle any errors that occur during the process
    console.error("Error during signup:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// **Login Controller**
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extracting email and password from request body

    // 1. Check if user exists in the database
    const existingUser = await UserModal.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Email or password is incorrect",
        success: false,
      });
    }

    // 2. Compare the input password with the hashed password in the database
    const verifyPassword = await bcrypt.compare(password, existingUser.password);
    if (!verifyPassword) {
      return res.status(403).json({
        message: "Authentication Failed. Incorrect Password",
        success: false,
      });
    }

    // 3. Generate a JWT token for authenticated user
    const jwtToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id }, // Payload
      process.env.JWT_KEY, // Secret key for signing the token
      { expiresIn: "24h" } // Token expiration time
    );

    // 4. Send a success response with the JWT token
    return res.status(200).json({
      message: "User Login successful",
      success: true,
      email: existingUser.email,
      jwtToken,
    });
  } catch (error) {
    // 5. Handle any errors that occur during the login process
    console.error("Error during login:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup, // Exporting the signup controller
  login,  // Exporting the login controller
};
