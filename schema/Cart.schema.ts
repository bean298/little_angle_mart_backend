import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, timestamp } from "@keystone-6/core/fields";
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
    user: relationship({
      label: "Đơn hàng của",
      ref: "User",
    }),
    quantity: integer({
      label: "Số lượng",
    }),
    createdAt: timestamp({
      label: "Ngày thêm vào giỏ hàng",
      defaultValue: { kind: "now" },
    }),
    items: relationship({
      label: "Sản phẩm",
      ref: "CartItem",
      many: true,
    }),
  },
});

export default Cart;
