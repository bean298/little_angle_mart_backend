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
  {
    name: "Đồ dùng, Vật dụng",
  },
  {
    name: "Thời trang, Phụ kiện",
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
    userAddress: "Hồ Chí Minh",
  },
  {
    name: "staffB",
    userPassword: "123123",
    userEmail: "staffB@gmail.com",
    userPhone: "1234567890",
    userAddress: "Hà Nội",
  },
];

export const products = [
  {
    name: "Combo 3 Thùng Thực phẩm bổ sung Nestlé NANGROW 4(8x180ml)",
    category: "Sữa bột pha sẵn",
    productDescription:
      "Thương hiệu Nestlé NANGROW; Sản xuất tại Việt Nam, Không dùng cho trẻ dưới 12 tháng tuổi",
    productPrice: 970000,
  },
  {
    name: "Thùng sữa uống dinh dưỡng Vinamilk Yoko Gold 110ml (Lốc 4 hộp)",
    category: "Sữa bột pha sẵn",
    productDescription:
      "Thương hiệu: Vinamilk, Sản xuất tại Việt Nam, Bé từ 1 tuổi trở lên",
    productPrice: 408000,
  },
  {
    name: "Thùng Sữa tươi tiệt trùng Oldenburger ít đường 180ml (lốc 4 hộp)",
    category: "Sữa bột pha sẵn",
    productDescription:
      "Thương hiệu: OLDENBURGER, Sản xuất tại	Việt Nam, Từ 1 tuổi trở lên",
    productPrice: 288000,
  },
  {
    name: "Combo 2 Bánh Gặm Nướu Ngũ Cốc Grinny Vị Chuối",
    category: "Bột, Bánh ăn dặm",
    productDescription:
      "Thương hiệu: Grinny, Xuất xứ thương hiệu	Thái Lan, Dùng cho trẻ từ 09 tháng tuổi trở lên.",
    productPrice: 68000,
  },
];
