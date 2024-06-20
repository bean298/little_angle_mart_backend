// Một object Session: data là bộ data được database trả về
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
      canManagerPost: boolean;
    };
  };
};

// Một object nếu có thì phải có kiểu là session
// Một object chứa thuộc tính session kiểu Session
type AccessArgs = {
  session?: Session;
};

// Hàm nhận một AccessArgs là một object bự, và có một key session được định nghĩa trong đó
// Nếu session trong AccessArgs true nghĩa là người dùng đã đăng nhập rồi hàm return về true
export function isSignedIn({ session }: AccessArgs) {
  // console.log({ session });

  return Boolean(session);
}

/*
    Permissions are shorthand functions for checking that the current user's role has the specified
    permission boolean set to true
  */
// permisssion kiểm tra các quyền cụ thể CRUD
// Một object permissions chứ các function
// các function được truyền vào 1 tham số trong đó có key là session
export const permissions = {
  canManageProducts: ({ session }: AccessArgs) =>
    session?.data.role?.canManageProducts ?? false,
  canManageUser: ({ session }: AccessArgs) =>
    session?.data.role?.canManageUser ?? false,
  canManagerPost: ({ session }: AccessArgs) =>
    session?.data.role?.canManagerPost ?? false,
};

/*
    Rules are logical functions that can be used for list access, and may return a boolean (meaning
    all or no items are available) or a set of filters that limit the available items
  */
// Kiểm tra vai trò của user có được truy cập hay ko
export const rules = {
  canReadPeople: ({ session }: AccessArgs) => {
    if (!session) return false;

    // Kiểm tra có chỉnh sửa đc user hay kh dựa trên canManageUser
    if (session.data.role?.canManageUser) return true;

    // Nếu kh có trong 2 trường hợp trên, chỉnh về mặc định xem được chính mình
    return { id: { equals: session.itemId } };
  },
};
