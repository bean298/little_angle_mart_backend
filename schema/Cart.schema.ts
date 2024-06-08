import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, relationship, timestamp } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Cart = list({
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
    ofUser: relationship({
      label: "Đơn hàng của",
      ref: "User",
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});

export default Cart;
