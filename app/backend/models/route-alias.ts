import mongoose, { Model, Schema } from "mongoose";
import { IRouteAlias } from "~/core/types/route-alias";

type RouteAliasModel = Model<IRouteAlias>;

export const routeAliaseSchema = new Schema<IRouteAlias, RouteAliasModel>({
  _id: { type: String, required: true, unique: true, index: true },
  path: { type: String, required: true, unique: true },
});

export const RouteAlias: RouteAliasModel =
  mongoose.models.RouteAlias ||
  mongoose.model<RouteAliasModel>("RouteAlias", routeAliaseSchema);
