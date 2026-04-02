import { describe, it, expect } from "vitest";
import { middleware } from "./middleware";
import { NextRequest } from "next/server";

function createRequest(path: string, userAgent: string = "Mozilla/5.0"): NextRequest {
  const url = `https://opencreditai.com${path}`;
  return new NextRequest(url, {
    headers: { "user-agent": userAgent },
  });
}

describe("middleware", () => {
  it("allows normal browser requests to pass through", () => {
    const request = createRequest("/", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("rewrites curl requests to /api/agent-init", () => {
    const request = createRequest("/", "curl/7.68.0");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("rewrites wget requests to /api/agent-init", () => {
    const request = createRequest("/", "Wget/1.21");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("does NOT rewrite Googlebot requests — they must get HTML", () => {
    const request = createRequest("/", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
    const response = middleware(request);
    // Googlebot should pass through normally, NOT be rewritten to API
    expect(response.status).toBe(200);
  });

  it("does NOT rewrite Bingbot requests — they must get HTML", () => {
    const request = createRequest("/", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("does NOT rewrite generic bot/crawler/spider requests", () => {
    const botAgents = [
      "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
      "DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)",
      "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
      "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    ];

    for (const agent of botAgents) {
      const request = createRequest("/", agent);
      const response = middleware(request);
      expect(response.status).toBe(200);
    }
  });

  it("rewrites Claude bot requests to /api/agent-init", () => {
    const request = createRequest("/", "claude-bot/1.0");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("rewrites requests with text/markdown accept header to /api/agent-init", () => {
    const url = "https://opencreditai.com/";
    const request = new NextRequest(url, {
      headers: {
        "user-agent": "custom-agent/1.0",
        accept: "text/markdown",
      },
    });
    const response = middleware(request);
    expect(response.status).toBe(200);
  });

  it("does not affect non-root paths", () => {
    const request = createRequest("/blog", "curl/7.68.0");
    const response = middleware(request);
    expect(response.status).toBe(200);
  });
});
