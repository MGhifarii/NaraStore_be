
module.exports = app => {
    const products = require("../controllers/productController.js");

    var router = require("express").Router();

    router.post("/", products.create);
    router.get("/", products.findAll);
    router.get("/published", products.findAllPublished);
    router.get("/:id", products.findOne);
    router.put("/:id", products.update);
    router.delete("/:id", products.delete);
    router.delete("/", products.deleteAll);

    app.use("/api/products", router);
};



/*
const express = require("express");
// import controllers
const productController = require("../controllers/productController.js");
const {getProduct, getProductById, saveProduct, updateProduct, deleteProduct} = require("../controllers/productController");
const router = express.Router();

router.get("/", productController.getProduct);
router.get("/:id", productController.getProductById);
router.post("/", productController.setProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);


module.exports = router;
*/