import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/shared/api/content";

const secret = process.env.REVALIDATE_SECRET ?? "";

const matches = (value: string) =>
  secret.length > 0 &&
  value.length === secret.length &&
  timingSafeEqual(Buffer.from(value), Buffer.from(secret));

export async function POST(request: Request) {
  if (!matches(request.headers.get("x-revalidate-secret") ?? "")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
