import { model, Schema } from 'mongoose'
import {Permission, PermissionItem } from './permission.interface'
import MenuModel from '../menu/menu.model';
export interface PermissionDoc extends Permission,Document{};
export interface PermissionDocs extends PermissionItem,Document{};
const PermissionItems= new Schema({
     menu_id: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },
  actions: {
    type: [String],
    enum: ['read', 'write', 'edit', 'delete'], // Enforce valid values
    required: true,
  },
},{timestamps:true});

const Permissionschema = new Schema({
	tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
     roleTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    permissions: {
      type: [PermissionItems],
      required: true,
    },
},{timestamps: true})



const PermissionModel = model('Permission', Permissionschema)
export default PermissionModel