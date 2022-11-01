module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      description: String,
      prize: String,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("Product", schema);
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


