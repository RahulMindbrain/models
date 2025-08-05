import mongoose, {Types} from 'mongoose';
// Interface
export interface Role{
    name:string,
    tenant_token:string,
    description ?:string,
    createdAt:Date

}