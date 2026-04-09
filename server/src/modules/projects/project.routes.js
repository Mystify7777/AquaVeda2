import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { create, getAll, join, setProgress } from "./project.controller.js";
import {
	createProjectSchema,
	projectListQuerySchema,
	updateProgressSchema
} from "./project.validation.js";

const router = Router();

router.post("/", verifyJWT, validate(createProjectSchema), create);
router.get("/", validate(projectListQuerySchema), getAll);
router.post("/:id/join", verifyJWT, join);
router.patch("/:id/progress", verifyJWT, validate(updateProgressSchema), setProgress);

export default router;
