import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { password, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const User = list({
  access: {
    operation: {
      query: allowAll,
      // update: permissions.canUpdateOwnUser,
      update: allowAll,
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
      validation: { isRequired: true },
    }),
    userEmail: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    userPassword: password({
      validation: {
        isRequired: true,
        length: { min: 5, max: 20 },
      },
    }),
    userPhone: text({
      validation: { isRequired: true },
    }),
    userAddress: text({}),
    role: relationship({
      ref: "Role.assignedTo",
      access: {
        update: permissions.canManageUser,
      },
    }),
  },
});

export default User;
