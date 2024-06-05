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
var import_core6 = require("@keystone-6/core");

// schema/Product.schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields_document = require("@keystone-6/fields-document");
var import_fields = require("@keystone-6/core/fields");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_config = require("dotenv/config");

// auth/access.ts
var permissions = {
  canManageProducts: ({ session: session2 }) => session2?.data.role?.canManageProducts ?? false,
  canManageUser: ({ session: session2 }) => session2?.data.role?.canManageProducts ?? false,
  canManageCategory: ({ session: session2 }) => session2?.data.role?.canManageCategory ?? false
};

// schema/Product.schema.ts
var Product = (0, import_core.list)({
  access: {
    operation: {
      query: import_access.allowAll,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      create: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => {
      console.log({ args });
      console.log(args.session.data);
      return !permissions.canManageProducts(args);
    },
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    productName: (0, import_fields.text)({
      label: "T\xEAn s\u1EA3n ph\u1EA9m",
      validation: { isRequired: true }
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
      ref: "Category"
    }),
    productPrice: (0, import_fields.float)({
      label: "Gi\xE1 s\u1EA3n ph\u1EA9m",
      validation: { isRequired: true }
    }),
    productImage: (0, import_cloudinary.cloudinaryImage)({
      label: "H\xECnh \u1EA3nh s\u1EA3n ph\u1EA9m",
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
var import_access3 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Category = (0, import_core2.list)({
  access: {
    operation: {
      query: import_access3.allowAll,
      update: permissions.canManageCategory,
      delete: permissions.canManageCategory,
      create: permissions.canManageCategory
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageCategory(args),
    hideDelete: (args) => !permissions.canManageCategory(args)
  },
  fields: {
    name: (0, import_fields2.text)({
      label: "Lo\u1EA1i s\u1EA3n ph\u1EA9m",
      validation: { isRequired: true }
    })
    // productOfCategory: relationship({
    //   label: "Các sản phẩm có trong loại này",
    //   ref: "Product.productCategory",
    //   many: true,
    // }),
  }
});
var Category_schema_default = Category;

// schema/User.schema.ts
var import_core3 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var User = (0, import_core3.list)({
  access: {
    operation: {
      query: import_access5.allowAll,
      update: permissions.canManageUser,
      // update: allowAll,
      delete: permissions.canManageUser,
      create: permissions.canManageUser
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
    hideDelete: (args) => !permissions.canManageUser(args)
  },
  fields: {
    name: (0, import_fields3.text)({
      label: "T\xEAn",
      validation: { isRequired: true }
    }),
    userEmail: (0, import_fields3.text)({
      label: "Email",
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    userPassword: (0, import_fields3.password)({
      label: "M\u1EADt kh\u1EA9u",
      validation: {
        isRequired: true,
        length: { min: 5, max: 20 }
      }
    }),
    userPhone: (0, import_fields3.text)({
      label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
      validation: { isRequired: true }
    }),
    userAddress: (0, import_fields3.text)({
      label: "\u0110\u1ECBa ch\u1EC9"
    }),
    role: (0, import_fields3.relationship)({
      label: "Quy\u1EC1n h\u1EA1n",
      ref: "Role.assignedTo",
      ui: {
        itemView: { fieldMode: "read" }
      }
    })
  }
});
var User_schema_default = User;

// schema/Role.schema.ts
var import_core4 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var Role = (0, import_core4.list)({
  access: {
    operation: {
      query: import_access7.allowAll,
      update: permissions.canManageUser,
      delete: permissions.canManageUser,
      create: permissions.canManageUser
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUser(args)
  },
  fields: {
    name: (0, import_fields4.text)({
      label: "Quy\u1EC1n h\u1EA1n",
      validation: { isRequired: true }
    }),
    canManageProducts: (0, import_fields4.checkbox)({
      label: "Qu\u1EA3n l\xFD s\u1EA3n ph\u1EA9m",
      defaultValue: false
    }),
    canManageUser: (0, import_fields4.checkbox)({
      label: "Qu\u1EA3n l\xFD ng\u01B0\u1EDDi d\xF9ng",
      defaultValue: false
    }),
    canManageCategory: (0, import_fields4.checkbox)({
      label: "Qu\u1EA3n l\xFD lo\u1EA1i s\u1EA3n ph\u1EA9m",
      defaultValue: false
    }),
    assignedTo: (0, import_fields4.relationship)({
      label: "Ng\u01B0\u1EDDi d\xF9ng",
      ref: "User.role",
      many: true,
      ui: {
        itemView: { fieldMode: "read" }
      }
    })
  }
});
var Role_schema_default = Role;

// schema/Order.schema.ts
var import_core5 = require("@keystone-6/core");
var import_access9 = require("@keystone-6/core/access");
var Order = (0, import_core5.list)({
  access: {
    operation: {
      query: import_access9.allowAll,
      update: import_access9.allowAll,
      delete: import_access9.allowAll,
      create: import_access9.allowAll
    }
  },
  fields: {}
});
var Order_schema_default = Order;

// schema/index.ts
var lists = {
  Product: Product_schema_default,
  User: User_schema_default,
  Category: Category_schema_default,
  Role: Role_schema_default,
  Order: Order_schema_default
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
      canManageUser
      canManageCategory
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
          canManageProducts: true,
          canManageUser: true,
          canManageCategory: true
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
  (0, import_core6.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db",
      onConnect: async (session2) => {
        console.log({ session: session2 });
      }
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
