export function formatDate(fecha: string | number | Date): string {
  const date = new Date(fecha);
  const dia = date.getDate();
  const año = date.getFullYear();
  const mes = date.toLocaleString("es-PE", { month: "long" });

  return `${dia} de ${capitalize(mes)}, ${año}`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
