import { error, success } from "../../utils/response.js";
import * as projectService from "./project.service.js";

export const create = async (req, res) => {
  try {
    const { title, description, relatedIssue } = req.body;

    if (!title || !description || !relatedIssue) {
      return error(res, "title, description, and relatedIssue are required", 400);
    }

    const project = await projectService.createProject(req.body, req.user.id);
    return success(res, project, "Project created", 201);
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const join = async (req, res) => {
  try {
    const project = await projectService.joinProject(req.params.id, req.user.id);

    if (!project) {
      return error(res, "Project not found", 404);
    }

    return success(res, project, "Joined project");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const getAll = async (req, res) => {
  try {
    const projects = await projectService.getProjects(req.query);
    return success(res, projects, "Projects fetched");
  } catch (err) {
    return error(res, err.message, 400);
  }
};

export const setProgress = async (req, res) => {
  try {
    const progress = req.body.progress;

    const project = await projectService.updateProgress(req.params.id, progress, req.user.id);
    return success(res, project, "Project progress updated");
  } catch (err) {
    if (err.message === "Project not found") {
      return error(res, err.message, 404);
    }

    if (err.message === "Not authorized") {
      return error(res, err.message, 403);
    }

    return error(res, err.message, 400);
  }
};
