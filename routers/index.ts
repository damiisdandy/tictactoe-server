import { Router } from "express";
import { assignGame, createGame, getGame } from "../controllers";

const router = Router();

router.post('/create', createGame);
router.get('/:code', getGame);
router.post('/assign/:code', assignGame);

export default router;