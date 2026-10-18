export type FormValues = {
  name: string;
  phone: string;
  business: string;
  service: string;
};
export type Errors = Partial<Record<keyof FormValues, string>>;
export function validate(values: FormValues, serviceIds: string[]): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2)
    errors.name = "Введите имя — не менее 2 символов.";
  if (
    !/^[+\d\s()\-]+$/.test(values.phone) ||
    !/^[78]\d{10}$/.test(values.phone.replace(/\D/g, ""))
  )
    errors.phone = "Укажите 11 цифр номера, начиная с +7 или 8.";
  if (!["ip", "ooo"].includes(values.business))
    errors.business = "Выберите ИП или ООО.";
  if (![...serviceIds, "consultation"].includes(values.service))
    errors.service = "Выберите услугу или консультацию.";
  return errors;
}
