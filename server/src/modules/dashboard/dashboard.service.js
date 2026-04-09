import Comment from "../comments/comment.model.js";
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
    openIssues,
    inProgressIssues,
    resolvedIssues,
    totalWikiArticles,
    pendingWikiArticles,
    approvedWikiArticles,
    totalProjects,
    activeProjects,
    completedProjects,
    totalComments,
    usersByRole,
    recentIssues,
    recentProjects
  ] = await Promise.all([
    User.countDocuments(),
    Issue.countDocuments(),
    Issue.countDocuments({ status: "OPEN" }),
    Issue.countDocuments({ status: "IN_PROGRESS" }),
    Issue.countDocuments({ status: "RESOLVED" }),
    Wiki.countDocuments(),
    Wiki.countDocuments({ status: "PENDING" }),
    Wiki.countDocuments({ status: "APPROVED" }),
    Project.countDocuments(),
    Project.countDocuments({ status: "ACTIVE" }),
    Project.countDocuments({ status: "COMPLETED" }),
    Comment.countDocuments(),
    User.aggregate([
      {
        $group: {
          _id: "$role",
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
    stats: {
      users: {
        total: totalUsers,
        byRole: usersByRole.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      },
      issues: {
        total: totalIssues,
        open: openIssues,
        inProgress: inProgressIssues,
        resolved: resolvedIssues
      },
      wiki: {
        total: totalWikiArticles,
        pending: pendingWikiArticles,
        approved: approvedWikiArticles
      },
      projects: {
        total: totalProjects,
        active: activeProjects,
        completed: completedProjects
      },
      comments: {
        total: totalComments
      }
    },
    recent: {
      issues: recentIssues,
      projects: recentProjects
    }
  };
};
