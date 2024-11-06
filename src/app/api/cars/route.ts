// app/api/cars/route.ts
import { NextResponse } from "next/server";
import { getAllDocuments, connectDatabase, insertDocument } from "@/services/mongo";

export async function GET(request: Request) {
  const client = await connectDatabase();
  const cars = await getAllDocuments(client, "cars");
  client.close();

  return NextResponse.json(cars);
}
export async function POST(request: Request){
  const client= await connectDatabase();
  const body= await request.json();
  const result= await insertDocument(client, "cars", body);
  client.close();
  return NextResponse.json(result);
}