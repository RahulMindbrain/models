import { Request, Response } from "express";
import TenantModel, { TenantDocument } from "./tenant.model";

export const fetchTenant =async (req: Request, res: Response):Promise<any> => {
	
	try{
	const tenants = await TenantModel.find();
	return res.status(200).json({message:`Fetched ${tenants.length} tenants`});
	}catch (e: any) {
  console.log("Something went wrong: " + e.message);
}
};

export const addTenant = async (req: Request, res: Response): Promise<any> => {
  
  try {
    const {name,isActive} = req.body;
	   const normalizedName = name.trim().toLowerCase();
	const isExist = await TenantModel.findOne({name:normalizedName});
	if(isExist){
		return res.status(409).json({message:`Tenant with name ${name} already exist `});
	}

    const tenant: TenantDocument = new TenantModel({
      name: name,
      isActive: isActive,
    });
    const savedTenant = await tenant.save();

    return res.status(201).json({
      message: "Tenant created successfully",
      tenant: savedTenant,
    });
  } catch (e: any) {
    console.error("Error creating tenant:", e.message);

    return res.status(400).json({
      message: "Failed to create tenant",
      error: e.message,
    });
  }
};
