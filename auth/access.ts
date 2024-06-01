export type Session = {
  itemId: string;
  listKey: string;
  data: {
    name: string;
    role: {
      id: string;
      name: string;
      canManageProducts: boolean;
    };
  };
};

type AccessArgs = {
  // this section is nullable
  session?: Session;
};

// this function checks only that a session actually exists, nothing else
export function isSignedIn({ session }: AccessArgs) {
  return Boolean(session);
}

/*
    Permissions are shorthand functions for checking that the current user's role has the specified
    permission boolean set to true
  */
export const permissions = {
  canManageProducts: ({ session }: AccessArgs) =>
    session?.data.role?.canManageProducts ?? false,
};

/*
    Rules are logical functions that can be used for list access, and may return a boolean (meaning
    all or no items are available) or a set of filters that limit the available items
  */
export const rules = {
  canManageProducts: ({ session }: AccessArgs) => {
    if (!session) return false;

    if (session.data.role?.canManageProducts) return true;
  },
};
