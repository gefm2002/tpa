export const formatDate = (date: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  return parsed.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

export const formatTime = (time: string) => {
  return time;
};

export const formatPrice = (isFree: boolean, price: number | null, currency: string) => {
  if (isFree) return "Gratuita";
  if (price === null) return "Consultar";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
};
