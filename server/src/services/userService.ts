import { UserModel } from "../models";
import { User } from "../models/userModel";
import { logger } from "../utils/logger";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { RegisterUserInput } from "../schemas/authSchema";

export function createUser(input: RegisterUserInput) {
  try {
    return UserModel.create(input);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error creating user: ${err.message}`);
      throw new Error("Failed to create user");
    }
    throw err;
  }
}

export function findUser(query: FilterQuery<User>, options: QueryOptions = {}) {
  try {
    return UserModel.findOne(query, {}, options).select("+password");
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user: ${err.message}`);
      throw new Error("Failed to find user");
    }
    throw err;
  }
}

export function findAllUsers() {
  try {
    return UserModel.find();
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding all users: ${err.message}`);
      throw new Error("Failed to find all users");
    }
    throw err;
  }
}

export function findUserById(id: string) {
  try {
    return UserModel.findById(id).select("+password");
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user by id: ${err.message}`);
      throw new Error("Failed to find user by id");
    }
    throw err;
  }
}

export function findByQueryAndUpdate(
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options: QueryOptions
) {
  try {
    return UserModel.findOneAndUpdate(query, update, options);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user to update`);
      throw new Error("Failed to find user to udpate");
    }
    throw err;
  }
}

export function findUserAndUpdate(id: string, input: Partial<User>) {
  try {
    return UserModel.findByIdAndUpdate(id, input, { new: true });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user to update`);
      throw new Error("Failed to update user");
    }
    throw err;
  }
}

export function findUserAndDelete(id: string) {
  try {
    return UserModel.findByIdAndDelete(id);
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error finding user and delete`);
      throw new Error("Failed to delete user");
    }
    throw err;
  }
}
