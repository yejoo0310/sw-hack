import UserService from "../services/user.js";

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = UserService.login(username, password);

  res.status(200).json({ user });
};
