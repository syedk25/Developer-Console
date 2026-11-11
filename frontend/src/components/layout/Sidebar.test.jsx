import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import Sidebar from "./Sidebar";

test("sidebar has transition classes", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>
  );
  const aside = screen.getByRole("complementary");
  expect(aside).toHaveClass("transition-all", "duration-300", "ease-in-out");
});
