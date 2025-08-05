import { model, Schema, Document } from "mongoose";
import { randomUUID } from "crypto";
import { Tenant } from "./tenant.interface";

export interface TenantDocument extends Tenant, Document {}
const schema = new Schema<TenantDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      match: /^[a-zA-Z ]+$/, // letters and spaces only, no numbers
      unique:true
    },
    tenant_token: {
      type: String,
      required: true,
      unique: true,
      default: () => randomUUID(),
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
schema.pre('save', function (next) {
  this.name = this.name.trim().toLowerCase();
  next();
});

const TenantModel = model<TenantDocument>("Tenant", schema);
export default TenantModel;
