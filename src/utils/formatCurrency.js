export function formatCurrency(value) {
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value));
  } catch (_error) {
    return `R$ ${Number(value).toFixed(2)}`;
  }
}
