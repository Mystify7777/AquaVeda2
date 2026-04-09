import { error, success } from "../../utils/response.js";
import * as commentService from "./comment.service.js";

const validRefTypes = new Set(["ISSUE", "WIKI"]);

export const create = async (req, res) => {
  try {
    const { refType, refId, content, parentComment = null } = req.body;

    if (!refType || !refId) {
      return error(res, "refType and refId required", 400);
    }

    if (!validRefTypes.has(refType)) {
      return error(res, "Invalid refType", 400);
    }

    if (!content || !content.trim()) {
      return error(res, "content is required", 400);
    }

    const comment = await commentService.addComment(
      { refType, refId, content: content.trim(), parentComment },
      req.user.id
    );

    return success(res, comment, "Comment added", 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const list = async (req, res) => {
  try {
    const { refType, refId } = req.query;

    const comments = await commentService.getComments(refType, refId, req.query);
    return success(res, comments, "Comments fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};
