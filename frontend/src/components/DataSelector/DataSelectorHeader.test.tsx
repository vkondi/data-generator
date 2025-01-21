import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DataSelectorHeader from "./DataSelectorHeader";

describe("DataSelectorHeader", () => {
  it("renders without crashing", () => {
    const { container } = render(<DataSelectorHeader />);
    expect(container).toMatchSnapshot();
  });

  it("renders the correct labels", () => {
    const { getByText } = render(<DataSelectorHeader />);
    expect(getByText("Data Type")).toBeInTheDocument();
    expect(getByText("Field Name")).toBeInTheDocument();
  });

  it("renders the delete icon spacer", () => {
    render(<DataSelectorHeader />);
    const fields = screen.queryAllByTestId("delete-icon-spacer");
    expect(fields.length).toBe(1);
  });
});
