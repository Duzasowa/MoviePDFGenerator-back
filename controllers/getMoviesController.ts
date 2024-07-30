import "../config";
import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { PDFDocument, rgb } from "pdf-lib";
import logger from "../utils/logger";

interface Movie {
  title: string;
  release_date: string;
  vote_average: number;
}

interface MoviesResponse {
  results: Movie[];
}

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.BASE_URL;

if (!apiKey || !baseUrl) {
  throw new Error("API key or Base URL is missing in environment variables");
}

export const getMoviesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response: AxiosResponse<MoviesResponse> = await axios.get(
      `${baseUrl}/movie/popular`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    const movies = response.data.results;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 24;

    // Set title
    page.drawText("Popular Movies", {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0.75),
    });

    // Set movies list
    let yPosition = height - 6 * fontSize;
    for (let i = 0; i < movies.length && i < 20; i++) {
      // TOP 20
      const movie = movies[i];
      const text = `${i + 1}. ${movie.title} (${
        movie.release_date
      }) - Rating: ${movie.vote_average}`;
      page.drawText(text, {
        x: 50,
        y: yPosition,
        size: fontSize * 0.5,
        color: rgb(0, 0, 0),
      });
      yPosition -= fontSize * 1.25;
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Send the PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=movies.pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error: any) {
    logger.error("Error generating PDF:", error.message || error);
    res.status(500).send("Error generating PDF");
  }
};
