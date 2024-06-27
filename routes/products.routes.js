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
        id: true,
        quantity: true,
        totalPrice: true,
      },
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await prisma.order.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.order.findFirst({
      where: { id },
      select: {
        id: true,
        totalPrice: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { orderId, quantity, totalPrice } = req.body;
  const { id } = req.params;
  try {
    let updateProduct;
    if (orderId) {
      updateProduct = await prisma.order.update({
        where: { id },
        data: { orderId },
      });
    }
    if (quantity) {
      updateProduct = await prisma.order.update({
        where: { id },
        data: { quantity },
      });
    }
    if (totalPrice) {
      updateProduct = await prisma.order.update({
        where: { id },
        data: { totalPrice },
      });
    }
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.order.delete({
      where: { id },
      select: {
        id: true,
        totalPrice: true,
        quantity: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
