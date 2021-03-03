import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://usemytechstuff-tt26.herokuapp.com",
        headers: {
            Authorization: token
        }
    })
}