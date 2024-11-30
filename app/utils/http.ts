import { Model, ProjectionType } from "mongoose";

// todo ratelimiting
// todo cors
// retrict delete and put(optional)

export async function paginate<T = any>(
  model: Model<T>,
  query = {},
  projection?: ProjectionType<T> | null | undefined,
  page: number = 1,
  limit: number = 10
) {
  const skip = (page - 1) * limit;

  // Fetch data and count total documents matching query
  const [total, data] = await Promise.all([
    model.countDocuments(),
    model.find(query, projection, { skip, limit }),
  ]);

  return {
    data,
    paginate: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
