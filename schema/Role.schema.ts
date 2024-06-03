import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Role = list({
  access: {
    operation: {
      query: permissions.canManageUser,
      update: permissions.canManageUser,
      delete: permissions.canManageUser,
      create: permissions.canManageUser,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    canManageProducts: checkbox({ defaultValue: false }),
    canManageUser: checkbox({ defaultValue: false }),
    canManageCategory: checkbox({ defaultValue: false }),
    assignedTo: relationship({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});

export default Role;
