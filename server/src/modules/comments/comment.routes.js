import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { create, list } from "./comment.controller.js";
import { createCommentSchema, listCommentQuerySchema } from "./comment.validation.js";

const router = Router();

router.get("/", validate(listCommentQuerySchema), list);
router.post("/", verifyJWT, validate(createCommentSchema), create);

export default router;
