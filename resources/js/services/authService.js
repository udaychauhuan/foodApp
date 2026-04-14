import { post } from "./api";

// Register
export const registerUser = (data) => {
    return post("/register", data);
};

// Login
export const loginUser = (data) => {
    return post("/login", data);
};