import express from 'express'
const RoleRouter = express.Router()
import { fetchRole,addRole } from './role.controller'

RoleRouter.get('/', fetchRole)
RoleRouter.post('/add', addRole)

export default RoleRouter