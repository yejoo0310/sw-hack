import UserService from "../services/user.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserService.login(username, password);

  res.status(200).json({ user });
};

export default { login };
