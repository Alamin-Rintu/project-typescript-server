import { projectCollection } from "../config/db";
import { Request, Response } from "express";

export const getData = async (req: Request, res: Response) => {
  const cursor = await projectCollection.find();
  const results = await cursor.toArray();
  res.send(results);
}