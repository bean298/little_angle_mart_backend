import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const CartItem = list({
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
    cartId: relationship({
      label: "Giỏ hàng",
      ref: "Cart",
    }),
    productId: relationship({
      label: "Sản phẩm",
      ref: "Product",
      many: true,
    }),
    quantity: integer({
      label: "Số lượng",
    }),
    price: integer({
      label: "Giá",
    }),
  },
});

export default CartItem;
