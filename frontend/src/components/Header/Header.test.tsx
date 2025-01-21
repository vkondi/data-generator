import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Header from "./Header";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";

describe("Header component", () => {
    test("renders the title 'Data Generator'", () => {
        render(<Header />);
        const titleElement = screen.getByText(/Data Generator/i);
        expect(titleElement).toBeInTheDocument();
    });



    test("renders the settings icon", () => {
        render(<Header />);
        const iconElement = screen.getByTestId("settings-icon");
        expect(iconElement).toBeInTheDocument();
    });
});