import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, timestamp } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Order = list({
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
    quantity: integer({
      label: "Số lượng",
    }),
    createdAt: timestamp({
      label: "Ngày đặt",
      defaultValue: { kind: "now" },
    }),
  },
});

export default Order;
