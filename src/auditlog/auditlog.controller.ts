import { auditlog } from './auditlog.interface'
import AuditlogModel from './auditlog.model'
import { Request, Response } from 'express'

export const fetchAuditlog = (req: Request, res: Response)=>{
	res.send("Hello")
}

export const AddAuditlog =async  (req:Request, res:Response)=>{
	const body:auditlog = req.body;

	const result = await new AuditlogModel(body).save()
}