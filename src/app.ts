import express from "express";
import moviesRouter from "../routes/moviesRouter";
import cors from "cors";

const app = express();

app.use(cors());

app.use("/movies", moviesRouter);

export default app;
