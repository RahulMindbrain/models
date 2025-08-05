import RoleModel from './role.model'
import { Request, Response } from 'express'


//tommorow will work on pagination fetching roles 
export const fetchRole = async (req: Request, res: Response)=>{
	const roles = await RoleModel.aggregate([
  {
    $lookup: {
      from: 'tenants',               // target collection (MongoDB collection name, not Mongoose model name)
      localField: 'tenant_token',    // field in role collection
      foreignField: 'tenant_token',  // matching field in Tenant collection
      as: 'tenant_info'              // alias for joined data
    }
  },
       
]);
	//console.log(roles);
	res.status(200).json({message:roles})
}

export const addRole = async(req:Request,res:Response):Promise<any>=>{
	try{
		const {name,tenant_token,description}=req.body;
		const role = new RoleModel({name,tenant_token,description});
		const savedRole = await role.save();
		res.status(200).json({message:"role saved with following datas",savedRole});


	}catch(e:any){
		res.status(400).json({message:"addRole error ",e});
	}
}