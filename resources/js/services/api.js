import { showError } from "../helpers/toast";

const API_BASE = "/api";

const request = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...options,
    };

    try {
        const res = await fetch(API_BASE + url, config);

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Something went wrong ❌");
        }

        return data;

    } catch (error) {
        showError(error.message);
        throw error;
    }
};

// Helper methods
export const get = (url) => request(url);

export const post = (url, body) =>
    request(url, {
        method: "POST",
        body: JSON.stringify(body),
    });

export const put = (url, body) =>
    request(url, {
        method: "PUT",
        body: JSON.stringify(body),
    });

export const del = (url) =>
    request(url, {
        method: "DELETE",
    });