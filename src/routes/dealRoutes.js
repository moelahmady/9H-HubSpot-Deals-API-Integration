import express from "express";
import { dealController } from "../controllers/dealController.js";

const router = express.Router();

router.post("/deals/mock/:count", async (req, res, next) => {
  try {
    const deals = await dealController.createMockDeals(req.params.count);
    res.json(deals);
  } catch (error) {
    next(error);
  }
});

router.post("/deals/create", async (req, res, next) => {
  try {
    const deals = await dealController.createDeal(req.body);
    res.json(deals);
  } catch (error) {
    next(error);
  }
});

router.get("/deals/high-priority", async (req, res, next) => {
  try {
    const deals = await dealController.getAndSaveHighPriorityDeals();
    res.json(deals);
  } catch (error) {
    next(error);
  }
});

export default router;
