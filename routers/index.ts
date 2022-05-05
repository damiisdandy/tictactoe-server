import { Router } from "express";
import { createGame, getGame } from "../controllers";

const router = Router();

router.post('/create', createGame);
router.get('/:code', getGame);

export default router;