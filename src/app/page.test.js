import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

test("renders title and button", () => {
  render(<Home />);

  // Überprüfung des Titels
  expect(screen.getByText(/My Frontend - The very beginning/i)).toBeInTheDocument();

  // Überprüfung der Schaltfläche
  expect(screen.getByText(/load cars/i)).toBeInTheDocument();
});
