export type Fields = {
  name: string;
  phone: string;
  occasion: string;
  date: string;
  guests: string;
  filling: string;
};
export type Errors = Partial<Record<keyof Fields | "file", string>>;
export function earliestDate(now = new Date()) {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const date = new Date(`${today}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 3);
  return date.toISOString().slice(0, 10);
}
export function validateFields(
  values: Fields,
  allowedFillings: string[],
): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2)
    errors.name = "Введите имя — не менее 2 символов.";
  if (
    !/^[+\d\s()\-]+$/.test(values.phone) ||
    !/^[78]\d{10}$/.test(values.phone.replace(/\D/g, ""))
  )
    errors.phone = "Укажите 11 цифр номера, начиная с +7 или 8.";
  if (
    !["birthday", "children", "wedding", "bento", "other"].includes(
      values.occasion,
    )
  )
    errors.occasion = "Выберите повод или тип заказа.";
  const date = new Date(`${values.date}T12:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(values.date) ||
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== values.date ||
    values.date < earliestDate()
  )
    errors.date = "Выберите дату не раньше чем через 3 дня.";
  const number = Number.parseFloat(values.guests.replace(",", "."));
  if (
    !/^\d+(?:[.,]\d+)?\s*(?:гост(?:ь|я|ей)|чел(?:овек)?|кг)?$/i.test(
      values.guests.trim(),
    ) ||
    !(number > 0 && number <= 1000)
  )
    errors.guests = "Напишите число больше 0: например, 10 гостей или 2 кг.";
  if (![...allowedFillings, "help"].includes(values.filling))
    errors.filling = "Выберите начинку или помощь с выбором.";
  return errors;
}
export function validateFile(file: File | undefined) {
  if (!file) return undefined;
  if (
    !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    !/\.(jpe?g|png|webp)$/i.test(file.name)
  )
    return "Выберите изображение JPG, PNG или WebP.";
  if (file.size > 10 * 1024 * 1024)
    return "Размер файла должен быть не больше 10 МБ.";
  if (file.size === 0) return "Файл пустой. Выберите другое изображение.";
  return undefined;
}
