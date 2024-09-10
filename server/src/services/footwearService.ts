import { FootwearModel } from "../models";
import { logger } from "../utils/logger";
import { CreateFootwearInput } from "../schemas/footwearSchema";

export function createFootwear(input: CreateFootwearInput) {
  try {
    return FootwearModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating footwear: ${err.message}`);
      throw new Error("Failed to create new footwear");
    }
    throw err;
  }
}

export function findAllFootwear() {
  try {
    return FootwearModel.find();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding all footwear: ${err.message}`);
      throw new Error("Failed to find all footwear");
    }
    throw err;
  }
}

export function findFootwearById(id: string) {
  try {
    return FootwearModel.findById(id).populate([
      {
        path: "reviews",
        strictPopulate: false,
      },
    ]);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding footwear by id: ${err.message}`);
      throw new Error("Failed to find footwear by id");
    }
    throw err;
  }
}

export function findFootwearAndUpdate(id: string, input: CreateFootwearInput) {
  try {
    return FootwearModel.findByIdAndUpdate(id, input, { new: true });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding and updating footwear: ${err.message}`);
      throw new Error("Failed to find and update footwear");
    }
    throw err;
  }
}
