import express from 'express'
const TenantRouter = express.Router()
import { addTenant, fetchTenant } from './tenant.controller'

TenantRouter.get('/', fetchTenant)
TenantRouter.post('/add',addTenant)

export default TenantRouter