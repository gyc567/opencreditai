import { describe, it, expect } from "vitest";
import { NOINDEX_METADATA } from "./seo";

describe("lib/seo", () => {
  describe("NOINDEX_METADATA", () => {
    it("disables indexing and following", () => {
      expect(NOINDEX_METADATA.robots).toEqual({
        index: false,
        follow: false,
      });
    });

    it("is a frozen object reference", () => {
      const copy1 = NOINDEX_METADATA;
      const copy2 = NOINDEX_METADATA;
      expect(copy1).toBe(copy2);
    });
  });
});
