import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Role = list({
  access: {
    operation: {
      query: allowAll,
      create: permissions.canManageRole,
      update: permissions.canManageRole,
      delete: permissions.canManageRole,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageRole(args),
    hideDelete: (args) => !permissions.canManageRole(args),
  },

  fields: {
    name: text({
      label: "Quyền hạn",
      validation: { isRequired: true },
      hooks: {
        validateInput: async ({
          resolvedData,
          addValidationError,
          context,
        }) => {
          if (resolvedData.name) {
            const existingRole = await context.query.Role.findMany({
              where: { name: { equals: resolvedData.name } },
              query: "id",
            });

            if (existingRole.length > 0) {
              addValidationError("Tên quyền đã tồn tại!");
            }
          }
        },
      },
    }),
    canManageProducts: checkbox({
      label: "Quản lý sản phẩm",
      defaultValue: false,
    }),
    canManageUser: checkbox({
      label: "Quản lý người dùng",
      defaultValue: false,
    }),
    canManagePost: checkbox({
      label: "Quản lý bài đăng",
      defaultValue: false,
    }),
    canManageRole: checkbox({
      label: "Quản lý vai trò",
      defaultValue: false,
    }),
    assignedTo: relationship({
      label: "Người dùng",
      ref: "User.role",
      many: true,
      ui: {
        itemView: {
          fieldMode: (args) =>
            permissions.canManageRole(args) ? "edit" : "read",
        },
      },
    }),
  },
});

export default Role;
