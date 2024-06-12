const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getPresignedUploadURL = async (fileName, fileType) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
  };

  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return url;
};
