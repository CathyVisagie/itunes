import { render, screen } from "@testing-library/react";

// Import Header component
import Header from "../Components/Header";

// This simple unit test tests that the heading "iTunes" is rendered successfully on the page
test("renders iTunes heading", () => {
  render(<Header />);
  const h1 = screen.getByText("iTunes");
  expect(h1).toBeInTheDocument();
});
