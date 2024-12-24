import UserModel from "../models/user.js";

// export const login = async (username, password) => {
//   const user = await UserModel.findOne({ username: username }).lean();

//   if (!user || user.password !== password) {
//     return null;
//   }

//   return { username: user.username };
// };

const login = async (username, password) => {
  const user = await UserModel.findOne(
    {
      username, // find 조건
      password,
    },
    { password: 0 } // project 조건
  ).lean();

  if (!user) {
    return null;
  }

  return {
    ...user,
    id: user._id,
  };
};

export default { login };
