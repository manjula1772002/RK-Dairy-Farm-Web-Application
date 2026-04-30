import Product from "#models/admin/product.model";
import User from "#models/user.model";

export function adminDashboard(req, res) {
  res.json({ message: "Welcome to admin dashboard" });
}

export async function createProduct(req, res) {
  try {
    const { name, category } = req.body;
    const parsedOptions =
      typeof req.body.options === "string"
        ? JSON.parse(req.body.options)
        : req.body.options;

    const image = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.image;

    const newProduct = new Product({
      name,
      category,
      image,
      options: parsedOptions,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

export async function updateProduct(req, res) {
  try {
    const { name, category, image, options } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, image, options },
      {
        returnDocument: "after", //update
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      message: "Product updated successfully!",
      updatedData: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

export async function getRegisteredUsers(req, res) {
  try {
    const users = await User.find(
      { role: "user" },
      { name: 1, email: 1, role: 1 }
    ).sort({ _id: -1 });

    res.json({
      totalRegisteredUsers: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch registered users" });
  }
}
