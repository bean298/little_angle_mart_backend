import { mergeSchemas } from "@graphql-tools/schema";
import createOrder from "./createOrder.mutation";

const graphql = String.raw;

export const extendGraphqlSchema = (schema: any) => mergeSchemas({});
