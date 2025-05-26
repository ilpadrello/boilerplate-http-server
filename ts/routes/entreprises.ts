import * as express from "express";
import tc from "../middlewares/trycatch";
import { check, param } from "express-validator";
import ExpressValidatorError from "../middlewares/ExpressValidatorError";
import ExpressValidatorMatched from "../middlewares/ExpressValidatorMatched";
import * as entrepriseController from "../controller/entreprises";

interface ValidatedRequest<T> extends Request {
  validated: T;
}

const router = express.Router();

router.get("/test-entreprise/:id_to_get", tc(entrepriseController.test));

router.get(
  "/add/:id_airtable_contrat",
  [param("id_airtable_contrat").isString().trim()],
  ExpressValidatorError,
  ExpressValidatorMatched({ onlyValidData: true }),
  tc(entrepriseController.add)
);
export default router;
