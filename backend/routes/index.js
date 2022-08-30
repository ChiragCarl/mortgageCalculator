// import express
import express from "express";
// import controllers
import { getProducts, 
    getProductById, 
    saveProduct, 
    updateProduct,
    deleteProduct } from "../Controller/UserController.js";
 
// express router
const router = express.Router();
 
// get All Products
router.get('/', getProducts);
// get single Product
router.get('/:id', getProductById);
// CREATE Product
router.post('/', saveProduct);
// UPDATE Product
router.patch('/:id', updateProduct);
// DELETE Product
router.delete('/:id', deleteProduct);
 
// export router
export default router;