// import { config } from "dotenv"

// import { PrismaClient } from "@prisma/client"
import productsRouter from "./routes/products.routes.js";
// const prisma = new PrismaClient()
import express from "express";
const app = express();
// config()

app.use("/products", productsRouter);

// const createProduct = async () =>{
//     const product = await prisma.order.create({
//         data: {
//             orderId : "EQRYRTS",
//             quantity: 190,
//             totalPrice: 99
//         }
//     })
//     console.log(product)
// }

// createProduct()

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
