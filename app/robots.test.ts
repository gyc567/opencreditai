import { describe, it, expect } from "vitest";
import robots from "./robots";

describe("robots.ts", () => {
  it("exports valid robots configuration", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://opencreditai.com/sitemap.xml");
    expect(config.rules).toBeDefined();

    const rule = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rule?.allow).toBe("/");
    expect(rule?.disallow).toContain("/api/");
    expect(rule?.disallow).toContain("/dashboard/");
    expect(rule?.disallow).toContain("/seller/");
    expect(rule?.disallow).toContain("/claim/");
    expect(rule?.disallow).toContain("/agent-guide/");
  });
});
