import { validarClave } from "./validacion";


const commonPasswords = [
  "password", "123456", "qwerty", "admin", "letmein", "welcome", "monkey",
  "sunshine", "password1", "123456789", "football", "iloveyou", "1234567",
  "123123", "12345678", "abc123", "qwerty123", "1q2w3e4r", "baseball",
  "password123", "superman", "987654321", "mypass", "trustno1", "hello123",
  "dragon", "1234", "555555", "loveme", "hello", "hockey", "letmein123",
  "welcome123", "mustang", "shadow", "12345", "passw0rd", "abcdef", "123abc",
  "football123", "master", "jordan23", "access", "flower", "qwertyuiop",
  "admin123", "iloveyou123", "welcome1", "monkey123", "sunshine1",
  "password12", "1234567890"
];



document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario") as HTMLFormElement;
  const resultado = document.getElementById("resultado") as HTMLParagraphElement;

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreUsuario = formulario.querySelector<HTMLInputElement>("#nombreUsuario")?.value.trim() || "";
    const clave = formulario.querySelector<HTMLInputElement>("#clave")?.value.trim() || "";

    const validacion = validarClave(nombreUsuario, clave, commonPasswords);

    resultado.textContent = validacion.esValida
      ? "✅ Clave válida"
      : `❌ Errores:\n- ${validacion.errores?.join("\n- ")}`;
  });
});