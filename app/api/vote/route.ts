import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // No database - return empty votes
  return Response.json([], { status: 200 });
}

export async function PATCH(request: Request) {
  const user = await currentUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // No database - just return success
  const body = await request.json();
  return Response.json({ success: true, ...body }, { status: 200 });
}
