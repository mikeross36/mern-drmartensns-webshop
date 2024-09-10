import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  findAllCategories,
  findCategoryById,
} from "../services/categoryService";

export async function createCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await createCategory(req.body);
    if (!category) {
      return res.status(400).json({
        message: "Bad request. Invalid data passed",
      });
    }
    return res.status(201).json({ status: "success", data: { category } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occured"));
  }
}

export async function getAllCategoriesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categories = await findAllCategories();
    if (!categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    return res
      .status(200)
      .json({ result: categories.length, data: { categories } });
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occured"));
  }
}

export async function getCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.categoryId || typeof req.params.categoryId !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid category id" });
    }
    const category = await findCategoryById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
    return next(new Error("An unknown error occurred"));
  }
}
