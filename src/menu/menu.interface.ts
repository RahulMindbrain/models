
import mongoose,{Types} from "mongoose";

// Interface

export interface SubMenu{
    name:string
}

export interface Menu{
    tenant_id:mongoose.Types.ObjectId;
    name:string,
    order:number,
    submenu?:SubMenu[],
     is_active: Boolean
}