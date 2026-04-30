import Product from "#models/admin/product.model";

export async function getProducts(req, res) {
  const loggedInUser = req.user;

  const products = await Product.find();

  res.json({
    products,
    user: loggedInUser,
  })
}
