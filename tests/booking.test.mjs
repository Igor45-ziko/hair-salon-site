import test from "node:test";
import assert from "node:assert/strict";
import { validateBooking } from "../src/validation.mjs";
const choices = ["Помогите выбрать", "Женская стрижка"];
test("accepts formatted phone and Unicode names", () => {
  assert.deepEqual(
    validateBooking(
      {
        name: " Элиза-Мари ",
        phone: "+7 (000) 000-00-00",
        service: choices[1],
      },
      choices,
    ),
    {},
  );
});
test("accepts local 8 prefix and consultation", () => {
  assert.deepEqual(
    validateBooking(
      { name: "Alex", phone: "8 000 000 00 00", service: choices[0] },
      choices,
    ),
    {},
  );
});
test("rejects empty name, invalid phone and unknown service", () => {
  const errors = validateBooking(
    { name: "  ", phone: "+7 abc 0000000000", service: "Unknown" },
    choices,
  );
  assert.deepEqual(Object.keys(errors), ["name", "phone", "service"]);
});
test("rejects short and overlong phones", () => {
  for (const phone of ["7000", "700000000000", "+6 (000) 000-00-00"]) {
    assert.ok(
      validateBooking({ name: "Анна", phone, service: choices[0] }, choices)
        .phone,
    );
  }
});
