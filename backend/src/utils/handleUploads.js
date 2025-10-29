import cloudinary from "../config/cloudinary.js";

export async function uploadImage(buffer) {
  if (!cloudinary) throw new Error("Cloudinary not configured");
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "nirmaan-ui" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}
