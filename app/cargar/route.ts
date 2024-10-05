import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  try {
    const guardia = await prisma.guardia.create({
      data: body,
    });

    return Response.json({ guardia });
  } catch (error) {
    console.log("Error creating the guardia", error);
    return Response.json({ error: "Error creating the guardia" });
  }
}
