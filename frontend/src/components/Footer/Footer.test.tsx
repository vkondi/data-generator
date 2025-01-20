import { render } from "@testing-library/react";
import Footer from "./Footer";
import { describe, expect, test } from "vitest";

describe("Footer component", () => {
  test("renders footer element", () => {
    const { getByRole } = render(<Footer />);
    const footerElement = getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("renders footer content", () => {
    const { getByText } = render(<Footer />);
    const label = `© ${new Date().getFullYear()} Data Generator`;
    const footerText = getByText(label);
    expect(footerText).toBeInTheDocument();
  });
});
