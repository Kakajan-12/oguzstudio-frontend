
const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export type SubmitError = "rateLimit" | "invalid" | "network";

export class SubmitFailed extends Error {
  constructor(public reason: SubmitError) {
    super(reason);
  }
}

async function post(path: string, body: BodyInit, headers?: HeadersInit) {
  let response: Response;
  try {
    response = await fetch(`${API_URL}/api${path}`, { method: "POST", body, headers });
  } catch {
    throw new SubmitFailed("network");
  }
  if (response.ok) return;
  if (response.status === 429) throw new SubmitFailed("rateLimit");
  if (response.status === 400) throw new SubmitFailed("invalid");
  throw new SubmitFailed("network");
}

export type ContactRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  description: string;
  locale: string;
  recaptchaToken?: string;
};

export function sendContactRequest(data: ContactRequest) {
  return post("/contact-requests", JSON.stringify(data), { "Content-Type": "application/json" });
}

export function sendApplication(data: FormData) {
  return post("/applications", data);
}
