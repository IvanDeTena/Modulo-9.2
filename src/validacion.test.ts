import { describe, it, expect } from "vitest";
import {
  tieneMayusculasYMinusculas,
  tieneNumeros,
  tieneCaracteresEspeciales,
  tieneLongitudMinima,
  tieneNombreUsuario,
  tienePalabrasComunes,
  validarClave,
} from "./validacion";

describe("tieneMayusculasYMinusculas", () => {
  it("debe retornar null si la clave tiene mayúsculas y minúsculas", () => {
    // Arrange
    const clave = "AbcD";

    // Act
    const resultado = tieneMayusculasYMinusculas(clave);

    // Assert
    expect(resultado).toBeNull();
  });

  it("debe retornar un mensaje de error si la clave no tiene mayúsculas", () => {
    // Arrange
    const clave = "abcd";

    // Act
    const resultado = tieneMayusculasYMinusculas(clave);

    // Assert
    expect(resultado).toBe("La clave debe de tener mayúsculas y minúsculas");
  });
});

describe("tieneNumeros", () => {
  it("debe retornar null si la clave tiene al menos un número", () => {
    // Arrange
    const clave = "abc1";

    // Act
    const resultado = tieneNumeros(clave);

    // Assert
    expect(resultado).toBeNull();
  });

  it("debe retornar un mensaje de error si la clave no tiene números", () => {
    // Arrange
    const clave = "abcdef";

    // Act
    const resultado = tieneNumeros(clave);

    // Assert
    expect(resultado).toBe("La clave debe de tener números");
  });
});

describe("tieneCaracteresEspeciales", () => {
  it("debe retornar null si la clave tiene al menos un carácter especial", () => {
    // Arrange
    const clave = "abc!";

    // Act
    const resultado = tieneCaracteresEspeciales(clave);

    // Assert
    expect(resultado).toBeNull();
  });

  it("debe retornar un mensaje de error si la clave no tiene caracteres especiales", () => {
    // Arrange
    const clave = "abcdef";

    // Act
    const resultado = tieneCaracteresEspeciales(clave);

    // Assert
    expect(resultado).toBe("La clave debe de tener caracteres especiales");
  });
});

describe("tieneLongitudMinima", () => {
  it("debe retornar null si la clave tiene 8 o más caracteres", () => {
    // Arrange
    const clave = "abcdefgh";

    // Act
    const resultado = tieneLongitudMinima(clave);

    // Assert
    expect(resultado).toBeNull();
  });

  it("debe retornar un mensaje de error si la clave tiene menos de 8 caracteres", () => {
    // Arrange
    const clave = "abc";

    // Act
    const resultado = tieneLongitudMinima(clave);

    // Assert
    expect(resultado).toBe("La clave debe de tener una longitud mínima de 8 caracteres");
  });
});

describe("tieneNombreUsuario", () => {
  it("debe retornar un mensaje de error si la clave contiene el nombre de usuario", () => {
    // Arrange
    const nombreUsuario = "user";
    const clave = "user1234";

    // Act
    const resultado = tieneNombreUsuario(nombreUsuario, clave);

    // Assert
    expect(resultado).toBe("La clave no debe tener el nombre del usuario");
  });

  it("debe retornar null si la clave no contiene el nombre de usuario", () => {
    // Arrange
    const nombreUsuario = "user";
    const clave = "securePass123";

    // Act
    const resultado = tieneNombreUsuario(nombreUsuario, clave);

    // Assert
    expect(resultado).toBeNull();
  });
});

describe("tienePalabrasComunes", () => {
  it("debe retornar un mensaje de error si la clave contiene una palabra común", () => {
    // Arrange
    const commonPasswords = ["password", "123456", "qwerty"];
    const clave = "mypassword123";

    // Act
    const resultado = tienePalabrasComunes(clave, commonPasswords);

    // Assert
    expect(resultado).toBe("La clave no debe de contener palabras comunes");
  });

  it("debe retornar null si la clave no contiene palabras comunes", () => {
    // Arrange
    const commonPasswords = ["password", "123456", "qwerty"];
    const clave = "securePass!123";

    // Act
    const resultado = tienePalabrasComunes(clave, commonPasswords);

    // Assert
    expect(resultado).toBeNull();
  });
});

describe("validarClave", () => {
  it("debe retornar esValida como true si la clave cumple con todos los requisitos", () => {
    // Arrange
    const nombreUsuario = "user";
    const clave = "Abcdef1!";
    const commonPasswords = ["password", "123456", "qwerty"];

    // Act
    const resultado = validarClave(nombreUsuario, clave, commonPasswords);

    // Assert
    expect(resultado).toEqual({ esValida: true });
  });

  it("debe retornar esValida como false y listar los errores si la clave es débil", () => {
    // Arrange
    const nombreUsuario = "user";
    const clave = "abc";
    const commonPasswords = ["password", "123456", "qwerty"];

    // Act
    const resultado = validarClave(nombreUsuario, clave, commonPasswords);

    // Assert
    expect(resultado).toEqual({
      esValida: false,
      errores: [
        "La clave debe de tener una longitud mínima de 8 caracteres",
        "La clave debe de tener mayúsculas y minúsculas",
        "La clave debe de tener números",
        "La clave debe de tener caracteres especiales",
      ],
    });
  });
});
