import axiosInstance from "./axiosInstance";

const AuthServices = {
  login: (values) => {
    return axiosInstance.post("/users/login", values);
  },
  register: (values) =>{
    return axiosInstance.post("users",values)
  },
  fetchUserInfor: () => {
    return axiosInstance.get("/users/userpull");
  },
  // fetchUserProfile: () => {
  //   return axiosInstance.get("/users/profile");
  // }
  updateUserProfile: (values) => {
    return axiosInstance.put("/users/profile", values)
  },
  deleteUser: () => {
    return axiosInstance.delete("/users/delete")
  }
};

export default AuthServices;
