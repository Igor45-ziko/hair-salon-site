import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  bestsellers,
  disclaimer,
  fillings,
  occasions,
  works,
} from "../src/data";
import { earliestDate } from "../src/validation";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`page, local images and layout at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 950 });
    await expect(page.locator("h1")).toContainText("Торты и десерты");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".hero img")).toHaveAttribute("loading", "eager");
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
    expect(
      await page
        .locator(
          ".container,.cake-card,.work-card,.filling-card,input:not([type=hidden]),select,textarea",
        )
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const box = element.getBoundingClientRect();
              return (
                box.width > 0 && (box.left < -1 || box.right > innerWidth + 1)
              );
            })
            .map((element) => element.className),
        ),
    ).toEqual([]);
    await page.locator(".work-photo").first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Закрыть фотографию" }).click();
    await page.locator(".faq-list summary").first().click();
    await expect(
      page.locator(".faq-list details").first().locator("p"),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("mobile menu traps focus, closes on Escape, links and desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const opener = page.getByRole("button", { name: "Открыть меню" });
  await opener.click();
  const menu = page.getByRole("dialog", { name: "МАРИЯ ОРЛОВА · МЕНЮ" });
  await expect(menu).toBeVisible();
  await expect(
    menu.getByRole("button", { name: "Закрыть меню" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    menu.getByRole("link", { name: "Рассчитать заказ" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    menu.getByRole("button", { name: "Закрыть меню" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(opener).toBeFocused();
  await opener.click();
  await page
    .getByRole("navigation", { name: "Мобильная навигация" })
    .getByRole("link", { name: "Начинки" })
    .click();
  await expect(page).toHaveURL(/#fillings$/);
  await expect(menu).toHaveCount(0);
  await opener.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(menu).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("portfolio filters show matching work counts", async ({ page }) => {
  for (const [name, count] of [
    ["День рождения", 6],
    ["Детские", 1],
    ["Свадебные", 1],
    ["Бенто", 1],
    ["Все", 9],
  ] as const) {
    const button = page
      .getByRole("group", { name: "Фильтры работ" })
      .getByRole("button", { name, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".work-card")).toHaveCount(count);
    await expect(page.locator(".gallery-count")).toHaveText(
      `${count} из 9 работ`,
    );
    if (name !== "Все")
      for (const tag of await page.locator(".work-category").all())
        await expect(tag).toHaveText(name);
  }
});

test("all occasion cards select the intended portfolio filter", async ({
  page,
}) => {
  for (const item of occasions) {
    await page
      .locator(".occasion-card")
      .filter({
        has: page.getByRole("heading", { name: item.name, exact: true }),
      })
      .click();
    await expect(page).toHaveURL(/#works$/);
    await expect(
      page
        .getByRole("group", { name: "Фильтры работ" })
        .getByRole("button", { name: item.filter, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
});

test("every portfolio image opens and restores keyboard focus", async ({
  page,
}) => {
  for (const work of works) {
    const opener = page.getByRole("button", {
      name: `${work.category}: увеличить «${work.name}»`,
      exact: true,
    });
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("heading", { name: work.name, exact: true }),
    ).toBeVisible();
    await expect(dialog.locator("img")).toHaveAttribute("alt", work.photo.alt);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
  }
});

test("lightbox keyboard arrows stay within filter and prefill order", async ({
  page,
}) => {
  await page
    .getByRole("group", { name: "Фильтры работ" })
    .getByRole("button", { name: "День рождения", exact: true })
    .click();
  await page.locator(".work-photo").first().click();
  await expect(page.locator(".lightbox-top>span")).toHaveText(
    "1 / 6 · День рождения",
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".lightbox-top>span")).toHaveText(
    "6 / 6 · День рождения",
  );
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-top>span")).toHaveText(
    "1 / 6 · День рождения",
  );
  await page.getByRole("button", { name: "Следующая работа" }).click();
  await expect(page.locator("#lightbox-title")).toHaveText("Черничный вечер");
  await page.getByRole("link", { name: "Хочу похожий торт" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#order-occasion")).toHaveValue("birthday");
  await expect(page.locator("#order-filling")).toHaveValue("yogurt");
  await expect(page.locator(".chosen-cake")).toContainText("Черничный вечер");
});

test("bestsellers prefill order and preserve other entered details", async ({
  page,
}) => {
  await page.locator("#order-name").fill("Ирина");
  await page.locator("#order-comment").fill("Нужен небольшой торт");
  await page.locator("#order-date").fill(earliestDate());
  for (const cake of bestsellers) {
    await page
      .getByRole("link", { name: `Хочу такой: ${cake.name}`, exact: true })
      .click();
    await expect(page.locator("#order-occasion")).toHaveValue(cake.occasion);
    await expect(page.locator("#order-filling")).toHaveValue(cake.filling);
    await expect(page.locator(".chosen-cake")).toContainText(cake.name);
    await expect(page.locator("#order-name")).toHaveValue("Ирина");
    await expect(page.locator("#order-comment")).toHaveValue(
      "Нужен небольшой торт",
    );
    await expect(page.locator("#order-date")).toHaveValue(earliestDate());
  }
  await page.getByRole("button", { name: "Убрать выбранный пример" }).click();
  await expect(page.locator(".chosen-cake")).toHaveCount(0);
});

test("filling choices and help prefill without replacing occasion", async ({
  page,
}) => {
  await page.locator("#order-occasion").selectOption("wedding");
  for (const filling of fillings) {
    await page
      .getByRole("link", {
        name: `Выбрать начинку: ${filling.name}`,
        exact: true,
      })
      .click();
    await expect(page.locator("#order-filling")).toHaveValue(filling.id);
    await expect(page.locator("#order-occasion")).toHaveValue("wedding");
  }
  await page.getByRole("link", { name: "Помочь выбрать" }).click();
  await expect(page.locator("#order-filling")).toHaveValue("help");
});

test("empty order validates all required fields and focuses first error", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Получить расчёт" }).click();
  await expect(page.locator(".order-form [aria-invalid=true]")).toHaveCount(6);
  await expect(page.locator("#order-name")).toBeFocused();
  await expect(page.locator("#order-comment")).not.toHaveAttribute("required");
  await expect(page.locator("#order-file")).not.toHaveAttribute("required");
});

async function fillOrder(page: Page) {
  await page.locator("#order-name").fill("Ирина");
  await page.locator("#order-phone").fill("+7 (999) 123-45-67");
  await page.locator("#order-occasion").selectOption("birthday");
  await page.locator("#order-date").fill(earliestDate());
  await page.locator("#order-guests").fill("10 гостей");
  await page.locator("#order-filling").selectOption("honey");
}

test("phone, date and guest validation rejects invalid values", async ({
  page,
}) => {
  await fillOrder(page);
  await page.locator("#order-phone").fill("+1 123 456 7890");
  await page.locator("#order-date").fill("2020-01-01");
  await page.locator("#order-guests").fill("0 кг");
  await page.getByRole("button", { name: "Получить расчёт" }).click();
  await expect(page.locator(".order-form [aria-invalid=true]")).toHaveCount(3);
  await expect(page.locator("#order-phone")).toBeFocused();
  await page.locator("#order-phone").fill("8 999 123 45 67");
  await page.locator("#order-date").fill(earliestDate());
  await page.locator("#order-guests").fill("2,5 кг");
  await page.getByRole("button", { name: "Получить расчёт" }).click();
  await expect(page.locator(".form-success")).toBeVisible();
});

const imageBytes = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jf7sAAAAASUVORK5CYII=",
  "base64",
);
test("demo file input shows filename, wraps on mobile and removes file", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const filename =
    "очень-длинное-название-примера-оформления-праздничного-торта.png";
  await page.locator("#order-file").setInputFiles({
    name: filename,
    mimeType: "image/png",
    buffer: imageBytes,
  });
  await expect(page.locator(".filename")).toContainText(filename);
  await page.locator(".filename").scrollIntoViewIfNeeded();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".mobile-order")).toHaveCount(0);
  await page.getByRole("button", { name: "Удалить выбранный файл" }).click();
  await expect(page.locator(".filename")).toHaveCount(0);
  expect(
    await page
      .locator("#order-file")
      .evaluate((element: HTMLInputElement) => element.files?.length),
  ).toBe(0);
});

test("unsupported, empty and oversized files show errors and can be cleared", async ({
  page,
}) => {
  const input = page.locator("#order-file");
  await input.setInputFiles({
    name: "document.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("example"),
  });
  await expect(page.locator("#error-file")).toContainText("JPG, PNG или WebP");
  await input.setInputFiles({
    name: "empty.png",
    mimeType: "image/png",
    buffer: Buffer.alloc(0),
  });
  await expect(page.locator("#error-file")).toContainText("Файл пустой");
  await input.setInputFiles({
    name: "large.png",
    mimeType: "image/png",
    buffer: Buffer.alloc(10 * 1024 * 1024 + 1),
  });
  await expect(page.locator("#error-file")).toContainText("10 МБ");
  await expect(page.locator(".filename")).toHaveCount(0);
  await fillOrder(page);
  await page.getByRole("button", { name: "Получить расчёт" }).click();
  await expect(page.locator("#order-file")).toBeFocused();
  await page.getByRole("button", { name: "Продолжить без файла" }).click();
  await page.getByRole("button", { name: "Получить расчёт" }).click();
  await expect(page.locator(".form-success")).toBeVisible();
});

test("successful demo clears fields and file without transmitting or storing data", async ({
  page,
}) => {
  await fillOrder(page);
  await page.locator("#order-comment").fill("Только демонстрационные данные");
  const requests: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() !== "GET" ||
      ["fetch", "xhr", "ping", "websocket"].includes(request.resourceType())
    )
      requests.push(request.url());
  });
  await page.locator("#order-file").setInputFiles({
    name: "example.png",
    mimeType: "image/png",
    buffer: imageBytes,
  });
  await page.getByRole("button", { name: "Получить расчёт" }).click();
  await expect(page.locator(".form-success")).toContainText(
    "Спасибо! Это демонстрационная форма учебного проекта — заявка никуда не отправлена.",
  );
  await expect(page.locator(".form-success")).toBeFocused();
  expect(requests).toEqual([]);
  expect(
    await page.evaluate(() => [
      localStorage.length,
      sessionStorage.length,
      document.cookie,
    ]),
  ).toEqual([0, 0, ""]);
  await page.getByRole("button", { name: "Заполнить ещё раз" }).click();
  for (const name of [
    "name",
    "phone",
    "occasion",
    "date",
    "guests",
    "filling",
    "comment",
  ])
    await expect(page.locator(`#order-${name}`)).toHaveValue("");
  await expect(page.locator("#order-name")).toBeFocused();
  expect(
    await page
      .locator("#order-file")
      .evaluate((element: HTMLInputElement) => element.files?.length),
  ).toBe(0);
});

test("FAQ works with keyboard and exposes allergen information", async ({
  page,
}) => {
  const details = page.locator(".faq-list details");
  await expect(details).toHaveCount(6);
  for (const item of await details.all()) {
    await item.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(item.locator("p")).toBeVisible();
    await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
  }
  await expect(details.last()).toContainText(
    "следы аллергенов исключить нельзя",
  );
  await page.keyboard.press("Space");
  await expect(page.locator(".faq-list details[open]")).toHaveCount(0);
});

test("messenger buttons open demo notice with no external navigation", async ({
  page,
  context,
}) => {
  for (const messenger of ["Telegram", "WhatsApp"]) {
    const opener = page.getByRole("button", {
      name: `Написать в ${messenger}`,
    });
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Реальный аккаунт не подключён");
    expect(context.pages()).toHaveLength(1);
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
  }
  await page.getByRole("button", { name: "Написать в Telegram" }).click();
  await page.getByRole("link", { name: "Попробовать форму" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/#order$/);
});

test("internal links are valid and fictional content is disclosed", async ({
  page,
}) => {
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")!),
    ))
    await expect(page.locator(href)).toHaveCount(1);
  await expect(page.locator(".footer-bottom")).toContainText(disclaimer);
  await expect(page.locator('a[href^="http"]')).toHaveCount(0);
});

for (const width of [390, 1440])
  test(`accessibility at ${width}px, form errors and lightbox`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.getByRole("button", { name: "Получить расчёт" }).click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.locator(".work-photo").first().click();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });

test("reduced motion keeps content visible and disables smooth scrolling", async ({
  page,
}) => {
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await expect(page.locator(".section-heading").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator(".reveal-ready")).toHaveCount(0);
});
