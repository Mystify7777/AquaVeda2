import { error, success } from "../../utils/response.js";
import { getAdminDashboardStats, getUserDashboardStats } from "./dashboard.service.js";

export const getUserDashboard = async (req, res) => {
  try {
    const data = await getUserDashboardStats(req.user.id);
    return success(res, data, "User dashboard fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const data = await getAdminDashboardStats();
    return success(res, data, "Admin dashboard fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};
