import express from "express";
import {authMiddleware} from "#middleware/auth";
import {requireAdmin} from "#middleware/admin";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getRegisteredUsers,
} from "#controllers/adminController";
import multer from "multer";
import path from "path";

// uploads 
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  }, filename: function (req, file, cb) {
    // Generate a unique name + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); //limiting size

const router =express.Router();

router.use(authMiddleware,requireAdmin);


router.post("/products", upload.single("image"), createProduct);  //create

router.get("/products", getProducts); //read

router.get("/users", getRegisteredUsers);

router.get("/products/:id", getProductById); //id

router.put("/products/:id", updateProduct); //update

router.delete("/products/:id", deleteProduct); //delete
export default router;
