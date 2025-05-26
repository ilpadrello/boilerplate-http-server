import * as express from "express";
import tc from "../middlewares/trycatch";
import authMiddleware from "../middlewares/auth";

// Routes
import inscriptions from "./inscriptions";
import entreprise from "./entreprises";
import sync from "./sync";

import { hb, hbv } from "../controller/root";

const router = express.Router();

router.get("/", tc(hb));

router.get("/hb", tc(hb));

router.get("/hbv", tc(hbv));

/**
 *  Routes with auth required.
 */

router.use(tc(authMiddleware));

router.use("/inscriptions", tc(inscriptions));
router.use("/entreprise", tc(entreprise));
router.use("/sync", tc(sync));

export default router;
