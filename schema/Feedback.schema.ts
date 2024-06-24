import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { permissions } from "../auth/access";
import { relationship, text } from "@keystone-6/core/fields";

const Feedback = list({
  access: {
    operation: {
      query: allowAll,
      create: allowAll,
      update: allowAll,
      delete: allowAll,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
  },

  fields: {
    user: relationship({
      label: "Đánh giá của",
      ref: "User",
    }),
    product: relationship({
      label: "Sản phẩm",
      ref: "Product",
    }),
    comment: text({
      label: "Đánh giá",
    }),
  },
});

export default Feedback;
