const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./app/middleware/errorMiddleware.js");
const dotenv = require('dotenv')

const PORT = process.env.PORT || 5000;

dotenv.config();

// set up express
const app = express();
app.use(express.json());

// port listener
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://bentol.netlify.app"],
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
// app.use("/api/v1/admins", require("./app/routers/adminRouter.js"));
