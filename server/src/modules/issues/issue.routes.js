import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { create, getAll, getFiltered, getMapData, getNearby } from "./issue.controller.js";
import {
	createIssueSchema,
	filterIssueQuerySchema,
	listIssueQuerySchema,
	nearbyIssueQuerySchema
} from "./issue.validation.js";

const router = Router();

router.post("/", verifyJWT, validate(createIssueSchema), create);
router.get("/", validate(listIssueQuerySchema), getAll);
router.get("/filter", validate(filterIssueQuerySchema), getFiltered);
router.get("/map", validate(filterIssueQuerySchema), getMapData);
router.get("/nearby", validate(nearbyIssueQuerySchema), getNearby);

export default router;
