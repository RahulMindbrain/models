import mongoose,{Types} from "mongoose"

// Interface


export interface PermissionItem {
  menu_id: Types.ObjectId;
  actions: Array<'read' | 'write' | 'edit' | 'delete'>;
}

export interface Permission {
  tenantId: Types.ObjectId;
  roleTypeId: Types.ObjectId;
  permissions: PermissionItem[];
}

