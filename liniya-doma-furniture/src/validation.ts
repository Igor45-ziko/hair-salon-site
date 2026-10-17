export type ContactErrors = { name?: string; phone?: string };
export function validateContact(name: string, phone: string): ContactErrors {
  const errors: ContactErrors = {};
  if (name.trim().length < 2)
    errors.name = "Введите имя — не менее 2 символов.";
  if (
    !/^[+\d\s()\-]+$/.test(phone) ||
    !/^[78]\d{10}$/.test(phone.replace(/\D/g, ""))
  )
    errors.phone = "Укажите 11 цифр номера, начиная с +7 или 8.";
  return errors;
}
