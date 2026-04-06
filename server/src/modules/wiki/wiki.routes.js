import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { allowRoles } from "../../middlewares/role.middleware.js";
import { approve, create, getAll, getMine, reject, update } from "./wiki.controller.js";

const router = Router();

router.post("/", verifyJWT, create);
router.get("/", getAll);
router.get("/mine", verifyJWT, getMine);
router.patch("/:id", verifyJWT, update);
router.post("/:id/approve", verifyJWT, allowRoles("EXPERT", "ADMIN"), approve);
router.post("/:id/reject", verifyJWT, allowRoles("EXPERT", "ADMIN"), reject);

export default router;
