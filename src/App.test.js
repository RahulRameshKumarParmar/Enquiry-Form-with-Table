import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe("Enquiry Form", () => {
  test("Render the form and it's field", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /enquiry now!/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /save/i})).toBeInTheDocument();
  })

  test("allows a user to enter the name", async () => {
    const user = userEvent.setup();
    render(<App />)

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, "Rahul Parmar");

    expect(nameInput).toHaveValue("Rahul Parmar");
  })
})
