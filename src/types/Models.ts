import { PassportLocalModel, Model } from "mongoose";
import { messageschema, userschema } from "./Schemas";

export interface usermodel extends PassportLocalModel<userschema> {}
export interface messagemodel extends Model<messageschema> {}