import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import logger from "../utils/logger";

interface Movie {
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.BASE_URL;

if (!apiKey || !baseUrl) {
  throw new Error("API key or Base URL is missing in environment variables");
}

export const getMovieDetailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const response: AxiosResponse<Movie> = await axios.get(
      `${baseUrl}/movie/${id}`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    const movie = response.data;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 24;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Fetch and embed poster image
    const posterImageBytes = await fetch(posterUrl).then((res) =>
      res.arrayBuffer()
    );
    const posterImage = await pdfDoc.embedJpg(posterImageBytes);
    const posterDims = posterImage.scale(0.5);

    // Set title
    page.drawText(movie.title, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font,
      color: rgb(0, 0, 0.75),
    });

    // Set movie details
    page.drawText(`Release Date: ${movie.release_date}`, {
      x: 50,
      y: height - 6 * fontSize,
      size: fontSize * 0.75,
      font,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Rating: ${movie.vote_average}`, {
      x: 50,
      y: height - 7 * fontSize,
      size: fontSize * 0.75,
      font,
      color: rgb(0, 0, 0),
    });

    // Draw poster image
    page.drawImage(posterImage, {
      x: 50,
      y: height - 10 * fontSize - posterDims.height,
      width: posterDims.width,
      height: posterDims.height,
    });

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    // Send the PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=movie.pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (error: any) {
    logger.error("Error geewfewfeF:", error.message || error);
    res.status(500).send("Error generating PDF");
  }
};
