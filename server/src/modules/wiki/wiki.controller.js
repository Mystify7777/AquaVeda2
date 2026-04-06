import { error, success } from "../../utils/response.js";
import * as wikiService from "./wiki.service.js";

export const create = async (req, res) => {
  try {
    const article = await wikiService.createArticle(req.body, req.user.id);
    return success(res, article, "Article created", 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getAll = async (req, res) => {
  try {
    const articles = await wikiService.getAllApproved();
    return success(res, articles, "Approved articles");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const approve = async (req, res) => {
  try {
    const article = await wikiService.approveArticle(req.params.id, req.user.id);

    if (!article) {
      return error(res, "Article not found", 404);
    }

    return success(res, article, "Article approved");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const reject = async (req, res) => {
  try {
    const article = await wikiService.rejectArticle(req.params.id);

    if (!article) {
      return error(res, "Article not found", 404);
    }

    return success(res, article, "Article rejected");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const update = async (req, res) => {
  try {
    const article = await wikiService.updateArticle(req.params.id, req.body, req.user.id);
    return success(res, article, "Article updated");
  } catch (err) {
    if (err.message === "Article not found") {
      return error(res, err.message, 404);
    }

    if (err.message === "Not authorized") {
      return error(res, err.message, 403);
    }

    if (err.message === "Approved articles cannot be edited") {
      return error(res, err.message, 400);
    }

    return error(res, err.message, 400);
  }
};

export const getMine = async (req, res) => {
  try {
    const articles = await wikiService.getUserArticles(req.user.id);
    return success(res, articles, "User articles");
  } catch (err) {
    return error(res, err.message, 400);
  }
};
