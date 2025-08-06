import { Request, Response } from "express";
import TenantModel, { TenantDocument } from "./tenant.model";
import { IQueryResult } from "./tenant.interface";
export const fetchTenant = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const limit = parseInt((req.query.limit as string) || "5");
    const nextCursor = req.query.nextCursor as string | undefined;
    const prevCursor = req.query.prevCursor as string | undefined;

   const filter: any = {};
let sort: any = { createdAt: 1 };
let direction: "forward" | "backward" = "forward";

// Determine pagination direction and set up filter
if (prevCursor) {
  // Going backward - fetch documents older than prevCursor
  filter.createdAt = { $lt: new Date(prevCursor) };
  sort = { createdAt: -1 }; // Sort in descending order
  direction = "backward";
} else if (nextCursor) {
  // Going forward - fetch documents newer than nextCursor
  filter.createdAt = { $gt: new Date(nextCursor) };
  sort = { createdAt: 1 }; // Sort in ascending order
  direction = "forward";
}
// If neither cursor is provided, we're on the first page (no filter needed)

// Fetch limit + 1 to check if there are more pages
let tenants = await TenantModel.find(filter)
  .sort(sort)
  .limit(limit + 1);

// Check if there are more pages
const hasMorePages = tenants.length > limit;
if (hasMorePages) {
  tenants.pop(); // Remove the extra document
}

// Reverse results if we were going backward
if (direction === "backward") {
  tenants = tenants.reverse();
}

// Determine cursor values based on current page and direction
let newNextCursor = null;
let newPrevCursor = null;

if (tenants.length > 0) {
  if (direction === "forward" || (!nextCursor && !prevCursor)) {
    // Forward direction or first page
    newNextCursor = hasMorePages ? tenants[tenants.length - 1].createdAt : null;
    
    // Check if we're on the first page
    if (!nextCursor && !prevCursor) {
      newPrevCursor = null; // First page - no previous cursor
    } else {
      newPrevCursor = tenants[0].createdAt;
    }
  } else {
    // Backward direction
    newPrevCursor = hasMorePages ? tenants[0].createdAt : null;
    newNextCursor = tenants[tenants.length - 1].createdAt;
    
    // Check if we've reached the first page by checking if there are documents before our current first item
    const checkFirstPage = await TenantModel.findOne({
      createdAt: { $lt: new Date(tenants[0].createdAt) }
    });
    
    if (!checkFirstPage) {
      newPrevCursor = null; // We're back to the first page
    }
  }
}

const result: IQueryResult = {
  tenants,
  nextCursor: newNextCursor,
  prevCursor: newPrevCursor,
};

return res.status(200).json({
  message: `Fetched ${tenants.length} tenants`,
  data: result,
});

  
  } catch (e: any) {
    console.error("Pagination Error:", e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const addTenant = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, isActive } = req.body;
    const normalizedName = name.trim().toLowerCase();
    const isExist = await TenantModel.findOne({ name: normalizedName });
    if (isExist) {
      return res
        .status(409)
        .json({ message: `Tenant with name ${name} already exist ` });
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
