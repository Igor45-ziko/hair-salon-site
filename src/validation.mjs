/**
 * @param {{ name: string, phone: string, service: string }} values
 * @param {string[]} allowedServices
 * @returns {Record<string, string>}
 */
export function validateBooking({ name, phone, service }, allowedServices) {
  /** @type {Record<string, string>} */
  const errors = {};
  if (!name.trim()) errors.name = "Укажите ваше имя.";
  const digits = phone.replace(/[\s()+-]/g, "");
  if (!/^[78]\d{10}$/.test(digits))
    errors.phone = "Введите 11 цифр, начиная с +7 или 8.";
  if (!allowedServices.includes(service))
    errors.service = "Выберите услугу из списка.";
  return errors;
}
