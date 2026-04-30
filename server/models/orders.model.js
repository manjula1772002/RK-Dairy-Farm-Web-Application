import mongoose from "mongoose";

const orderSchema =new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true,
        },

    items:{
        type:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products",
                    required:true,
                },
                name:{
                    type:String,
                    required:true,
                },
                image:{
                    type:String,
                },
                label:{
                    type:String,
                    required:true,
                },
                price:{
                    type:Number,
                    required:true,
                },
                quantity:{
                    type:Number,
                    required:true,
                    default:1,
                },
            },
        ],
        required:true,
        validate:{
            validator:(items)=>items.length>0,
            message:"Order must have at least one item",
        },
    },

    totalAmount:{
        type:Number,
        required:true,
    },

    address: {
      fullName: String,
      phone: String,
      houseNo:String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    paymentMethod:{
        type:String,
        default:"Cash on Delivery",
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending",
    },

    orderStatus:{
        type:String,
        enum:["Pending","Confirmed","Out for Delivery","Delivered","Cancelled"],
        default:"Pending",
    },

   }, 

    {timestamps:true}

);

const Order=mongoose.model("Order",orderSchema,"orders");

export default Order;
