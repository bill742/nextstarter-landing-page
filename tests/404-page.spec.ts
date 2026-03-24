import { expect, test } from "@playwright/test";

test.describe("404 page", () => {
  test("Verify 404 page is displayed for non-existent routes", async ({
    page,
  }) => {
    await page.goto("/non-existent-route");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    const h2 = await page.locator("h2").textContent();
    expect(h2?.trim()).toBe("404 - Not Found");
  });
});
