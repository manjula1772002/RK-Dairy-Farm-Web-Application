import Order from "#models/orders.model";
import Product from "#models/admin/product.model";

const ORDER_STATUS = [
  "Pending",
  "Confirmed",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const normalizeQuantity = (quantity) => {
  const parsedQuantity = Number(quantity);
  return Number.isFinite(parsedQuantity) && parsedQuantity > 0
    ? parsedQuantity
    : 1;
};

const buildOrderItem = async (item) => {
  const productId = item.productId || item.product || item._id;
  const optionLabel = item.optionLabel || item.label;

  const product = await Product.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const selectedOption = product.options.find(
    (option) => option.label === optionLabel,
  );

  if (!selectedOption) {
    const error = new Error("Selected product option not found");
    error.statusCode = 400;
    throw error;
  }

  const quantity = normalizeQuantity(item.quantity);

  return {
    product: product._id,
    name: product.name,
    image: product.image,
    label: selectedOption.label,
    price: selectedOption.price,
    quantity,
  };
};

export const createOrder=async(req,res)=>{
    try{
      const {productId,optionLabel,quantity,address,items}=req.body;

      const requestedItems = Array.isArray(items) && items.length
        ? items
        : [{ productId, optionLabel, quantity }];

      const orderItems = await Promise.all(requestedItems.map(buildOrderItem));
      const totalAmount = orderItems.reduce(
        (total,item)=>total + item.price * item.quantity,
        0,
      );

      const order =await Order.create({
       user:req.user.id,
       items:orderItems,
       totalAmount,
       address,
       paymentMethod:"Cash on Delivery",
       paymentStatus:"Pending",
       orderStatus:"Pending",  
      });

      res.status(201).json({
        success:true,
        message:"Order created successfully",
        order,
      });
    } catch(error){
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
        });
    }
};

export const getMyOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user.id})
            .populate("items.product")
            .sort({createdAt:-1});

        res.json({
            success:true,
            orders,
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

export const getAllOrdersForAdmin=async(req,res)=>{
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Admin access required",
            });
        }

        const orders=await Order.find()
            .populate("user","name email")
            .populate("items.product")
            .sort({createdAt:-1});

        res.json({
            success:true,
            orders,
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

export const updateOrderStatus=async(req,res)=>{
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Admin access required",
            });
        }

        const {orderId}=req.params;
        const {orderStatus}=req.body;

        if(!ORDER_STATUS.includes(orderStatus)){
            return res.status(400).json({
                success:false,
                message:"Invalid order status",
            });
        }

        const update={
            orderStatus,
        };

        if(orderStatus === "Delivered"){
            update.paymentStatus="Paid";
        }

        const order=await Order.findByIdAndUpdate(orderId,update,{ returnDocument: "after", }) //update
            .populate("user","name email")
            .populate("items.product");

        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found",
            });
        }

        res.json({
            success:true,
            message:"Order updated successfully",
            order,
        });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
