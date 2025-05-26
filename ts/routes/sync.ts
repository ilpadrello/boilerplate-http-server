import * as express from "express";
import tc from "../middlewares/trycatch";
import { param } from "express-validator";
import ExpressValidatorError from "../middlewares/ExpressValidatorError";
import ExpressValidatorMatched from "../middlewares/ExpressValidatorMatched";
import * as syncController from "../controller/sync";

interface ValidatedRequest<T> extends Request {
  validated: T;
}

const router = express.Router();

router.get(
  "/internal/B2B/CRM/new-contract/:id_airtable_contract",
  [param("id_airtable_contract").isString().trim()],
  ExpressValidatorError,
  ExpressValidatorMatched({ onlyValidData: true }),
  tc(syncController.internal_B2B_to_CRM_new_contract)
);
export default router;
