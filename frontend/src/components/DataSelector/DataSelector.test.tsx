import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DataSelector from "./DataSelector";

describe("DataSelector", () => {
  it("renders without crashing", () => {
    render(<DataSelector />);
    expect(screen.getByText("Add New Row")).toBeInTheDocument();
  });

  it("adds a new row when 'Add New Row' button is clicked", () => {
    render(<DataSelector />);
    const addButton = screen.getByText("Add New Row");
    fireEvent.click(addButton);
    const fields = screen.getAllByTestId("data-selector-field");
    expect(fields.length).toBe(2);
  });

  it("deletes a field", () => {
    render(<DataSelector />);
    const deleteButton = screen.getAllByTestId("delete-button")[0];
    fireEvent.click(deleteButton);
    const fields = screen.queryAllByTestId("data-selector-field");
    expect(fields.length).toBe(0);
  });
});
