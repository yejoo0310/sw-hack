import UserRepository from "../repository/user.js";

export const login = async (username, password) => {
  const user = await UserRepository.login(username, password);

  if (!user) {
    throw new Error("로그인 실패");
  }

  return user;
};
