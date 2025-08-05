import { model, Schema,Document } from 'mongoose'
import { auditlog } from './auditlog.interface'

export interface AuditDoc extends auditlog,Document{};

const schema = new Schema<AuditDoc>({
    tenantId:{
        type:Schema.Types.ObjectId,
        ref:"Tenant",
        required:true,

    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    action:{
        type:String,
        trim:true,
        
    },
    resource:{
        type:String,
        trim:true,
    }
	
},{timestamps: true})

const AuditlogModel = model<AuditDoc>('Auditlog', schema)
export default AuditlogModel