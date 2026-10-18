import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`Адаптив ${width}: секции, изображения, отсутствие переполнения`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const id of [
      "services",
      "prices",
      "calculator",
      "process",
      "about",
      "reviews",
      "faq",
      "consultation",
      "contacts",
    ]) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(
        await img.evaluate(
          (el: HTMLImageElement) =>
            new URL(el.currentSrc).origin === location.origin,
        ),
      ).toBe(true);
    }
    const calculator = page.locator("#calculator");
    await calculator.getByRole("radio", { name: "ООО", exact: true }).check();
    await expect(calculator.locator(".estimate strong")).toHaveText("8 900 ₽");
    await calculator
      .getByRole("link", { name: "Получить точный расчёт" })
      .click();
    await expect(page.locator("#consult-business")).toHaveValue("ooo");
    await expect(page.locator(".selection-summary")).toContainText("8 900 ₽");
    const summary = page.locator("summary").first();
    await summary.click();
    await expect(page.locator("details").first()).toHaveAttribute("open", "");
    if (width < 1200) {
      await page.getByRole("button", { name: "Открыть меню" }).click();
      await page
        .getByRole("dialog")
        .getByRole("link", { name: "Цены", exact: true })
        .click();
      await expect(page.getByRole("dialog")).not.toBeVisible();
      await expect(page).toHaveURL(/#prices$/);
    } else
      await expect(
        page.getByRole("navigation", {
          name: "Основная навигация",
          exact: true,
        }),
      ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("Калькулятор: все варианты, надбавки, клавиатура и сброс", async ({
  page,
}) => {
  const calc = page.locator("#calculator"),
    total = calc.locator(".estimate strong");
  await expect(total).toHaveText("4 900 ₽");
  await calc.getByRole("radio", { name: "ИП", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(total).toHaveText("8 900 ₽");
  await calc.getByRole("radio", { name: "1–5", exact: true }).check();
  await expect(total).toHaveText("11 400 ₽");
  await calc.getByRole("radio", { name: "50–150", exact: true }).check();
  await expect(total).toHaveText("14 900 ₽");
  await calc.getByRole("checkbox", { name: "Маркетплейсы" }).check();
  await expect(total).toHaveText("18 400 ₽");
  await calc.getByRole("checkbox", { name: "Кадры" }).focus();
  await page.keyboard.press("Space");
  await expect(total).toHaveText("20 400 ₽");
  await calc.getByRole("radio", { name: "Больше 5", exact: true }).check();
  await calc.getByRole("radio", { name: "Больше 150", exact: true }).check();
  await expect(total).toHaveText("27 900 ₽");
  await calc.getByRole("button", { name: "Сбросить параметры" }).click();
  await expect(total).toHaveText("4 900 ₽");
  await expect(calc.getByRole("checkbox", { name: "Кадры" })).not.toBeChecked();
  await expect(
    calc.getByRole("radio", { name: "Нет", exact: true }),
  ).toBeChecked();
});

test("Расчёт переносит полный снимок и сохраняет введённый текст", async ({
  page,
}) => {
  await page.locator("#consult-name").fill("Тестовый клиент");
  await page.locator("#consult-comment").fill("Нужен переход");
  const calc = page.locator("#calculator");
  await calc.getByRole("radio", { name: "ООО", exact: true }).check();
  await calc.getByRole("radio", { name: "1–5", exact: true }).check();
  await calc.getByRole("checkbox", { name: "Маркетплейсы" }).check();
  await calc.getByRole("checkbox", { name: "Кадры" }).check();
  await calc.getByRole("link", { name: "Получить точный расчёт" }).click();
  await expect(page.locator("#consult-business")).toHaveValue("ooo");
  await expect(page.locator("#consult-service")).toHaveValue("marketplace");
  await expect(page.locator(".selection-summary")).toContainText("16 900 ₽");
  await expect(page.locator(".selection-summary")).toContainText("1–5");
  await expect(page.locator(".selection-summary")).toContainText("Кадры");
  await expect(page.locator("#consult-name")).toHaveValue("Тестовый клиент");
  await expect(page.locator("#consult-comment")).toHaveValue("Нужен переход");
  await page.locator("#consult-business").selectOption("ip");
  await expect(page.locator(".selection-summary")).toHaveCount(0);
});

for (const [title, value] of [
  ["Бухгалтерское сопровождение", "support"],
  ["Отчётность и налоги", "reports"],
  ["Зарплата и кадры", "payroll"],
  ["Маркетплейсы", "marketplace"],
  ["Восстановление учёта", "recovery"],
  ["Регистрация бизнеса", "registration"],
]) {
  test(`Услуга переносится в форму: ${title}`, async ({ page }) => {
    await page
      .getByRole("link", { name: `Узнать стоимость: ${title}`, exact: true })
      .click();
    await expect(page.locator("#consult-service")).toHaveValue(value);
    await expect(page).toHaveURL(/#consultation$/);
  });
}

for (const [name, price, business] of [
  ["Старт", "4 900 ₽", "ip"],
  ["Бизнес", "8 900 ₽", ""],
  ["Компания", "14 900 ₽", "ooo"],
]) {
  test(`Выбор тарифа ${name} и удаление пометки`, async ({ page }) => {
    await page.getByRole("link", { name: `Выбрать «${name}»` }).click();
    await expect(page.locator(".selection-summary")).toContainText(price);
    await expect(page.locator("#consult-business")).toHaveValue(business);
    await expect(page.locator("#consult-service")).toHaveValue("support");
    await page
      .getByRole("button", { name: "Убрать выбранный расчёт или тариф" })
      .click();
    await expect(page.locator(".selection-summary")).toHaveCount(0);
  });
}

test("Новая услуга удаляет старый тариф; ручное изменение услуги очищает расчёт", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Выбрать «Компания»" }).click();
  await page
    .getByRole("link", { name: "Узнать стоимость: Регистрация бизнеса" })
    .click();
  await expect(page.locator(".selection-summary")).toHaveCount(0);
  await page.getByRole("link", { name: "Получить точный расчёт" }).click();
  await page.locator("#consult-service").selectOption("consultation");
  await expect(page.locator(".selection-summary")).toHaveCount(0);
});

test("Форма: ошибки, фокус, телефон, локальный успех без отправки и хранения", async ({
  page,
}) => {
  const sent: string[] = [];
  page.on("request", (r) => {
    if (["fetch", "xhr"].includes(r.resourceType()) || r.method() !== "GET")
      sent.push(r.url());
  });
  const submit = page
    .locator("form")
    .getByRole("button", { name: "Получить консультацию" });
  await submit.click();
  await expect(page.locator(".field-error")).toHaveCount(4);
  await expect(page.locator("#consult-name")).toBeFocused();
  await page.locator("#consult-name").fill("Ирина");
  await page.locator("#consult-phone").fill("123");
  await page.locator("#consult-business").selectOption("ip");
  await page.locator("#consult-service").selectOption("consultation");
  await submit.click();
  await expect(page.locator(".field-error")).toHaveCount(1);
  await expect(page.locator("#consult-phone")).toBeFocused();
  await page.locator("#consult-phone").fill("8 (999) 123-45-67");
  await submit.click();
  await expect(page.locator(".form-success")).toContainText(
    "Спасибо! Это демонстрационная форма учебного проекта — заявка никуда не отправлена.",
  );
  await expect(page.locator(".form-success")).toBeFocused();
  expect(sent).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookie: document.cookie,
    })),
  ).toEqual({ local: 0, session: 0, cookie: "" });
  await page.getByRole("button", { name: "Заполнить ещё раз" }).click();
  await expect(page.locator("#consult-name")).toHaveValue("");
  await expect(page.locator("#consult-name")).toBeFocused();
});

test("Меню: клавиатурная ловушка, Escape, возврат фокуса и смена ширины", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const opener = page.getByRole("button", { name: "Открыть меню" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Закрыть меню" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Получить консультацию" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await expect(opener).toHaveAttribute("aria-expanded", "false");
  await opener.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("FAQ: все шесть ответов открываются с клавиатуры", async ({ page }) => {
  const details = page.locator("details");
  await expect(details).toHaveCount(6);
  for (const item of await details.all()) {
    await item.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(item).toHaveAttribute("open", "");
    await expect(item.locator("p")).toBeVisible();
  }
  await expect(page.locator("details[open]")).toHaveCount(1);
});

test("Telegram — демонстрационное окно; все якоря существуют", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Написать в Telegram" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Реальный аккаунт не подключён",
  );
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Перейти к форме" })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(
    await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((a) => a.getAttribute("href")!)
          .filter((h) => !document.getElementById(h.slice(1))),
      ),
  ).toEqual([]);
  await expect(page.locator("footer")).toContainText(
    "Компания, специалисты, цены, отзывы и контакты вымышлены",
  );
});

for (const width of [390, 1440])
  test(`Доступность WCAG AA ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const scan = () =>
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
    expect((await scan()).violations).toEqual([]);
    await page
      .locator("form")
      .getByRole("button", { name: "Получить консультацию" })
      .click();
    expect((await scan()).violations).toEqual([]);
    if (width < 1200)
      await page.getByRole("button", { name: "Открыть меню" }).click();
    else
      await page.getByRole("button", { name: "Написать в Telegram" }).click();
    expect((await scan()).violations).toEqual([]);
  });

test("Reduced motion отключает анимации и плавную прокрутку", async ({
  page,
}) => {
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await expect(page.locator(".reveal-ready")).toHaveCount(0);
});
