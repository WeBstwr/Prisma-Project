import { Router } from "express";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
config();

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { orderId, quantity, totalPrice } = req.body;
    const newProduct = await prisma.order.create({
      data: {
        orderId,
        quantity,
        totalPrice,
      },
      select: {
        quantity: true,
        totalPrice: true,
      },
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", (req, res) => {
  res.send("getting a single product");
});

router.patch("/:id", (req, res) => {
  res.send("updating a product");
});

router.delete("/:id", (req, res) => {
  res.send("deleting a product");
});

export default router;
