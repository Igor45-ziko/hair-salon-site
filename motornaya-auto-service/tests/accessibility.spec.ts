import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`Автоматическая проверка доступности: ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.getByRole("button", { name: "Построить маршрут" }).click();
    const dialogResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(dialogResults.violations).toEqual([]);
  });
}
