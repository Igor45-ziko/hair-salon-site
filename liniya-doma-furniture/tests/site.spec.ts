import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { categories, projects, swatches } from "../src/data";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`layout and local images at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 950 });
    await expect(page.locator("h1")).toHaveText(
      "Мебель, котораяподходит вашему дому.",
    );
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(await img.getAttribute("src")).toMatch(/^\.\/images\//);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const overflowing = await page
      .locator(
        "main .container, .category-card, .project-card, input, select, textarea, .header .logo",
      )
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const box = element.getBoundingClientRect();
            return box.left < -1 || box.right > innerWidth + 1;
          })
          .map((element) => element.className),
      );
    expect(overflowing).toEqual([]);
    expect(errors).toEqual([]);
    const logo = await page.locator(".header .logo").boundingBox();
    expect(logo!.height).toBeLessThan(60);
  });
}

test("mobile navigation: focus, escape, anchors and resizing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Открыть меню" }).click();
  const navigation = page.getByRole("navigation", {
    name: "Мобильная навигация",
  });
  await expect(navigation.getByRole("link", { name: /Мебель/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Открыть меню" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await navigation.getByRole("link", { name: /Работы/ }).click();
  await expect(navigation).toHaveCount(0);
  await expect(page).toHaveURL(/#works$/);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("");
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(navigation).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .toBe("");
});

test("portfolio filters show the correct projects", async ({ page }) => {
  for (const [label, count] of [
    ["Кухни", 2],
    ["Шкафы", 2],
    ["Гардеробные", 1],
    ["Другое", 2],
    ["Все", 7],
  ] as const) {
    const filter = page
      .getByRole("group", { name: "Фильтры работ" })
      .getByRole("button", { name: new RegExp(`^${label}`) });
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(page.locator(".filter-status")).toHaveText(
      `Показано: ${count} из 7`,
    );
    if (label !== "Все")
      for (const tag of await page.locator(".project-tag").all())
        await expect(tag).toHaveText(label);
  }
});

test("all seven photos open with matching information and restore focus", async ({
  page,
}) => {
  for (const project of projects) {
    const opener = page.getByRole("button", {
      name: `${project.type}. Увеличить: ${project.name}`,
      exact: true,
    });
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("heading", { name: project.name }),
    ).toBeVisible();
    await expect(dialog).toContainText(project.size);
    await expect(dialog.locator("img")).toHaveAttribute(
      "alt",
      project.photo.alt,
    );
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
  }
});

test("gallery arrows cycle only within the selected filter", async ({
  page,
}) => {
  await page
    .getByRole("group", { name: "Фильтры работ" })
    .getByRole("button", { name: /^Кухни/ })
    .click();
  await page.locator(".project-photo").first().click();
  await expect(page.locator(".lightbox-counter")).toHaveText("1 / 2 · Кухни");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-counter")).toHaveText("2 / 2 · Кухни");
  await page.getByRole("button", { name: "Следующая работа" }).click();
  await expect(page.locator(".lightbox-counter")).toHaveText("1 / 2 · Кухни");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".lightbox-counter")).toHaveText("2 / 2 · Кухни");
  await page.getByRole("link", { name: "Рассчитать похожий проект" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#measure-furniture")).toHaveValue("kitchen");
});

test("all categories prefill furniture while preserving entered details", async ({
  page,
}) => {
  await page.locator("#measure-name").fill("Ирина");
  await page.locator("#measure-comment").fill("Нужен шкаф высотой 260 см");
  for (const category of categories) {
    await page
      .getByRole("link", { name: `Рассчитать: ${category.title}`, exact: true })
      .click();
    await expect(page.locator("#measure-furniture")).toHaveValue(category.id);
    await expect(page.locator("#measure-name")).toHaveValue("Ирина");
    await expect(page.locator("#measure-comment")).toHaveValue(
      "Нужен шкаф высотой 260 см",
    );
  }
});

test("price rows prefill the corresponding furniture type", async ({
  page,
}) => {
  for (const [index, category] of categories.entries()) {
    await page.locator(".price-row").nth(index).click();
    await expect(page.locator("#measure-furniture")).toHaveValue(category.id);
  }
});

test("measurement form validates and discards data without requests or storage", async ({
  page,
}) => {
  const form = page.locator(".measure-form");
  await form.getByRole("button", { name: "Вызвать замерщика" }).click();
  await expect(form.locator("[aria-invalid=true]")).toHaveCount(3);
  await expect(page.locator("#measure-name")).toBeFocused();
  await page.locator("#measure-name").fill("Ирина");
  await page.locator("#measure-phone").fill("+1 234 567 8901");
  await page.locator("#measure-furniture").selectOption("consultation");
  await form.getByRole("button").click();
  await expect(page.locator("#measure-phone")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.locator("#measure-phone").fill("+7 (999) 123-45-67");
  await page.locator("#measure-comment").fill("Демонстрационные данные");
  const requests: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() !== "GET" ||
      ["fetch", "xhr"].includes(request.resourceType())
    )
      requests.push(request.url());
  });
  await form.getByRole("button").click();
  await expect(page.locator(".form-success")).toContainText(
    "Демонстрация завершена.Заявка не отправлена.",
  );
  await expect(page.locator(".form-success")).toBeFocused();
  await expect(page.locator("#measure-name")).toHaveCount(0);
  await expectNoStorage(page);
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Заполнить ещё раз" }).click();
  await expect(page.locator("#measure-name")).toHaveValue("");
  await expect(page.locator("#measure-phone")).toHaveValue("");
  await expect(page.locator("#measure-comment")).toHaveValue("");
  await expect(page.locator("#measure-furniture")).toHaveValue("");
});

async function expectNoStorage(page: Page) {
  expect(
    await page.evaluate(() => [
      localStorage.length,
      sessionStorage.length,
      document.cookie,
    ]),
  ).toEqual([0, 0, ""]);
}

test("callback form validates, resets on close and completes without transmitting data", async ({
  page,
}) => {
  const opener = page
    .locator("#contacts")
    .getByRole("button", { name: "Заказать звонок" });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Заказать звонок" }).click();
  await expect(dialog.locator("[aria-invalid=true]")).toHaveCount(2);
  await page.locator("#callback-name").fill("Сергей");
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await opener.click();
  await expect(page.locator("#callback-name")).toHaveValue("");
  await page.locator("#callback-name").fill("Сергей");
  await page.locator("#callback-phone").fill("8 999 123 45 67");
  const requests: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() !== "GET" ||
      ["fetch", "xhr"].includes(request.resourceType())
    )
      requests.push(request.url());
  });
  await dialog.getByRole("button", { name: "Заказать звонок" }).click();
  await expect(dialog.locator(".form-success")).toContainText(
    "Демонстрация завершена.Заявка не отправлена.",
  );
  expect(requests).toEqual([]);
  await expectNoStorage(page);
  await dialog.getByRole("button", { name: "Закрыть окно" }).click();
  await expect(dialog).toHaveCount(0);
});

test("material swatches change the selected description", async ({ page }) => {
  for (const swatch of swatches) {
    const button = page.getByRole("button", { name: swatch.name, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".swatch-caption")).toContainText(
      swatch.description,
    );
    await expect(page.locator(".swatches [aria-pressed=true]")).toHaveCount(1);
  }
});

test("six FAQ answers open individually and can close", async ({ page }) => {
  const details = page.locator(".faq-list details");
  await expect(details).toHaveCount(6);
  for (const item of await details.all()) {
    await item.locator("summary").click();
    await expect(item.locator("p")).toBeVisible();
    await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
  }
  await details.last().locator("summary").click();
  await expect(page.locator(".faq-list details[open]")).toHaveCount(0);
});

test("all internal links have destinations and demo notices are explicit", async ({
  page,
}) => {
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!))) {
    await expect(page.locator(href)).toHaveCount(1);
  }
  await expect(page.locator(".footer-bottom")).toContainText(
    "Учебный проект. Компания, проекты, цены, отзывы и контакты вымышлены. Формы заявок демонстрационные.",
  );
  await expect(page.locator(".contact-details")).toContainText(
    "Телефон, email и адрес вымышлены.",
  );
  await expect(page.locator(".location-map")).toHaveAccessibleName(
    /Адрес вымышленный/,
  );
});

for (const width of [390, 1440]) {
  test(`accessibility at ${width}px, including errors and modal`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator(".measure-form button").click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page
      .locator("#contacts")
      .getByRole("button", { name: "Заказать звонок" })
      .click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
