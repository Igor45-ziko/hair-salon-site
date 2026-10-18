export type CalculatorValues = {
  business: "ip" | "ooo";
  employees: "none" | "small" | "large";
  operations: "low" | "medium" | "high";
  marketplaces: boolean;
  hr: boolean;
};
export const initialCalculator: CalculatorValues = {
  business: "ip",
  employees: "none",
  operations: "low",
  marketplaces: false,
  hr: false,
};
export const businessNames = { ip: "ИП", ooo: "ООО" };
export const employeeNames = {
  none: "Нет сотрудников",
  small: "1–5 сотрудников",
  large: "Больше 5 сотрудников",
};
export const operationNames = {
  low: "До 50 операций",
  medium: "50–150 операций",
  high: "Больше 150 операций",
};
export function calculate(values: CalculatorValues) {
  const items = [
    {
      name: `База для ${businessNames[values.business]}`,
      amount: values.business === "ip" ? 4900 : 8900,
    },
  ];
  if (values.employees !== "none")
    items.push({
      name: employeeNames[values.employees],
      amount: values.employees === "small" ? 2500 : 6000,
    });
  if (values.operations !== "low")
    items.push({
      name: operationNames[values.operations],
      amount: values.operations === "medium" ? 3500 : 7500,
    });
  if (values.marketplaces) items.push({ name: "Маркетплейсы", amount: 3500 });
  if (values.hr) items.push({ name: "Кадровые документы", amount: 2000 });
  return { items, total: items.reduce((sum, item) => sum + item.amount, 0) };
}
export function describeCalculation(values: CalculatorValues) {
  return [
    businessNames[values.business],
    employeeNames[values.employees],
    operationNames[values.operations],
    values.marketplaces ? "Маркетплейсы" : "",
    values.hr ? "Кадры" : "",
  ]
    .filter(Boolean)
    .join(" · ");
}
