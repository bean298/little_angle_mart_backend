import config from "../keystone";
import { categories, products, roles, users } from "./data";
import * as PrismaModule from "@prisma/client";
import { getContext } from "@keystone-6/core/context";

export default async function insertSeedData() {
  const context = getContext(config, PrismaModule);
  await config.db.onConnect?.(context);

  await context.sudo().db.Category.createMany({
    data: categories,
  });

  await context.sudo().db.User.createMany({
    data: users,
  });

  await context.sudo().db.Role.createMany({
    data: roles,
  });

  // Lấy tất cả các category
  const categoriesItems = await context.sudo().db.Category.findMany();

  // Tạo sản phẩm và kết nối chúng với chính xác từng category nếu có trùng tên
  for (const product of products) {
    const category = categoriesItems.find(
      (cate) => cate.name === product.category
    );
    if (category) {
      await context.sudo().db.Product.createOne({
        data: {
          ...product,
          category: { connect: { id: category.id } },
        },
      });
    }
  }
}

insertSeedData();
