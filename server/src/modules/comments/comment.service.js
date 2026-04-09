import Comment from "./comment.model.js";
import { buildPaginationMeta, getPagination } from "../../utils/pagination.js";

export const addComment = async (payload, userId) => {
  return Comment.create({
    ...payload,
    user: userId
  });
};

export const getComments = async (refType, refId, query = {}) => {
  const { page, limit, skip } = getPagination(query);
  const findQuery = { refType, refId };

  const [items, total] = await Promise.all([
    Comment.find(findQuery)
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Comment.countDocuments(findQuery)
  ]);

  return {
    items,
    pagination: buildPaginationMeta(page, limit, total)
  };
};
