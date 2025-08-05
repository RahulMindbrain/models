import PermissionModel from './permission.model'
import { Request, Response } from 'express'
import { Permission } from './permission.interface'
import TenantModel from '../tenant/tenant.model'
import RoleModel from '../role/role.model'
import MenuModel from '../menu/menu.model'

export const fetchPermission = (req: Request, res: Response)=>{
	res.send("Hello")
}

export const addPermission = async (req:Request,res:Response):Promise<any>=>{
	try{
		
		const body:Permission= req.body;
		const isTenant = await TenantModel.findById(body.tenantId);
		
		if(!isTenant){
			return res.status(400).json({message:"Please enter a valid Tenant ID"})
		}
		
		const isRole = await RoleModel.findById(body.roleTypeId);
		if(!isRole){
			return res.status(400).json({message:"Please enter a valid role id"})
		}

		const permissions = body.permissions;
	//	console.log(permissions)

		for (const item of permissions) {
  const menuExists = await MenuModel.findById(item.menu_id);
  if (!menuExists) {
    return res.status(400).json({
      message: `Invalid menu_id: ${item.menu_id}`
    });
  }

		const result = await new PermissionModel(body).save();
		console.log(result);
		res.status(200).json({message:result })
	}
}
	catch(e:any){
		res.status(400).json({message:e.message});
	}
}