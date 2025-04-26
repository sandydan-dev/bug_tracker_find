const { cloudinary } = require("../config/cloudinary");

const uploadFileToCloudinary = async (
  filePath, // path to the file
  folderName = "bug-tracker" // folder name in cloudinary
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { // upload the file
      folder: folderName, /// folder name in cloudinary
    });
    return {
      url: result.secure_url, // url to the uploaded file
      publicId: result.public_id, // public id of the uploaded file
    };
  } catch (error) {
    throw new Error("Failed to upload file to Cloudinary");
  }
};

module.exports = { uploadFileToCloudinary };
