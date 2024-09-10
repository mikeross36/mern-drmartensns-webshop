import { CategoryModel } from "../models";
import { CreateCategoryInput } from "../schemas/categorySchema";
import { logger } from "../utils/logger";

export function createCategory(input: CreateCategoryInput) {
  try {
    return CategoryModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error while creating category: ${err.message}`);
      throw new Error("Failed to create category");
    }
    throw err;
  }
}

export function findAllCategories() {
  try {
    return CategoryModel.find();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error while finding all categories: ${err.message}`);
      throw new Error("Failed to find all categories");
    }
    throw err;
  }
}

export function findCategoryById(id: string) {
  try {
    return CategoryModel.findById(id);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error while finding category by id: ${err.message}`);
      throw new Error("Failed to find category by id");
    }
    throw err;
  }
}
