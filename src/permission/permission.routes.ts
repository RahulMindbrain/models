import express from 'express'
const PermissionRouter = express.Router()
import {addPermission, fetchPermission } from './permission.controller'

PermissionRouter.get('/', fetchPermission)
PermissionRouter.post('/add',addPermission)

export default PermissionRouter