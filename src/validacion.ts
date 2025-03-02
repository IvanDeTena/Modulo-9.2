export interface ValidacionClave {
  esValida: boolean;
  errores?: string[];
}


export const tieneMayusculasYMinusculas = (clave: string): string | null => {
  let tieneMayuscula = false;
  let tieneMinuscula = false;

  for (const caracter of clave) {
    if (caracter >= 'A' && caracter <= 'Z') {
      tieneMayuscula = true;
    } else if (caracter >= 'a' && caracter <= 'z') {
      tieneMinuscula = true;
    }
    if (tieneMayuscula && tieneMinuscula) {
      return null; // Ambas condiciones se cumplen
    }
  }
  
  return "La clave debe de tener mayúsculas y minúsculas";
};

export const tieneNumeros = (clave: string): string | null => {
  for (const caracter of clave) {
    if (caracter >= '0' && caracter <= '9') {
      return null; // Contiene al menos un número
    }
  }
  return "La clave debe de tener números"; // No contiene números
};

export const tieneCaracteresEspeciales = (clave: string): string | null => {
  const caracteresEspeciales = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

  for (const caracter of clave) {
    if (caracteresEspeciales.includes(caracter)) {
      return null; // Contiene al menos un carácter especial
    }
  }

  return "La clave debe de tener caracteres especiales"; // No contiene caracteres especiales
};

export const tieneLongitudMinima = (clave: string): string | null => {
  return clave.length >= 8
    ? null
    : "La clave debe de tener una longitud mínima de 8 caracteres";
};

export const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string
): string | null => {
  for (let i = 0; i < nombreUsuario.length; i++) {
    if (clave.includes(nombreUsuario)) {
      return "La clave no debe tener el nombre del usuario";
    }
  }
  return null;
};

export const tienePalabrasComunes = (
  clave: string,
  commonPasswords: string[]
): string | null => {
  for (let i = 0; i < commonPasswords.length; i++) {
    if (clave.includes(commonPasswords[i])) {
      return "La clave no debe de contener palabras comunes";
    }
  }
  return null;
};

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const errores = [
    tieneLongitudMinima(clave),
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords),
  ].filter((error): error is string => error !== null);

  return errores.length === 0
    ? { esValida: true }
    : { esValida: false, errores };
};