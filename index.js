
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./app/middleware/errorMiddleware.js");
const dotenv = require('dotenv')
// const FileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

dotenv.config();

// set up express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// port listener
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(errorHandler);

// connect to mongoDB
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log(`MongoDB connected: `);
  }
);

// set up routes
app.use("/api/v1/users", require("./app/routers/userRouter.js"));
// app.use("/api/v1/products", require("./app/routers/productRouter.js"));
// app.use("/api/v1/admins", require("./app/routers/adminRouter.js"));

//Upload File
// app.use(FileUpload());
// app.use(productRouter);
 
//simple route
// app.get("/", (req, res) => {
//   res.json({message:"Welcome to NaraStore"});
// });

require("./app/routers/productRouter")(app);

/*
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

//parse request of content tipe application
app.use(bodyParser.json());

//parse request of content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true  }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database");
  }).catch(err => {
    console.log("Cannot Connect to the database", err);
    process.exit();
  });

  //simple route
  app.get("/", (req, res) => {
    res.json({message:"Welcome to NaraStore"});
  });

  require("./app/routers/productRouter")(app);

  //set Port, listen for request
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

*/
