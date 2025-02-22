import axios from "axios";
import { get, post } from "./config";

// 注册接口
export const reqRegister = (user) => post("/auth/register", user);

// 登陆接口
export const reqLogin = ({ username, password }) => post("/auth/login", { username, password });

// 更新用户接口
export const reqUpdateUser = (user) => post("/update", user);

// 获取用户信息
export const reqUser = () => get("/user");

// 获取一页房屋列表
export const getBatchHouseList = (params) => get("/house", params);

// 根据id获取房屋info
export const getHouseInfo = (id) => get(`/house/${id}`);

// 根据id获取活动页的json描述
export const getJsonById = (id) => axios.get(`https://api.saicem.top/project/${id}`);

// 修改用户密码
export const changePasswordReq = (params) => {
    const token = localStorage.getItem("ROOM_JWT_TOKEN_KEY");
    return axios({
        method: "PUT",
        url: "https://api.saicem.top/user/password",
        data: params,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
};

// 刷新accessToken
export const refreshAccessToken = () => {
    const token = localStorage.getItem("ROOM_JWT_REFRESH_TOKEN_KEY");
    return axios({
        method: "GET",
        url: "https://api.saicem.top/auth/refresh",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
};
