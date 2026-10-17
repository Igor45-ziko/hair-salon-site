import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`Автоматическая доступность, включая галерею и ошибки формы: ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await page.getByRole("button", { name: "Оставить заявку" }).click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page
      .getByRole("button", { name: "Увеличить фото: Тихое утро в номере" })
      .click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}
