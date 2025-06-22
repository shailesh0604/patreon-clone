export async function uploadImageBuffer(file, folder = "users") {
  if (typeof file.arrayBuffer !== "function") {
    throw new Error("Invalid file object: does not support arrayBuffer()");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
}
