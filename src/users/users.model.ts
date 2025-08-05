import { model, Schema, Document } from 'mongoose';
import { User } from './users.interface';
import bcrypt from 'bcrypt';

export interface UserDocument extends User,Document{}; 
const schema = new Schema<UserDocument>({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
      match: [/^[a-zA-Z ]{3,}$/, "Username should only contain letters and spaces, min 3 characters"]
      },
      password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,"Password should contain lowercase, Uppercase, digit, special Char "]
      },
    roles:[{
        type:Schema.Types.ObjectId, ref:'Role'

    }],
    tenant_token:{

        type:String, ref:'Tenant',required:true,

    },  
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please Enter a valid mail']
    },
    isActive: { type: Boolean, default: true },
    last_login: { type: Date },
    reset_token: { type: String },
    reset_token_expires: { type: Date },
	
},{timestamps: true})


schema.pre("save",async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    try{
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(user.password,saltRounds);
        user.password = hashPass;
        next();
    }
    catch(e:any){
        next(e);
    }


})


schema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UsersModel = model<UserDocument>('Users', schema)
export default UsersModel


// username:string,
//     password:string,//should store hashed one
//     roles:string[],
//     tenant_id:string,
//     email:string,
//     isActive:boolean,
//     createdAt?:Date,
//     last_login?:Date,
//     reset_token?:string,
//     reset_token_expires?:Date