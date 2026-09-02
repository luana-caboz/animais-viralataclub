export function requireServerEnv(
  name: string,
  value: string | undefined,
) {
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não configurada: ${name}`);
  }

  return value;
}
