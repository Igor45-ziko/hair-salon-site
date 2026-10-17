import { test, expect } from "@playwright/test";

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`Страница, изображения и отсутствие переполнения: ${width}px`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const failed: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failed.push(response.url());
    });
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "где сначала",
    );
    await expect(page.locator(".service-card")).toHaveCount(8);
    await expect(page.locator(".team-card")).toHaveCount(3);
    await expect(page.locator(".review-card")).toHaveCount(3);
    await page.locator("#team").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    const overflowing = await page.evaluate(() =>
      Array.from(document.querySelectorAll("body *"))
        .filter((element) => {
          if (
            element.closest(
              ".hero-photo, .team-photo, .location-map, .skip-link",
            )
          )
            return false;
          const box = element.getBoundingClientRect();
          return (
            box.width > 0 &&
            (box.right > window.innerWidth + 1 || box.left < -1)
          );
        })
        .map((el) => `${el.tagName}.${el.className}`),
    );
    expect(overflowing).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    expect(failed).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/site-${width}.png`,
      fullPage: true,
    });
  });
}

test("Мобильное меню: клавиатура, Escape и переход к разделу", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Открыть меню" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Мобильная навигация" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Мобильная навигация" })
      .getByRole("link", { name: "01 Услуги" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Мобильная навигация" })
    .getByRole("link", { name: "02 Цены" })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Мобильная навигация" }),
  ).toHaveCount(0);
  await expect(page).toHaveURL(/#prices$/);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("FAQ раскрывается мышью и клавиатурой", async ({ page }) => {
  await page.goto("/");
  const first = page.locator("details").first();
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
  await expect(first.locator("p")).toBeVisible();
  const second = page.locator("details").nth(1);
  await second.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(second).toHaveAttribute("open", "");
  await expect(first).not.toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(second).not.toHaveAttribute("open", "");
});

test("Услуга выбирается, форма проверяет ввод и ничего не отправляет", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Записаться: Автоэлектрика", exact: true })
    .click();
  await expect(page.getByLabel("Что беспокоит / услуга")).toHaveValue(
    "Автоэлектрика",
  );
  const submit = page.getByRole("button", { name: "Записаться", exact: true });
  await submit.click();
  await expect(
    page.getByText("Введите имя — хотя бы 2 символа."),
  ).toBeVisible();
  await expect(page.getByLabel("Ваше имя")).toBeFocused();
  await page.getByLabel("Ваше имя").fill("Тест");
  await page.getByLabel("Телефон", { exact: false }).fill("+7 123");
  await submit.click();
  await expect(
    page.getByText("Укажите 11 цифр, начиная с +7 или 8."),
  ).toBeVisible();
  await page.getByLabel("Телефон", { exact: false }).fill("+7 (999) 123-45-67");
  await page
    .getByLabel("Марка и модель автомобиля")
    .fill("Тестовый автомобиль");
  const outgoing: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() !== "GET" ||
      new URL(request.url()).hostname !== "127.0.0.1"
    )
      outgoing.push(request.url());
  });
  await submit.click();
  await expect(page.getByRole("status")).toContainText(
    "Демонстрация завершена.Заявка не отправлена.",
  );
  await expect(page.getByRole("status")).toBeFocused();
  expect(outgoing).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
    })),
  ).toEqual({ local: 0, session: 0 });
  await page.getByRole("button", { name: "Заполнить ещё раз" }).click();
  await expect(page.getByLabel("Ваше имя")).toHaveValue("");
  await expect(page.getByLabel("Телефон", { exact: false })).toHaveValue("");
});

test("Декоративный маршрут честно обозначен, диалог закрывается", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Построить маршрут" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "реальный маршрут построить нельзя",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Построить маршрут" }),
  ).toBeFocused();
});

test("Внутренние ссылки ведут к существующим разделам", async ({ page }) => {
  await page.goto("/");
  const missing = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (link) =>
            !document.getElementById(link.getAttribute("href")!.slice(1)),
        )
        .map((link) => link.getAttribute("href")),
    );
  expect(missing).toEqual([]);
  await expect(page.locator("footer")).toContainText(
    "Учебный проект. Автосервис, сотрудники, отзывы, цены и контакты вымышлены. Форма записи демонстрационная.",
  );
});
