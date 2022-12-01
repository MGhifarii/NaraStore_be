/*
const Product = require("../models/productModel.js");
const path = require("path");
const { restart } = require("nodemon");
const asyncHandler = require("express-async-handler");


// @desc    Get product
// @route   GET /api/v1/product
// @acces   Public
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();

  res.status(200).json(product);
});

// @desc    Get product by id
// @route   GET /api/v1/product/:id
// @acces   Public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

// @desc    Set product
// @route   POST /api/v1/product
// @access  Public
exports.setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.status(400);
    throw new Error("Please fill in all field");
  }

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });

  res.status(200).json(product);
});

// @desc    Update product
// @route   PUT /api/v1/product/:id
// @access  Public
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/v1/product/:id
// @access  Public
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await product.remove();

  res.status(200).json({ id: req.params.id });
});

*/


const db = require("../models");
const Product = db.products;


exports.create = (req, res) => {
  //validate request
  if (!req.body.name) {
    res.status(400).send({ message: " content can not be empty!"});
    return;
  }

  console.log(req.body)

  //create a product
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    prize: req.body.prize,
    published: req.body.published ? req.body.published : false
  });

  //save product to database

  product.save(product)
    .then (data => {
      res.send(data);
    }).catch (err => {
      res.status(500).send({
        message:
          err.message || "some error occured while creating the product"
      });
    });
};

//Retrieve all product from database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? {name: { $regex: new RegExp(name), $options: "i"}} : {};

  Product.find(condition)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "some error occured retrieving product"
    });
  });
};

//Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
  .then(data => {
    if(!data)
      res.status(404).send({message: "Not Found product with id" + id});
      else res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Error retrieving product with id" + id
      });
  });
};

exports.update = (req, res) => {
  if (!req.body){
    return res.status(400).send({
      message: "Data to update can not be empty"
    });
  }

  const id = req.params.id;
  Product.findByIdAndUpdate({_id:id }, {$set: req.body})
  .then(data => {
    if(!data){
      res.status(404).send({
        message: `Cannot update data with id=${id}`
      })
    }else res.send({message: "product was updated successfully"});
  }).catch(err => {
    console.log(err)
    res.status(500).send({
      message: "error updating product with id=" + id
    });
  });
};

//Delete product
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, { useFindandModify: false})
  .then(data => {
    if(!data){
      res.status(404).send({
        message: `Cannot delete data with id=${id}`
      });
    } else {
      res.send({
      message: "product was delete successfully"
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete product with id=" + id
    });
  });
};

//Delete all products from database
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
  .then(data => {
      res.send({
        message: `${data.deleteCount} Product were deleted successfully`
      });
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while removing all product"
    });
  });
};

//Find all published product
exports.findAllPublished = (req, res) => {
  Product.find({published:true})
  .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while removing all product"
    });
  });
};





// exports.getProduct = async(req, res)=>{
//     try {
//         const response = await Product.findAll();
//         res.json(response);
//     }catch (error){
//         console.log(error.message);
//     }
// }

// exports.getProductById = async(req, res)=>{
//     try {
//         const response = await Product.findOne();
//         where: {
//             id : req.params.id
//         }
//         res.json(response);
//     }catch (error){
//         console.log(error.message);
//     }
// }

// exports.saveProduct = (req, res)=>{
//     if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
//     const name = req.body.tittle;
//     const file = req.files.file;
//     const fileSize = file.data.length;
//     const ext = path.extname(file.name);
//     const fileName = file.md5 + ext;
//     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//     const allowedType =  ['.png','.jpg','.jpeg'];

//     if(!allowedType.includes(ext.toLowerCase())) return res.status(442).json({msg: "Invalid Images"});
//     if(fileSize > 5000000) return res.status(422).json({msg: "Image msut be less than 5 MB"});


//     file.mv(`./public/images/${fileName}`, async(err)=>{
//         if(err) return res.status(500).json({msg: err.message});
//         try {
//             await Product.create({name: name, images: fileName, url:url});
//             res.status(201).json({msg: "Product Created Successfuly"});
//         } catch (error) {
//             console.log(error.message);
            
//         }
//     })
// }

// exports.updateProduct = (req, res)=>{
    
// }

// exports.deleteProduct = (req, res)=>{
    
// }