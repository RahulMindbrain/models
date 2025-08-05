import express from 'express'
const MenuRouter = express.Router()
import { fetchMenu, addMenu } from './menu.controller'

MenuRouter.get('/', fetchMenu)
MenuRouter.post('/addmenu',addMenu);

export default MenuRouter