import { session } from "../auth";

// Create the object Session: data sent back from database
export type Session = {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    role: {
      id: string;
      name: string;
      canManageProducts: boolean;
      canManageUser: boolean;
      canManageCategory: boolean;
      canUpdateOwnUser: boolean;
    };
  };
};

type AccessArgs = {
  // this section is nullable
  session?: Session;
};

// this function checks only that a session actually exists, nothing else
// Data sent back from database: Ex: if user exists return true else false
// If session in AccessArgs not null
export function isSignedIn({ session }: AccessArgs) {
  return Boolean(session);
}

/*
    Permissions are shorthand functions for checking that the current user's role has the specified
    permission boolean set to true
  */
//  The permission to manageProduct: if canManageProducts false - cant mange product
export const permissions = {
  canManageProducts: ({ session }: AccessArgs) =>
    session?.data.role?.canManageProducts ?? false,
  canManageUser: ({ session }: AccessArgs) =>
    session?.data.role?.canManageProducts ?? false,
  canManageCategory: ({ session }: AccessArgs) =>
    session?.data.role?.canManageCategory ?? false,
};

/*
    Rules are logical functions that can be used for list access, and may return a boolean (meaning
    all or no items are available) or a set of filters that limit the available items
  */
//
export const rules = {
  canManageProducts: ({ session }: AccessArgs) => {
    if (!session) return false;

    if (session.data.role?.canManageProducts) return true;
  },
  canManageUser: ({ session }: AccessArgs) => {
    if (!session) return false;

    if (session.data.role?.canManageUser) return true;
  },
  canManageCategory: ({ session }: AccessArgs) => {
    if (!session) return false;

    if (session.data.role?.canManageCategory) return true;
  },
  canUpdateOwnUser: ({ session }: AccessArgs) => {
    if (!session) return false;

    return { id: { equals: session.itemId } };
  },
};
