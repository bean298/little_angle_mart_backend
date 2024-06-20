import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { permissions } from "../auth/access";
import "dotenv/config";
import { document } from "@keystone-6/fields-document";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  folder: `/${process.env.CLOUDINARY_FOLDER ?? "little_angle_mart"}`,
};

const Post = list({
  access: {
    operation: {
      query: allowAll,
      update: permissions.canManagerPost,
      delete: permissions.canManagerPost,
      create: permissions.canManagerPost,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManagerPost(args),
    hideDelete: (args) => !permissions.canManagerPost(args),
  },

  fields: {
    title: text({
      label: "Tiêu đề",
    }),
    content: text({
      label: "Nội dung",
    }),
    link: document({
      label: "Đường dẫn bài đăng",
      links: true,
    }),
    image: cloudinaryImage({
      label: "Hình ảnh",
      cloudinary,
    }),
    author: relationship({
      label: "Người đăng",
      ref: "User.posts",
    }),
  },
});

export default Post;
