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
    hideCreate: (args) => {
      console.log({ args });
      console.log(args.session.data);

      return !permissions.canManageProducts(args);
    },
    // hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
  },

  fields: {
    productName: text({
      label: "Tên sản phẩm",
      validation: {
        isRequired: true,
        length: { min: 5, max: 50 },
      },
      hooks: {
        validateInput: async ({
          resolvedData,
          addValidationError,
          context,
          item,
        }) => {
          if (resolvedData.productName) {
            const existingProducts = await context.query.Product.findMany({
              where: { productName: { equals: resolvedData.productName } },
              query: "id",
            });

            if (
              existingProducts.length > 0 &&
              (!item ||
                existingProducts.some((product) => product.id !== item.id))
            ) {
              addValidationError("Tên sản phẩm đã tồn tại.");
            }
          }
        },
      },
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
      ref: "Category",
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
