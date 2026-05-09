import axios from "axios";

const uploadImage = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append(
    "upload_preset",
    "alibaba_clone"
  );

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/djpts1ydc/image/upload",
    data
  );

  return res.data.secure_url;
};

export default uploadImage;