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
      update: permissions.canManagePost,
      delete: permissions.canManagePost,
      create: permissions.canManagePost,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManagePost(args),
    hideDelete: (args) => !permissions.canManagePost(args),
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
      hooks: {
        resolveInput: ({ operation, resolvedData, context }) => {
          if (operation == "create") {
            const userId = context.session.itemId;
            return { connect: { id: userId } };
          }

          return resolvedData.author;
        },
      },
      ui: {
        itemView: {
          fieldMode: (argrs) =>
            permissions.canManagePost(argrs) ? "edit" : "read",
        },
        createView: { fieldMode: "hidden" }, //Hiden this field when create
      },
    }),
  },
});

export default Post;
