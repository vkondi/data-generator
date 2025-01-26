import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Header from "./Header";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

describe("Header component", () => {
    test("renders the title 'Rapid Data'", () => {
        render(<Header />);
        const titleElement = screen.getByText(/Rapid Data/i);
        expect(titleElement).toBeInTheDocument();
    });
});