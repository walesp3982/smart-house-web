import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MyButton from "./Button";

describe("Button", () => {
  it("renderiza el texto correctamente", () => {
    render(<MyButton children="Guardar" onClick={() => {}} />);

    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("llama a onClick al hacer click", () => {
    const handleClick = vi.fn(); // función mock, registra si fue llamada
    render(<MyButton children="Guardar" onClick={handleClick} />);

    fireEvent.click(screen.getByText("Guardar"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("no llama a onClick si está disabled", () => {
    const handleClick = vi.fn();
    render(<MyButton children="Guardar" disabled onClick={handleClick} />);

    fireEvent.click(screen.getByText("Guardar"));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
