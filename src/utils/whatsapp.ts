const sanitizeNumber = (value: string) => value.replace(/\D/g, "");

export const buildWaLink = (number: string, message: string) => {
  const sanitized = sanitizeNumber(number);
  const text = encodeURIComponent(message);
  return `https://wa.me/${sanitized}?text=${text}`;
};

export const openWa = (messageOverride?: string) => {
  if (typeof window === "undefined") return;
  const settingsRaw = window.localStorage.getItem("tpa_snapshot_v1");
  let number = "54911XXXXXXXX";
  let message = "Hola, quiero sumarme a TPA. Me pasás info de próximas salidas?";

  if (settingsRaw) {
    try {
      const parsed = JSON.parse(settingsRaw);
      if (parsed?.settings?.whatsappNumber) {
        number = parsed.settings.whatsappNumber;
      }
      if (parsed?.settings?.whatsappDefaultMessage) {
        message = parsed.settings.whatsappDefaultMessage;
      }
    } catch {
      // noop
    }
  }

  const finalMessage = messageOverride ?? message;
  const link = buildWaLink(number, finalMessage);
  window.open(link, "_blank", "noopener");
};
