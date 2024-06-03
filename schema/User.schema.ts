import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { password, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const User = list({
  access: {
    operation: {
      query: allowAll,
      update: permissions.canManageUser,
      // update: allowAll,
      delete: permissions.canManageUser,
      create: permissions.canManageUser,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
    hideDelete: (args) => !permissions.canManageUser(args),
  },

  fields: {
    name: text({
      label: "Tên",
      validation: { isRequired: true },
    }),
    userEmail: text({
      label: "Email",
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    userPassword: password({
      label: "Mật khẩu",
      validation: {
        isRequired: true,
        length: { min: 5, max: 20 },
      },
    }),
    userPhone: text({
      label: "Số điện thoại",
      validation: { isRequired: true },
    }),
    userAddress: text({
      label: "Địa chỉ",
    }),
    role: relationship({
      label: "Quyền hạn",
      ref: "Role.assignedTo",
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});

export default User;
