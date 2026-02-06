import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "intersection-observer";

afterEach(() => {
  cleanup();
});
