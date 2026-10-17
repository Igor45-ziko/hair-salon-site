import { test, expect, type Page } from "@playwright/test";
import { nextDay, todayInMoscow } from "../src/booking";

const arrival = nextDay(todayInMoscow());
const departure = nextDay(arrival);

async function fillValid(page: Page) {
  await page.getByLabel("Ваше имя").fill("Тестовый гость");
  await page.getByLabel("Телефон", { exact: false }).fill("+7 (999) 123-45-67");
  await page.getByLabel("Дата заезда").fill(arrival);
  await page.getByLabel("Дата выезда").fill(departure);
  await page.getByLabel("Количество гостей").selectOption("2");
  await page.getByLabel("Категория номера").selectOption("comfort");
}

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`Отображение и изображения на ширине ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Спокойное место",
    );
    await expect(page.locator(".room-card")).toHaveCount(3);
    await expect(page.locator(".gallery-item")).toHaveCount(6);
    for (const section of ["#rooms", "#about", "#gallery"])
      await page.locator(section).scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("main img")
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
    const overflow = await page.evaluate(() =>
      Array.from(document.querySelectorAll("body *"))
        .filter((element) => {
          if (element.closest(".photo, .location-map, .skip-link"))
            return false;
          const rect = element.getBoundingClientRect();
          return (
            rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1)
          );
        })
        .map((element) => `${element.tagName}.${element.className}`),
    );
    expect(overflow).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `test-results/hotel-${width}.png`,
      fullPage: true,
    });
  });
}

test("Мобильное меню: фокус, Escape, переход и смена ширины", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Открыть меню" });
  await trigger.click();
  const nav = page.getByRole("navigation", { name: "Мобильная навигация" });
  await expect(
    nav.getByRole("link", { name: "Номера", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Закрыть меню" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(nav.getByRole("link", { name: "Забронировать" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await nav.getByRole("link", { name: "Удобства" }).click();
  await expect(page).toHaveURL(/#amenities$/);
  await expect(nav).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 950 });
  await expect(nav).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("FAQ открывается и закрывается с клавиатуры", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("details")).toHaveCount(5);
  const first = page.locator("details").first();
  await first.locator("summary").click();
  await expect(first.locator("p")).toBeVisible();
  const second = page.locator("details").nth(1);
  await second.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(second).toHaveAttribute("open", "");
  await expect(first).not.toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(second).not.toHaveAttribute("open", "");
});

test("Все фотографии увеличиваются, стрелки и Escape работают", async ({
  page,
}) => {
  await page.goto("/");
  const photos = page.locator(".gallery-item");
  for (let i = 0; i < 6; i++) {
    await photos.nth(i).click();
    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await expect(modal.locator(".lightbox-bottom")).toContainText(
      `${i + 1} / 6`,
    );
    await expect
      .poll(() =>
        modal
          .locator("img")
          .evaluate(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
      )
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect(photos.nth(i)).toBeFocused();
  }
  await photos.first().click();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("dialog")).toContainText("6 / 6");
  await page.getByRole("button", { name: "Следующее фото" }).click();
  await expect(page.getByRole("dialog")).toContainText("1 / 6");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toContainText("2 / 6");
  await page.getByRole("button", { name: "Закрыть фотографию" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});

test("Карточки выбирают категорию, сохраняя введённые даты", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Забронировать номер Стандарт" })
    .click();
  await expect(page.getByLabel("Категория номера")).toHaveValue("standard");
  await page.getByLabel("Дата заезда").fill(arrival);
  await page
    .getByRole("link", { name: "Забронировать номер Семейный" })
    .click();
  await expect(page.getByLabel("Категория номера")).toHaveValue("family");
  await expect(page.getByLabel("Дата заезда")).toHaveValue(arrival);
});

test("Проверка обязательных полей и телефона", async ({ page }) => {
  await page.goto("/");
  const submit = page.getByRole("button", { name: "Оставить заявку" });
  await submit.click();
  await expect(page.locator(".field-error")).toHaveCount(5);
  await expect(page.getByLabel("Ваше имя")).toBeFocused();
  await fillValid(page);
  await page.getByLabel("Телефон", { exact: false }).fill("123");
  await submit.click();
  await expect(
    page.getByText("Введите 11 цифр номера, начиная с +7 или 8."),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("Дата в прошлом, одинаковые даты и выезд до заезда отклоняются", async ({
  page,
}) => {
  await page.goto("/");
  await fillValid(page);
  const submit = page.getByRole("button", { name: "Оставить заявку" });
  await page.getByLabel("Дата заезда").fill("2020-01-01");
  await submit.click();
  await expect(
    page.getByText("Дата заезда не может быть в прошлом."),
  ).toBeVisible();
  await page.getByLabel("Дата заезда").fill(arrival);
  await page.getByLabel("Дата выезда").fill(arrival);
  await submit.click();
  await expect(
    page.getByText("Выезд должен быть позже заезда хотя бы на день."),
  ).toBeVisible();
  await page.getByLabel("Дата выезда").fill(todayInMoscow());
  await submit.click();
  await expect(
    page.getByText("Выезд должен быть позже заезда хотя бы на день."),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("Вместимость номера учитывается при выборе трёх гостей", async ({
  page,
}) => {
  await page.goto("/");
  await fillValid(page);
  await page.getByLabel("Количество гостей").selectOption("3");
  await page.getByRole("button", { name: "Оставить заявку" }).click();
  await expect(
    page.getByText("Для трёх гостей выберите семейный номер."),
  ).toBeVisible();
  await page.getByLabel("Категория номера").selectOption("family");
  await page.getByRole("button", { name: "Оставить заявку" }).click();
  await expect(page.getByRole("status")).toBeVisible();
});

test("Успешная демонстрация не отправляет и не сохраняет данные", async ({
  page,
}) => {
  await page.goto("/");
  await fillValid(page);
  const requests: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() !== "GET" ||
      new URL(request.url()).hostname !== "127.0.0.1"
    )
      requests.push(request.url());
  });
  await page.getByRole("button", { name: "Оставить заявку" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Демонстрация завершена.Заявка не отправлена.",
  );
  await expect(page.getByRole("status")).toBeFocused();
  expect(requests).toEqual([]);
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookie: document.cookie,
    })),
  ).toEqual({ local: 0, session: 0, cookie: "" });
  await page.getByRole("button", { name: "Заполнить ещё раз" }).click();
  await expect(page.getByLabel("Ваше имя")).toHaveValue("");
  await expect(page.getByLabel("Ваше имя")).toBeFocused();
  await expect(page.getByLabel("Телефон", { exact: false })).toHaveValue("");
  await expect(page.getByLabel("Дата заезда")).toHaveValue("");
  await expect(page.getByLabel("Дата выезда")).toHaveValue("");
  await expect(page.getByLabel("Категория номера")).toHaveValue("");
  await page.getByRole("link", { name: "Забронировать номер Комфорт" }).click();
  await expect(page.getByLabel("Категория номера")).toHaveValue("comfort");
});

test("Маршрут и звонок показывают честную демонстрацию", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Построить маршрут" }).click();
  await expect(page.getByRole("dialog")).toContainText(
    "Реальный маршрут построить нельзя",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Построить маршрут" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Позвонить", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Звонок не совершается");
  await page.getByRole("button", { name: "Понятно" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("Навигация ведёт к существующим разделам, дисклеймер присутствует", async ({
  page,
}) => {
  await page.goto("/");
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter(
          (link) =>
            !document.getElementById(link.getAttribute("href")!.slice(1)),
        )
        .map((link) => link.getAttribute("href")),
    );
  expect(broken).toEqual([]);
  await expect(page.locator("footer")).toContainText(
    "Учебный проект. Гостиница, цены, отзывы и контакты вымышлены. Форма бронирования демонстрационная.",
  );
});
