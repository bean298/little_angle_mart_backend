import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Order = list({
  access: {
    operation: {
      query: allowAll,
      update: allowAll,
      delete: allowAll,
      create: allowAll,
    },
  },

  fields: {},
});

export default Order;
