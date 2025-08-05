import TenantModel from '../tenant/tenant.model';
import UsersModel from './users.model'

import { Request, Response } from 'express'

//tommorow will work on pagination over fetching users
export const fetchUsers = async (req: Request, res: Response) => {
  try {
   const users = await UsersModel.aggregate([
  {
    $lookup: {
      from: 'tenants',               // target collection (MongoDB collection name, not Mongoose model name)
      localField: 'tenant_token',    // field in Users collection
      foreignField: 'tenant_token',  // matching field in Tenant collection
      as: 'tenant_info'              // alias for joined data
    }
  },
       
]);

    res.status(200).json({
      message: `Found ${users.length} users`,
      users, // <- returns proper nested tenant details
    });
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
};


export const addUser = async (req:Request,res:Response):Promise<any>=>{
	try{
		const {username,password,roles,tenant_token,email,isActive,last_login,reset_token,reset_token_expires} =  req.body;
		
		const isExist = await UsersModel.findOne({email});
		
		if(isExist){
			return res.status(400).json({message:"User already exist, try to use another email"});

		}

		const user = new UsersModel({
			username: username,
			password:password,
			roles:roles,
			tenant_token:tenant_token,
			email:email,
			isActive:isActive,
			last_login:last_login,
			reset_token:reset_token,
			reset_token_expires:reset_token_expires
		})
		const resUser= await user.save();
		//console.log('addUser');
		res.status(200).json({message:"user is created with following data"+resUser});

	}catch(e:any){
		return res.status(404).json({message:"add User Error"+e});
	}
}