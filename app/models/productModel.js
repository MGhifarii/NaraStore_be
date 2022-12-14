module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
      },
      description: {
        type: String,
        required: [true, "Please add an email"],
      },
      prize: {
        type: Number,
        required: [true, "Please add a password"],
      },
    },
    {
      timestamps: true,
    });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};






// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Create Schema
// const ProductSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     // images: {
//     //   type: String,
//     //   required: [true, "Please add an images"],
//     // },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     // url: {
//     //     type: String,
//     //     required: [true, "Please add a url"],
//     //   },
//   },
//   {
//     timestamps: true,
//   }
// );
// module.exports = Product = mongoose.model("Product", ProductSchema);


