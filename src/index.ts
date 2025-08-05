import express, {Request, Response} from 'express'
import mongoose from 'mongoose';

const app = express()
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Role-Based-Access')
.then(()=>{
    console.log("🛢️ Connected");
})
.catch((e:any)=>{
    console.log("😒 Error while Connecting",e);
})


//dont delete below line
// Routes
import AuditlogRouter from './auditlog/auditlog.routes'
import PermissionRouter from './permission/permission.routes'
import MenuRouter from './menu/menu.routes'
import RoleRouter from './role/role.routes'
import UsersRouter from './users/users.routes'
import TenantRouter from './tenant/tenant.routes'
app.get('/', (req: Request, res: Response) => {
    res.send('Your server is running!')
})

app.use('/tenant', TenantRouter)
app.use('/users', UsersRouter)
app.use('/role', RoleRouter)
app.use('/menu', MenuRouter)
app.use('/permission', PermissionRouter)


app.listen(8080,()=>{
    console.log(`http://localhost:8080`);
})
app.use('/auditlog', AuditlogRouter)