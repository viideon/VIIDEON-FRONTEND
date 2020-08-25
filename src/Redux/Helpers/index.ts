import AWS from "aws-sdk";
import { config } from "../../config/aws";

export async function deleteDataAws(imageUrl: string) {
  if (imageUrl) {
    try {
      const s3 = new AWS.S3(config);
      const index = imageUrl.indexOf(".com/");
      imageUrl = imageUrl.substring(index + 5);
      const options = {
        Bucket: config.bucketName,
        Key: imageUrl
      };
      s3.deleteObject(options, function (err, data) {
        console.log("Image deleted", err, data);
      });
    } catch (e) {
      console.log("Exceptionis ", e);
    }
  }
}
