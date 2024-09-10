import express, { Request, Response } from "express";
import config from "config";

const router = express.Router();

router.get("/paypal", (req: Request, res: Response) => {
  return res.json({ clientId: config.get("paypalClientId") } || "sb");
});

router.get("/stripe", (req: Request, res: Response) => {
  return res.json({ key: config.get("stripePublishableKey") });
});

export default router;
