// Interface

import mongoose, { mongo } from "mongoose";

export interface auditlog{
    tenantId:mongoose.Types.ObjectId,
    userId:mongoose.Types.ObjectId,
    action:string,
    resource:string,
    CreatedAt:Date,
    //details:
}