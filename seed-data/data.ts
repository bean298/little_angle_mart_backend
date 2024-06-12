export const categories = [
  {
    name: "Sữa bột pha sẵn",
  },
  {
    name: "Bột, Bánh ăn dặm",
  },
  {
    name: "Bỉm, Tã",
  },
];

export const roles = [
  {
    name: "Staff",
    canManageProducts: false,
    canManageUser: false,
    assignedTo: {
      connect: [
        {
          userEmail: "staffA@gmail.com",
        },
        {
          userEmail: "staffB@gmail.com",
        },
      ],
    },
  },
];

export const users = [
  {
    name: "staffA",
    userPassword: "123123",
    userEmail: "staffA@gmail.com",
    userPhone: "1234567890",
  },
  {
    name: "staffB",
    userPassword: "123123",
    userEmail: "staffB@gmail.com",
    userPhone: "1234567890",
  },
];

export const products = [
  {
    name: "Combo 3 Thùng Thực phẩm bổ sung Nestlé NANGROW 4(8x180ml)",
    category: "Sữa bột pha sẵn",
    // productDescription: {
    //   document: [
    //     {
    //       type: "paragraph",
    //       children: [
    //         {
    //           text: "Thương hiệu: Nestlé NANGROW, Sản xuất tại: Việt Nam",
    //         },
    //       ],
    //     },
    //   ],
    // },
    productPrice: 970.0,
  },
  {
    name: "Combo 2 Bánh Gặm Nướu Ngũ Cốc Grinny Vị Chuối",
    category: "Bột, Bánh ăn dặm",
    productDescription: {
      document: [
        {
          type: "paragraph",
          children: [
            {
              text: "Thương hiệu: Grinny, Xuất xứ thương hiệu:	Thái Lan",
            },
          ],
        },
      ],
    },
    productPrice: 68.6,
  },
];
