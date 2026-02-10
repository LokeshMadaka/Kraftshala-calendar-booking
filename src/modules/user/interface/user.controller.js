const userService = require("../service/user.service");


exports.createUser = async (req, res, next) => {
try {
const user = await userService.createUser(req.body);
res.status(201).json(user);
} catch (err) {
err.status = 400;
next(err);
}
};


exports.getUser = async (req, res, next) => {
try {
const user = await userService.getUserById(req.params.id);
if (!user) return res.status(404).json({ message: "User not found" });
res.json(user);
} catch (err) {
next(err);
}
};