import mongoose from "mongoose";

export interface DBReponse<T> {
  data?: T | null;
  error?: Record<string, any>;
}

export async function handleDbResult<T>(asyncFn: Promise<T>): Promise<DBReponse<T>> {
  try {
    const data = await asyncFn;
    return { data };
  } catch (err: mongoose.Error.ValidationError | any) {
    if (err instanceof mongoose.Error.ValidationError) {
      return { error: parseError(err) };
    } else {
      console.log(err);
      throw err;
    }
  }
}

export const parseError = (errorObject: mongoose.Error) => {
  if (errorObject instanceof mongoose.Error.ValidationError) {
    let error: Record<string, any> = {};
    for (const field in errorObject.errors) {
      error[field] = errorObject.errors[field].message;
    }
    return error;
  } else if (errorObject instanceof mongoose.Error.CastError) {
    return { [errorObject.path]: errorObject.message };
  } else if (errorObject instanceof mongoose.Error) {
    return { message: errorObject.message };
  }
};
