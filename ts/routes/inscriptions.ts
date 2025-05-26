import * as express from 'express'
import tc from '../middlewares/trycatch';
import { check } from 'express-validator';
import ExpressValidatorError from '../middlewares/ExpressValidatorError';
import ExpressValidatorMatched from '../middlewares/ExpressValidatorMatched';
import * as inscriptionController from '../controller/inscriptions';


const router = express.Router();

router.get('/test-ypareo', tc(inscriptionController.search));

router.get('/add/:record_id',
    check('record_id').notEmpty().isString().trim(),
    ExpressValidatorError,
    ExpressValidatorMatched({onlyValidData: true}),
    tc(inscriptionController.add)
)

export default router;