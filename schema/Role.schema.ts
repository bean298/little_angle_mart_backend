import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Role = list({
  access: {
    operation: {
      query: allowAll,
      update: permissions.canManageUser,
      delete: permissions.canManageUser,
      create: permissions.canManageUser,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
  },

  fields: {
    name: text({
      label: "Quyền hạn",
      validation: { isRequired: true },
    }),
    canManageProducts: checkbox({
      label: "Quản lý sản phẩm",
      defaultValue: false,
    }),
    canManageUser: checkbox({
      label: "Quản lý người dùng",
      defaultValue: false,
    }),
    canManageCategory: checkbox({
      label: "Quản lý loại sản phẩm",
      defaultValue: false,
    }),
    assignedTo: relationship({
      label: "Người dùng",
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});

export default Role;
