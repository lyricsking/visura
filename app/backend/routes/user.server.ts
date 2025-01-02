import { ActionFunctionArgs, data, LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import User from "../models/user.model";
import { paginate } from "~/core/utils/http";
import { logger } from "~/core/utils/logger";

const createUserSchema = z.object({});

const updateUserSchema = createUserSchema.partial(); // Partial schema for updates

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const fields = url.searchParams.get("fields");

  const projection = fields
    ? fields.split(",").reduce((acc, field) => ({ ...acc, [field]: 1 }), {})
    : null;

  try {
    if (id) {
      const user = await User.findById(id);
      if (!user) return data({ error: "User not found" }, { status: 404 });
      return data(user);
    } else {
      const result = await paginate(User, {}, projection, page, limit);
      return data(result);
    }
  } catch (error) {
    logger(error);
    return data({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const method = request.method.toUpperCase();
    switch (method) {
      case "POST": {
        const requestData = await request.json();
        const parsedData = createUserSchema.safeParse(requestData);
        if (!parsedData.success) {
          return data({ error: parsedData.error.format() }, { status: 400 });
        }

        const newUser = new User(parsedData.data);
        await newUser.save();

        return data(newUser, { status: 201 });
      }
      case "PUT": {
        if (!id)
          return data({ error: "ID is requuired for update" }, { status: 400 });
        const requestData = await request.json();

        const parsedData = updateUserSchema.safeParse(requestData);
        if (!parsedData.success) {
          return data({ error: parsedData.error.format() }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(id, parsedData.data, {
          new: true,
        });
        if (!updatedUser)
          return data({ error: "User not found" }, { status: 404 });
        return data({ updatedUser });
      }
      case "DELETE": {
        if (!id)
          return data(
            { error: "ID is required for deletion" },
            { status: 400 }
          );
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
          return data({ error: "User not found" }, { status: 404 });
        return data({ message: "User deleted successfully" });
      }
      default:
        return data({ error: "Method not allowed" }, { status: 405 });
    }
  } catch (error) {
    logger(error);
    return data({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
