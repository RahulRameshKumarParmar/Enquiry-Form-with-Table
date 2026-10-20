import { render, screen } from '@testing-library/react';
import App from './App';

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
})
