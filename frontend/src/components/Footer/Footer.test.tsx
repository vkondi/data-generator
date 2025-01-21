import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { useDataSelectorContext } from "../../context/DataSelectorContext";

// Mock the context
vi.mock("../../context/DataSelectorContext");

describe("Footer", () => {
  it("renders Generate button", () => {
    (useDataSelectorContext as any).mockReturnValue({ fields: [] });
    render(<Footer />);
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  it("disables Generate button when fields are invalid", () => {
    (useDataSelectorContext as any).mockReturnValue({
      fields: [{ dataType: "", name: "test" }],
    });
    render(<Footer />);
    expect(screen.getByText("Generate")).toBeDisabled();
  });

  it("enables Generate button when all fields are valid", () => {
    (useDataSelectorContext as any).mockReturnValue({
      fields: [{ dataType: "string", name: "test" }],
    });
    render(<Footer />);
    expect(screen.getByText("Generate")).not.toBeDisabled();
  });

  it("calls onGenerate when clicking Generate button", () => {
    const mockFields = [{ dataType: "string", name: "test" }];
    (useDataSelectorContext as any).mockReturnValue({ fields: mockFields });

    render(<Footer />);
    fireEvent.click(screen.getByText("Generate"));
  });
});
