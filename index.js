import productsRouter from "./routes/products.routes.js";

import express from "express";
const app = express();
app.use(express.json());

app.use("/products", productsRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
