import { list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { integer, relationship, timestamp } from "@keystone-6/core/fields";
import { isSignedIn, permissions } from "../auth/access";

const Cart = list({
  access: {
    operation: {
      // ...allOperations(isSignedIn),
      // delete: permissions.canManageProducts,
      // create: permissions.canManageProducts,
      query: allowAll,
      update: allowAll,
      delete: allowAll,
      create: allowAll,
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
