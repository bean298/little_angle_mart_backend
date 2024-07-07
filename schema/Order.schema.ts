import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, select, timestamp } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Order = list({
  access: {
    operation: {
      query: allowAll,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      create: allowAll,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args),
  },

  fields: {
    totalPrice: integer({
      label: "Giá",
    }),
    createdAt: timestamp({
      label: "Ngày đặt",
      defaultValue: { kind: "now" },
    }),
    status: select({
      options: [
        { label: "Xác nhận đơn hàng", value: "published" },
        { label: "Huỷ đơn hàng", value: "draft" },
      ],
    }),
  },
});

export default Order;
