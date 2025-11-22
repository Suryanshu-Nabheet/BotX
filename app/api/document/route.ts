import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // No database - return empty documents
  return Response.json([], { status: 200 });
}

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // No database - just return success
  const body = await request.json();
  return Response.json({ id: crypto.randomUUID(), ...body }, { status: 200 });
}

export async function DELETE(request: Request) {
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // No database - just return success
  return Response.json({ success: true }, { status: 200 });
}
