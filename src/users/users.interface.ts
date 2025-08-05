import { Types } from "mongoose"

// Interface
export interface User{
    username:string,
    password:string,//should store hashed one
    roles:string[],
    tenant_token:string,
    email:string,
    isActive:boolean,
    createdAt?:Date,
    last_login?:Date,
    reset_token?:string,
    reset_token_expires?:Date,

    comparePassword(candidatePassword: string): Promise<boolean>;

}