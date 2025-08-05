import MenuModel from './menu.model'
import { Request, Response } from 'express'
import { IMenu } from './menu.model'

export const fetchMenu = (req: Request, res: Response)=>{
	res.send("Hello")
}

export const addMenu = async(req:Request,res:Response)=>{
	  try {
    const body:IMenu = req.body;
    const result = await new MenuModel(body).save();
    console.log(result);
    res.status(201).json(result); // ✅ Send response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Failed to add menu`,error });
  }

}