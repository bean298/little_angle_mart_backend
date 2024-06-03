import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Category = list({
  access: {
    operation: {
      query: allowAll,
      update: permissions.canManageCategory,
      delete: permissions.canManageCategory,
      create: permissions.canManageCategory,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageCategory(args),
    hideDelete: (args) => !permissions.canManageCategory(args),
  },

  fields: {
    categoryName: text({
      label: "Loại sản phẩm",
      validation: { isRequired: true },
    }),
    productOfCategory: relationship({
      label: "Các sản phẩm có trong loại này",
      ref: "Product.productCategory",
      many: true,
    }),
  },
});

export default Category;
