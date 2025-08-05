import mongoose, { model, Schema, Document } from "mongoose";
import { Role } from "./role.interface";

export interface RoleDocument extends Role, Document {}
const schema = new Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tenant_token: {
      type: String,
      ref: "Tenant",
      required: true,
    },
    description:{
        type:String,
        maxLength:100,
    }
  },
  { timestamps: true }
);

const RoleModel = model<RoleDocument>("Role", schema);
export default RoleModel;
