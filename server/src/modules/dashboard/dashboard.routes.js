import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { getAdminDashboard, getUserDashboard } from "./dashboard.controller.js";

const router = Router();

router.get("/user", verifyJWT, getUserDashboard);
router.get("/admin", verifyJWT, allowRoles("ADMIN"), getAdminDashboard);

export default router;
