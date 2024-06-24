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
var import_core10 = require("@keystone-6/core");

// schema/Product.schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_config = require("dotenv/config");

// auth/access.ts
function isSignedIn({ session: session2 }) {
  return Boolean(session2);
}
var permissions = {
  canManageProducts: ({ session: session2 }) => session2?.data.role?.canManageProducts ?? false,
  canManageUser: ({ session: session2 }) => session2?.data.role?.canManageUser ?? false,
  canManagerPost: ({ session: session2 }) => session2?.data.role?.canManagerPost ?? false
};
var rules = {
  canReadPeople: ({ session: session2 }) => {
    if (!session2)
      return false;
    if (session2.data.role?.canManageUser)
      return true;
    return { id: { equals: session2.itemId } };
  }
};

// schema/Product.schema.ts
var cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  folder: `/${process.env.CLOUDINARY_FOLDER ?? "little_angle_mart"}`
};
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
    // hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    name: (0, import_fields.text)({
      label: "T\xEAn s\u1EA3n ph\u1EA9m",
      validation: {
        isRequired: true
      },
      hooks: {
        validateInput: async ({
          resolvedData,
          //Xử lý input data
          addValidationError,
          context,
          item
        }) => {
          if (resolvedData.name) {
            const existingProducts = await context.query.Product.findMany({
              where: { name: { equals: resolvedData.name } },
              query: "id"
            });
            if (existingProducts.length > 0) {
              addValidationError("T\xEAn s\u1EA3n ph\u1EA9m \u0111\xE3 t\u1ED3n t\u1EA1i.");
            }
          }
        }
      }
    }),
    productDescription: (0, import_fields.text)({
      label: "Mi\xEAu t\u1EA3 v\u1EC1 s\u1EA3n ph\u1EA9m"
    }),
    category: (0, import_fields.relationship)({
      label: "Nh\xF3m s\u1EA3n ph\u1EA9m",
      ref: "Category"
    }),
    productPrice: (0, import_fields.integer)({
      label: "Gi\xE1 s\u1EA3n ph\u1EA9m",
      validation: { isRequired: true }
    }),
    productImage: (0, import_cloudinary.cloudinaryImage)({
      label: "H\xECnh \u1EA3nh s\u1EA3n ph\u1EA9m",
      cloudinary
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
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      create: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    name: (0, import_fields2.text)({
      label: "Lo\u1EA1i s\u1EA3n ph\u1EA9m",
      validation: { isRequired: true }
    })
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
      // ...allOperations(isSignedIn),
      query: isSignedIn,
      create: import_access5.allowAll,
      update: import_access5.allowAll,
      delete: import_access5.allowAll
    },
    filter: {
      query: rules.canReadPeople
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
      validation: {
        isRequired: true,
        match: {
          regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          explanation: "Email kh\xF4ng h\u1EE3p l\u1EC7"
        }
      },
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
      validation: {
        isRequired: true,
        match: {
          regex: /^\d{10}$/,
          explanation: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i ph\u1EA3i c\xF3 10 s\u1ED1"
        }
      }
    }),
    userAddress: (0, import_fields3.text)({
      label: "\u0110\u1ECBa ch\u1EC9"
    }),
    role: (0, import_fields3.relationship)({
      label: "Quy\u1EC1n h\u1EA1n",
      ref: "Role.assignedTo",
      ui: {
        itemView: {
          fieldMode: (args) => permissions.canManageUser(args) ? "edit" : "read"
        }
      }
    }),
    posts: (0, import_fields3.relationship)({
      label: "B\xE0i \u0111\u0103ng",
      ref: "Post.author",
      many: true
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
      create: permissions.canManageUser,
      update: permissions.canManageUser,
      delete: permissions.canManageUser
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageUser(args),
    hideDelete: (args) => !permissions.canManageUser(args)
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
    canManagerPost: (0, import_fields4.checkbox)({
      label: "Qu\u1EA3n l\xFD b\xE0i \u0111\u0103ng",
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
var import_fields5 = require("@keystone-6/core/fields");
var Order = (0, import_core5.list)({
  access: {
    operation: {
      query: import_access9.allowAll,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      create: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    quantity: (0, import_fields5.integer)({
      label: "S\u1ED1 l\u01B0\u1EE3ng"
    }),
    createdAt: (0, import_fields5.timestamp)({
      label: "Ng\xE0y \u0111\u1EB7t",
      defaultValue: { kind: "now" }
    })
  }
});
var Order_schema_default = Order;

// schema/Cart.schema.ts
var import_core6 = require("@keystone-6/core");
var import_access11 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Cart = (0, import_core6.list)({
  access: {
    operation: {
      query: import_access11.allowAll,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts,
      create: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    ofUser: (0, import_fields6.relationship)({
      label: "\u0110\u01A1n h\xE0ng c\u1EE7a",
      ref: "User"
    }),
    createdAt: (0, import_fields6.timestamp)({
      label: "Ng\xE0y th\xEAm v\xE0o gi\u1ECF h\xE0ng",
      defaultValue: { kind: "now" }
    })
  }
});
var Cart_schema_default = Cart;

// schema/Invoice.schema.ts
var import_core7 = require("@keystone-6/core");
var import_access13 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var Invoice = (0, import_core7.list)({
  access: {
    operation: {
      query: import_access13.allowAll,
      create: permissions.canManageProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    price: (0, import_fields7.integer)({
      label: "Gi\xE1 c\u1EE7a ho\xE1 \u0111\u01A1n"
    }),
    creatDate: (0, import_fields7.timestamp)({
      label: "Ng\xE0y t\u1EA1o ho\xE1 \u0111\u01A1n"
    })
  }
});
var Invoice_schema_default = Invoice;

// schema/CartDetail.schema.ts
var import_core8 = require("@keystone-6/core");
var import_access15 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var CartDetail = (0, import_core8.list)({
  access: {
    operation: {
      query: import_access15.allowAll,
      create: permissions.canManageProducts,
      update: permissions.canManageProducts,
      delete: permissions.canManageProducts
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    hideDelete: (args) => !permissions.canManageProducts(args)
  },
  fields: {
    cartId: (0, import_fields8.relationship)({
      label: "Gi\u1ECF h\xE0ng",
      ref: "Cart"
    }),
    productId: (0, import_fields8.relationship)({
      label: "S\u1EA3n ph\u1EA9m",
      ref: "Product",
      many: true
    }),
    quantity: (0, import_fields8.integer)({
      label: "S\u1ED1 l\u01B0\u1EE3ng"
    }),
    price: (0, import_fields8.integer)({
      label: "Gi\xE1"
    })
  }
});
var CartDetail_schema_default = CartDetail;

// schema/Post.schema.ts
var import_core9 = require("@keystone-6/core");
var import_access17 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var import_cloudinary2 = require("@keystone-6/cloudinary");
var import_config2 = require("dotenv/config");
var import_fields_document = require("@keystone-6/fields-document");
var cloudinary2 = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  folder: `/${process.env.CLOUDINARY_FOLDER ?? "little_angle_mart"}`
};
var Post = (0, import_core9.list)({
  access: {
    operation: {
      query: import_access17.allowAll,
      update: permissions.canManagerPost,
      delete: permissions.canManagerPost,
      create: permissions.canManagerPost
    }
  },
  ui: {
    hideCreate: (args) => !permissions.canManagerPost(args),
    hideDelete: (args) => !permissions.canManagerPost(args)
  },
  fields: {
    title: (0, import_fields9.text)({
      label: "Ti\xEAu \u0111\u1EC1"
    }),
    content: (0, import_fields9.text)({
      label: "N\u1ED9i dung"
    }),
    link: (0, import_fields_document.document)({
      label: "\u0110\u01B0\u1EDDng d\u1EABn b\xE0i \u0111\u0103ng",
      links: true
    }),
    image: (0, import_cloudinary2.cloudinaryImage)({
      label: "H\xECnh \u1EA3nh",
      cloudinary: cloudinary2
    }),
    author: (0, import_fields9.relationship)({
      label: "Ng\u01B0\u1EDDi \u0111\u0103ng",
      ref: "User.posts"
    })
  }
});
var Post_schema_default = Post;

// schema/index.ts
var lists = {
  Product: Product_schema_default,
  User: User_schema_default,
  Category: Category_schema_default,
  Role: Role_schema_default,
  Order: Order_schema_default,
  Cart: Cart_schema_default,
  Invoice: Invoice_schema_default,
  CartDetail: CartDetail_schema_default,
  Post: Post_schema_default
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
      canManagerPost
    }
  `,
  secretField: "userPassword",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the db, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "userEmail", "userPassword", "userPhone"],
    itemData: {
      role: {
        create: {
          name: "Admin",
          canManageProducts: true,
          canManageUser: true,
          canManagerPost: true
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
  (0, import_core10.config)({
    server: {
      cors: {
        origin: "http://localhost:5173"
      }
    },
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
      // onConnect: async (session) => {
      //   console.log({ session });
      // },
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
