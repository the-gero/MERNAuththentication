import Api from "../Api";

export const updateProfile = async (formData) => {
  const registerd = await Api().post("/user/profile", formData);
  return registerd;
};
export const getProfile = async () => {
  const fetchedProfile = await Api().get("/user/profile");
  return fetchedProfile;
};
