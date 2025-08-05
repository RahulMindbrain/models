import express from 'express'
const AuditlogRouter = express.Router()
import { fetchAuditlog, AddAuditlog } from './auditlog.controller'

AuditlogRouter.get('/', fetchAuditlog)
AuditlogRouter.post('/add', AddAuditlog)

export default AuditlogRouter