import * as express from 'express';
import tc from '../middlewares/trycatch';

// Routes

import { hb, hbv } from '../controller/root';

const router = express.Router();

router.get('/', tc(hb));

router.get('/hb', tc(hb));

router.get('/hbv', tc(hbv));

/**
 *  Routes with auth required.
 */

export default router;
