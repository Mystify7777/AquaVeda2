import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { login, me, register } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyJWT, me);
router.get("/admin-test", verifyJWT, allowRoles("ADMIN"), (req, res) => {
	res.json({ success: true, message: "Admin access granted" });
});

export default router;
