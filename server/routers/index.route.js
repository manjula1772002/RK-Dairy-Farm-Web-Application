import express from "express";
import authRouter from "#routers/auth.route";
import productRouter from "#routers/products.route";
import adminProductRouter from "#routers/admin/product.route";
import orderRouter from "#routers/order.route";
import messageRoutes from "#routers/message.route";

const router =express.Router();

router.get("/", (req,res) =>{
    res.json({message:"Hello from server!"});
});

router.use("/", authRouter);

router.use("/", productRouter);
router.use("/admin", adminProductRouter);

router.use("/orders",orderRouter);

router.use("/messages",messageRoutes);


export default router;
