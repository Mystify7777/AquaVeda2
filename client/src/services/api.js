const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fetchJson = async (url, options = {}) => {
	const response = await fetch(url, options);
	const payload = await response.json();

	if (!response.ok) {
		throw new Error(payload.message || "API request failed");
	}

	return payload;
};

export const getIssueMapData = async (filters = {}) => {
	const query = new URLSearchParams();

	if (filters.severity) {
		query.set("severity", filters.severity);
	}

	if (filters.status) {
		query.set("status", filters.status);
	}

	const endpoint = query.toString()
		? `${API_URL}/v1/issues/map?${query.toString()}`
		: `${API_URL}/v1/issues/map`;

	return fetchJson(endpoint);
};

export const getIssueRecommendations = async (issueId) => {
	return fetchJson(`${API_URL}/v1/ai/recommend/${issueId}`);
};

export const getComments = async (refType, refId) => {
	const query = new URLSearchParams({ refType, refId });
	return fetchJson(`${API_URL}/v1/comments?${query.toString()}`);
};

export const createComment = async (payload, token) => {
	if (!token) {
		throw new Error("Login required to comment");
	}

	return fetchJson(`${API_URL}/v1/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(payload)
	});
};

export const getUserDashboard = async (token) => {
	if (!token) {
		throw new Error("Login required to view dashboard");
	}

	return fetchJson(`${API_URL}/v1/dashboard/user`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const getAdminDashboard = async (token) => {
	if (!token) {
		throw new Error("Admin token required to view admin dashboard");
	}

	return fetchJson(`${API_URL}/v1/dashboard/admin`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export default API_URL;