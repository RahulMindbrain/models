import express from 'express'
const UsersRouter = express.Router()
import { addUser, fetchUsers } from './users.controller'

UsersRouter.get('/', fetchUsers)
UsersRouter.post('/adduser',addUser);

export default UsersRouter