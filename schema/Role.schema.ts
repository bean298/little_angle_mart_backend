import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Role = list({
  access: {
    operation: {
      query: allowAll,
      create: permissions.canManageUser,
      update: permissions.canManageUser,
      delete: permissions.canManageUser,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
    hideDelete: (args) => !permissions.canManageUser(args),
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
    canManagerPost: checkbox({
      label: "Quản lý bài đăng",
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
