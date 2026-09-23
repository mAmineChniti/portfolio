import ky from "ky";
import "server-only";

const microlinkClient = ky.create({
  retry: 1,
  timeout: 15_000,
});

type MicrolinkResponse = {
  data?: {
    screenshot?: {
      url?: string;
    };
  };
};

function readScreenshotUrl(payload: unknown) {
  if (typeof payload !== "object" || payload === null || !("data" in payload)) {
    return;
  }

  const response = payload as MicrolinkResponse;
  return response.data?.screenshot?.url;
}

export async function getMicrolinkScreenshot(targetUrl: string) {
  const endpoint = new URL("https://api.microlink.io/");
  endpoint.searchParams.set("url", targetUrl);
  endpoint.searchParams.set("screenshot", "true");

  try {
    const payload = await microlinkClient
      .get(endpoint)
      .json<MicrolinkResponse>();
    return readScreenshotUrl(payload);
  } catch {
    return;
  }
}
