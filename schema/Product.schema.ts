import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { document } from "@keystone-6/fields-document";
import { text, relationship, integer, float } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import "dotenv/config";
import { permissions } from "../auth/access";

const Product = list({
  access: {
    operation: {
      query: allowAll,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      create: permissions.canManageProducts,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
  },

  fields: {
    productName: text({
      label: "Tên sản phẩm",
    }),
    productDescription: document({
      label: "Miêu tả về sản phẩm",
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [1, 1, 1, 1],
      ],
    }),
    productCategory: relationship({
      label: "Nhóm sản phẩm",
      ref: "Category.productOfCategory",
    }),
    productPrice: float({
      label: "Giá sản phẩm",
      validation: { isRequired: true },
    }),
    productImage: cloudinaryImage({
      label: "Hình ảnh sản phẩm",
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        folder: `/${process.env.CLOUDINARY_FOLDER ?? "little_angle_mart"}`,
      },
    }),
  },
});

export default Product;
