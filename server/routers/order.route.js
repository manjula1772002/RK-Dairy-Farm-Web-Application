import express from "express";
import {
    createOrder,
    getAllOrdersForAdmin,
    getMyOrders,
    updateOrderStatus,
} from "#controllers/orderController";
import { authMiddleware } from "#middleware/auth";


const router =express.Router();

router.post("/",authMiddleware,createOrder);
router.get("/my-orders",authMiddleware,getMyOrders);
router.get("/admin/all",authMiddleware,getAllOrdersForAdmin);
router.patch("/admin/:orderId/status",authMiddleware,updateOrderStatus);

export default router;
