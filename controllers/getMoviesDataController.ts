import "../config";
import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import logger from "../utils/logger";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const getMoviesDataController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      logger.error("API key is missing");
      res.status(500).send("API key is missing");
      return;
    }

    const response: AxiosResponse<MovieResponse> = await axios.get(
      `${process.env.MOVIE_DB}`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    logger.error("Data retrieval error:", error.message || error);
    res.status(500).send("Error fetching movies");
  }
};
