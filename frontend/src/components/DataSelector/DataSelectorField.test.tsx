import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi, beforeEach, test } from "vitest";
import DataSelectorField from "./DataSelectorField";

describe("DataSelectorField", () => {
  const mockOnTypeChange = vi.fn();
  const mockOnNameChange = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    onTypeChange: mockOnTypeChange,
    onNameChange: mockOnNameChange,
    onDelete: mockOnDelete,
    index: 0,
    dataTypeValue: "name",
    nameValue: "Test Name",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders DataSelectorField component", () => {
    render(<DataSelectorField {...defaultProps} />);
    expect(screen.getByTestId("data-selector-field")).toBeInTheDocument();
    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    render(<DataSelectorField {...defaultProps} />);
    fireEvent.click(screen.getByTestId("delete-button"));
    expect(mockOnDelete).toHaveBeenCalledWith(0);
  });
});
