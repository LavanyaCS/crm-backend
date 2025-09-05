const User = require("../models/User");
const jwt = require("jsonwebtoken");

//Generate Token
// const generateToken = (id) => {
//     return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
// };
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role,username:user.username,email:user.email },  // include role
        process.env.JWT_SECRET_KEY,
{ expiresIn: process.env.JWT_EXPIRES || "24h" }    );
};

//Register API
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All field required to fill" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User is already registered with us" });
        }
        const user = await User.create({
            username, email, password, role
        });
        res.status(201).json({
            message: "User is registered successfully", userInfo: {
                _id: user._id,
                username: user.username,email:user.email,
                role: user.role,
                token: generateToken(user)
            }
        });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
//Login API
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user)
            })
        }
        else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//User Info
const getProfile = async (req, res) => {
    try {
        const user = await User.find().select("-password");
        if (user.length === 0) { return res.status(400).json({ message: "user not found" }); }
        res.status(200).json({ message: "User List", userList: user || [] })

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (user.length === 0) { return res.status(400).json({ message: "user not found" }); }
        res.status(200).json({ message: "User List", userList: user || [] })

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports = { registerUser, loginUser, getProfile,getProfileById }