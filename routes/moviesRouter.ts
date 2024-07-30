import { Router } from "express";
import { getMoviesController } from "../controllers/getMoviesController";
import { getMovieDetailController } from "../controllers/getMovieDetailController";
import { getMoviesDataController } from "../controllers/getMoviesDataController";

const router = Router();

router.get("/", getMoviesController);
router.get("/movie/:id", getMovieDetailController);
router.get("/json", getMoviesDataController);

export default router;
