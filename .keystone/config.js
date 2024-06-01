"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core5 = require("@keystone-6/core");

// schema/Product.schema.ts
var import_core = require("@keystone-6/core");
var import_fields_document = require("@keystone-6/fields-document");
var import_fields = require("@keystone-6/core/fields");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_config = require("dotenv/config");

// auth/access.ts
var permissions = {
  canManageProducts: ({ session: session2 }) => session2?.data.role?.canManageProducts ?? false
};

// schema/Product.schema.ts
var Product = (0, import_core.list)({
  access: {
    operation: {
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      query: permissions.canManageProducts,
      create: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    productName: (0, import_fields.text)({
      label: "T\xEAn s\u1EA3n ph\u1EA9m"
    }),
    productDescription: (0, import_fields_document.document)({
      label: "Mi\xEAu t\u1EA3 v\u1EC1 s\u1EA3n ph\u1EA9m",
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [1, 1, 1, 1]
      ]
    }),
    productCategory: (0, import_fields.relationship)({
      label: "Nh\xF3m s\u1EA3n ph\u1EA9m",
      ref: "Category",
      many: true
    }),
    productPrice: (0, import_fields.integer)({
      label: "Gi\xE1 s\u1EA3n ph\u1EA9m",
      validation: { isRequired: true }
    }),
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        folder: `/${process.env.CLOUDINARY_FOLDER ?? "little_angle_mart"}`
      }
    })
  }
});
var Product_schema_default = Product;

// schema/Category.schema.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Category = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    categoryName: (0, import_fields2.text)({
      validation: { isRequired: true }
    })
  }
});
var Category_schema_default = Category;

// schema/User.schema.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var User = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)({
      validation: { isRequired: true }
    }),
    userEmail: (0, import_fields3.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    userPassword: (0, import_fields3.password)({
      validation: {
        isRequired: true,
        length: { min: 5, max: 20 }
      }
    }),
    userPhone: (0, import_fields3.text)({
      validation: { isRequired: true }
    }),
    userAddress: (0, import_fields3.text)({}),
    role: (0, import_fields3.relationship)({
      ref: "Role.assignedTo",
      access: {
        // create: permissions.canManagePeople,
        // update: permissions.canManagePeople,
      },
      ui: {
        itemView: {
          // fieldMode: args => (permissions.canManagePeople(args) ? 'edit' : 'read'),
        }
      }
    })
  }
});
var User_schema_default = User;

// schema/Role.schema.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var Role = (0, import_core4.list)({
  /*
      SPEC
      - [x] Block all public access
      - [x] Restrict edit access based on canManageRoles
      - [ ] Prevent users from deleting their own role
      - [ ] Add a pre-save hook that ensures some permissions are selected when others are:
          - [ ] when canEditOtherPeople is true, canSeeOtherPeople must be true
          - [ ] when canManagePeople is true, canEditOtherPeople and canSeeOtherPeople must be true
      - [ ] Extend the Admin UI with client-side validation based on the same set of rules
    */
  access: {
    operation: import_access4.allowAll
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
    name: (0, import_fields4.text)({ validation: { isRequired: true } }),
    /* Create Todos means:
         - create todos (can only assign them to others with canManageAllTodos) */
    //   canCreateTodos: checkbox({ defaultValue: false }),
    //   /* Manage All Todos means:
    //      - create new Todo items and assign them to someone else (with canCreateTodos)
    //      - update and delete Todo items not assigned to the current user */
    //   canManageAllTodos: checkbox({ defaultValue: false }),
    //   /* See Other Users means:
    //      - list all users in the database (users can always see themselves) */
    //   canSeeOtherPeople: checkbox({ defaultValue: false }),
    //   /* Edit Other Users means:
    //      - edit other users in the database (users can always edit their own item) */
    //   canEditOtherPeople: checkbox({ defaultValue: false }),
    //   /* Manage Users means:
    //      - change passwords (users can always change their own password)
    //      - assign roles to themselves and other users */
    //   canManagePeople: checkbox({ defaultValue: false }),
    //   /* Manage Roles means:
    //      - create, edit, and delete roles */
    canManageProducts: (0, import_fields4.checkbox)({ defaultValue: false }),
    //   /* Use AdminUI means:
    //      - can access the Admin UI next app */
    //   canUseAdminUI: checkbox({ defaultValue: false }),
    assignedTo: (0, import_fields4.relationship)({
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" }
      }
    })
  }
});
var Role_schema_default = Role;

// schema/index.ts
var lists = {
  Product: Product_schema_default,
  User: User_schema_default,
  Category: Category_schema_default,
  Role: Role_schema_default
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "userEmail",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: `
    name
    role {
      id
      name
      canManageProducts
    }
  `,
  secretField: "userPassword",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "userEmail", "userPassword", "userPhone"],
    itemData: {
      role: {
        create: {
          name: "Admin",
          canManageProducts: true
        }
      }
    }
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core5.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
