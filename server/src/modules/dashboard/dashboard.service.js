import Issue from "../issues/issue.model.js";
import Project from "../projects/project.model.js";
import User from "../users/user.model.js";
import Wiki from "../wiki/wiki.model.js";

export const getUserDashboardStats = async (userId) => {
  const [
    issuesReported,
    resolvedIssues,
    wikiArticles,
    approvedWikiArticles,
    projectsCreated,
    projectsContributing,
    commentsPosted,
    user
  ] = await Promise.all([
    Issue.countDocuments({ reportedBy: userId }),
    Issue.countDocuments({ reportedBy: userId, status: "RESOLVED" }),
    Wiki.countDocuments({ author: userId }),
    Wiki.countDocuments({ author: userId, status: "APPROVED" }),
    Project.countDocuments({ createdBy: userId }),
    Project.countDocuments({ contributors: userId }),
    Comment.countDocuments({ user: userId }),
    User.findById(userId).select("name email role reputation verified")
  ]);

  return {
    profile: user,
    stats: {
      issuesReported,
      resolvedIssues,
      wikiArticles,
      approvedWikiArticles,
      projectsCreated,
      projectsContributing,
      commentsPosted
    }
  };
};

export const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    totalIssues,
    pendingWikiArticles,
    totalProjects,
    roleSplit,
    issueStatus,
    projectStatus,
    recentIssues,
    recentProjects
  ] = await Promise.all([
    User.countDocuments(),
    Issue.countDocuments(),
    Wiki.countDocuments({ status: "PENDING" }),
    Project.countDocuments(),
    User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]),
    Issue.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]),
    Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]),
    Issue.find().sort({ createdAt: -1 }).limit(5).select("title severity status createdAt").populate("reportedBy", "name"),
    Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status progress createdAt")
      .populate("createdBy", "name")
  ]);

  return {
    users: totalUsers,
    issues: totalIssues,
    projects: totalProjects,
    pendingArticles: pendingWikiArticles,
    roleSplit,
    issueStatus,
    projectStatus,
    recent: {
      issues: recentIssues,
      projects: recentProjects
    }
  };
};
