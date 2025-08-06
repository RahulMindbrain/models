// Interface
export interface Tenant {
    name:string,
    tenant_token:string,
    isActive:Boolean,
    createdAt:Date,

}

export interface IQueryResult{
    tenants:Tenant[],
    nextCursor:Date|null,
    prevCursor:Date|null
}