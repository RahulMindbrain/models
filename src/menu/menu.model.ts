import { model, Schema } from 'mongoose'
import { Menu, SubMenu } from './menu.interface'

export interface ISubMenu extends SubMenu, Document{};
export interface IMenu extends Menu, Document{};


const Subschema = new Schema<ISubMenu>({
    name:{
        type:String,
        trim:true,
    }
})
 const Menuschema = new Schema<IMenu>({
    tenant_id:{
        type:Schema.Types.ObjectId,
        ref:'Tenant'
    },

    name: { type: String, required: true, trim:true, unique: true },
    order: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        // Must be a whole number and between 1 and 3
        return Number.isInteger(value) && value >= 1 && value <= 3;
      },
      message: 'Order must be a whole number between 1 and 3'
    }
  },


  submenu: [Subschema],

  is_active:{
    type:Boolean,
    required:true,
  }
	
},{timestamps: true})

const MenuModel = model<IMenu>('Menu', Menuschema)
export default MenuModel