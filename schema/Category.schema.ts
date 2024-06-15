import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Category = list({
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
    name: text({
      label: "Loại sản phẩm",
      validation: { isRequired: true },
    }),
  },
});

export default Category;
