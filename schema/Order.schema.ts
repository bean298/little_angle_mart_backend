import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  integer,
  relationship,
  select,
  timestamp,
} from "@keystone-6/core/fields";
import { isSignedIn, permissions } from "../auth/access";

const Order = list({
  access: {
    operation: {
      query: allowAll,
      update: allowAll,
      delete: allowAll,
      create: allowAll,
      // ..allOperations(isSignedIn),
    },
  },

  // ui: {
  //   hideCreate: (args) => !permissions.canManageProducts(args),
  //   hideDelete: (args) => !permissions.canManageProducts(args),
  // },

  fields: {
    user: relationship({
      label: "Người mua",
      ref: "User",
    }),
    items: relationship({
      label: "Sản phẩm",
      ref: "CartItem",
      many: true,
    }),
    totalPrice: integer({
      label: "Giá",
    }),
    createdAt: timestamp({
      label: "Ngày đặt",
      defaultValue: { kind: "now" },
    }),
    status: select({
      label: "Trạng thái",
      defaultValue: "Order",
      options: [
        { label: "Xác nhận đơn hàng", value: "Confirm" },
        { label: "Huỷ đơn hàng", value: "Cancel" },
        { label: "Xác nhận đã thanh toán", value: "Paid" },
        { label: "Đặt hàng", value: "Order" },
      ],
    }),
  },
});

export default Order;
