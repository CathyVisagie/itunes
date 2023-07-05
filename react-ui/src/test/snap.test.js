import React from "react";
import SearchForm from "../Components/SearchForm";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<SearchForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
