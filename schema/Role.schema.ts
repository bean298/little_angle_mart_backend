import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";

const Role = list({
  access: {
    operation: allowAll,
    //   operation: {
    //     ...allOperations(permissions.canManageRoles),
    //     query: isSignedIn,
    //   },
  },
  // ui: {
  //   hideCreate: args => !permissions.canManageRoles(args),
  //   hideDelete: args => !permissions.canManageRoles(args),
  //   listView: {
  //     initialColumns: ['name', 'assignedTo'],
  //   },
  //   itemView: {
  //     defaultFieldMode: args => (permissions.canManageRoles(args) ? 'edit' : 'read'),
  //   },
  // },
  fields: {
    name: text({ validation: { isRequired: true } }),
    canManageProducts: checkbox({ defaultValue: false }),
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
