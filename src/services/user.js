import UserRepository from "../repository/user.js";

const login = async (username, password) => {
  const user = await UserRepository.login(username, password);

  if (!user) {
    throw new Error("로그인 실패");
  }

  return user;
};

export default { login };
