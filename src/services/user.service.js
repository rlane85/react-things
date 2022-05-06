import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const { getCurrentUser } = AuthService;
const API_URL = process.env.REACT_APP_AUTH_DOMAIN + "/api/";

const getPublicContent = () => {
	
};

const getUserContent = () => {
  return axios.get(API_URL + "test/user?user=" + getCurrentUser().email, {
    headers: authHeader(),
  });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "test/mod?user=" + getCurrentUser().email, {
    headers: authHeader(),
  });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin?user=" + getCurrentUser().email, {
    headers: authHeader(),
  });
};

const UserService = {
  getPublicContent,
  getUserContent,
  getModeratorBoard,
  getAdminBoard,
};

export default UserService;
