import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import { password, relationship, text } from "@keystone-6/core/fields";
import { permissions, rules, isSignedIn } from "../auth/access";

const User = list({
  access: {
    operation: {
      ...allOperations(isSignedIn),
      query: allowAll,
      create: allowAll,
    },
    filter: {
      query: rules.canReadPeople,
    },
  },

  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
    hideDelete: (args) => !permissions.canManageUser(args),
  },

  fields: {
    name: text({
      label: "Tên",
      validation: {
        isRequired: true,
      },
    }),
    userEmail: text({
      label: "Email",
      validation: {
        isRequired: true,
        match: {
          regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          explanation: "Email không hợp lệ",
        },
      },
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
      validation: {
        isRequired: true,
        match: {
          regex: /^\d{10}$/,
          explanation: "Số điện thoại phải có 10 số",
        },
      },
    }),
    userAddress: text({
      label: "Địa chỉ",
    }),
    role: relationship({
      label: "Quyền hạn",
      ref: "Role.assignedTo",
      ui: {
        itemView: {
          fieldMode: (args) =>
            permissions.canManageUser(args) ? "edit" : "read",
        },
      },
    }),
    cart: relationship({
      label: "Giỏ hàng",
      many: true,
      ref: "Cart.user",
    }),
    posts: relationship({
      label: "Bài đăng",
      ref: "Post.author",
      many: true,
      ui: {
        itemView: {
          fieldMode: (args) =>
            permissions.canManageUser(args) ? "edit" : "read",
        },
      },
    }),
  },
});

export default User;
