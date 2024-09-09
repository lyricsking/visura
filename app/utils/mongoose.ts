import mongoose from "mongoose";

export interface DBReponseType<T> {
  data?: T | null;
  error?: mongoose.Error;
}

export const parseError = (errorObject: mongoose.Error) => {
  if (errorObject instanceof mongoose.Error.ValidationError) {
    let error: Record<string, any> = {};
    for (const field in errorObject.errors) {
      error[field] = errorObject.errors[field].message;
    }
    return error;
  } else if (errorObject instanceof mongoose.Error.CastError) {
    errorObject.message;
  } else if (errorObject instanceof mongoose.Error) {
    errorObject.message;
  } else {
  }
};
