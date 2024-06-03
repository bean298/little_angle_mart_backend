import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
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
      validation: { isRequired: true },
    }),
  },
});

export default Category;
