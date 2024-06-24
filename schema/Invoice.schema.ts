import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, timestamp } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Invoice = list({
  access: {
    operation: {
      query: allowAll,
      create: permissions.canManageProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
  },

  fields: {
    price: integer({
      label: "Giá của hoá đơn",
    }),
    creatDate: timestamp({
      label: "Ngày tạo hoá đơn",
    }),
    user: relationship({
      label: "Hoá đơn của",
      ref: "User",
    }),
  },
});

export default Invoice;
