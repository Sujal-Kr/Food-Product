import { userModel } from "../models/user.model.js";

const getProfile = async (req, res) => {

  const user = await userModel.findById(req.session._id).lean();
  user.session = req.session;
  return res.status(200).json({
    success: true,
    message: "User profile retrieved",
    user: user,
  });

};
export { getProfile };
