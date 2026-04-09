import Wiki from "./wiki.model.js";
import { buildPaginationMeta, getPagination } from "../../utils/pagination.js";

export const createArticle = async (data, userId) => {
  return Wiki.create({
    ...data,
    author: userId
  });
};

export const getAllApproved = async (query = {}) => {
  const { page, limit, skip } = getPagination(query);
  const findQuery = { status: "APPROVED" };

  const [items, total] = await Promise.all([
    Wiki.find(findQuery).populate("author", "name").sort({ createdAt: -1 }).skip(skip).limit(limit),
    Wiki.countDocuments(findQuery)
  ]);

  return {
    items,
    pagination: buildPaginationMeta(page, limit, total)
  };
};

export const approveArticle = async (id, expertId) => {
  return Wiki.findByIdAndUpdate(
    id,
    {
      status: "APPROVED",
      verifiedBy: expertId
    },
    { returnDocument: "after" }
  );
};

export const updateArticle = async (id, data, userId) => {
  const article = await Wiki.findById(id);

  if (!article) {
    throw new Error("Article not found");
  }

  if (article.author.toString() !== userId) {
    throw new Error("Not authorized");
  }

  if (article.status === "APPROVED") {
    throw new Error("Approved articles cannot be edited");
  }

  Object.assign(article, data);
  return article.save();
};

export const rejectArticle = async (id) => {
  return Wiki.findByIdAndUpdate(
    id,
    {
      status: "PENDING",
      verifiedBy: null
    },
    { returnDocument: "after" }
  );
};

export const getUserArticles = async (userId, query = {}) => {
  const { page, limit, skip } = getPagination(query);
  const findQuery = { author: userId };

  const [items, total] = await Promise.all([
    Wiki.find(findQuery).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Wiki.countDocuments(findQuery)
  ]);

  return {
    items,
    pagination: buildPaginationMeta(page, limit, total)
  };
};
