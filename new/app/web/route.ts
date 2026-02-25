import { redirect } from "next/navigation";

export function GET() {
  redirect("/?o=web-agents");
}
