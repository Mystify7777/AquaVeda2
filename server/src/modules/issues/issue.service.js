import Issue from "./issue.model.js";
import { buildPaginationMeta, getPagination } from "../../utils/pagination.js";

export const createIssue = async (data, userId) => {
  return Issue.create({
    ...data,
    reportedBy: userId
  });
};

export const getIssues = async (query = {}) => {
  const { page, limit, skip } = getPagination(query);

  const [items, total] = await Promise.all([
    Issue.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate("reportedBy", "name"),
    Issue.countDocuments()
  ]);

  return {
    items,
    pagination: buildPaginationMeta(page, limit, total)
  };
};

export const getNearbyIssues = async (lng, lat, query = {}) => {
  const { page, limit, skip } = getPagination(query);
  const maxDistance = 5000;
  const earthRadiusInMeters = 6378137;
  const geoQuery = {
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: maxDistance
      }
    }
  };
  const countQuery = {
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], maxDistance / earthRadiusInMeters]
      }
    }
  };

  const [items, total] = await Promise.all([
    Issue.find(geoQuery).skip(skip).limit(limit).populate("reportedBy", "name"),
    Issue.countDocuments(countQuery)
  ]);

  return {
    items,
    pagination: buildPaginationMeta(page, limit, total)
  };
};

export const getFilteredIssues = async (filters, paginationQuery = {}) => {
  const filterQuery = {};

  if (filters.severity) {
    filterQuery.severity = filters.severity;
  }

  if (filters.status) {
    filterQuery.status = filters.status;
  }

  if (filters.region) {
    filterQuery.region = filters.region;
  }

  const { page, limit, skip } = getPagination(paginationQuery);
  const [items, total] = await Promise.all([
    Issue.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("reportedBy", "name"),
    Issue.countDocuments(filterQuery)
  ]);

  return {
    items,
    pagination: buildPaginationMeta(page, limit, total)
  };
};
