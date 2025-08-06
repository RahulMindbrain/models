import { Request, Response } from "express";
import TenantModel, { TenantDocument } from "./tenant.model";
import { IQueryResult } from "./tenant.interface";



export const fetchTenant =async (req: Request, res: Response):Promise<any> => {
	try{
    //cursor-based pagination logic 
      const limit = parseInt((req.query.limit as string)  || "5");
      const nextCursor = req.query.nextCursor as string |  undefined ;
      const prevCursor = req.query.prevCursor as string | undefined;

      const filter:any={};
      let sort:any = {createdAt:1};
      let direction:"forward"|"backward"="forward";

      if(prevCursor){
        filter.createdAt = {$lte: new Date(prevCursor)};
        sort = {createdAt: -1};
        direction = "backward";
      }else if(nextCursor) {
          filter.createAt = {$gte: new Date(nextCursor)};
          sort={createdAt: 1};
          direction = "forward";
      }

        let tenants = await TenantModel.find(filter).sort(sort).limit(limit+1);

        let hasNextPage = false;
        let hasPrevPage = false;


        if(tenants.length>limit){
          hasNextPage=true;
          tenants.pop();
        }
        if(direction==='backward'){
          tenants = tenants.reverse();
          hasPrevPage=hasNextPage;
          hasNextPage=hasPrevPage;

        }else{
          hasPrevPage = nextCursor !== undefined;
        }

        const newNextCursor = hasNextPage ? tenants[tenants.length-1].createdAt:null

        const newPrevCursor = hasPrevPage ? tenants[0].createdAt:null;

        const result:IQueryResult =  {
          tenants :tenants,
          nextCursor:newNextCursor,
          prevCursor:newPrevCursor

        }
	return res.status(200).json({message:`Fetched ${limit} tenants`,data: result});
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
