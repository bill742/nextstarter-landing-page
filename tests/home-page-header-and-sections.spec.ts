import { expect, test } from "@playwright/test";

test.describe("Home page header and navigation", () => {
  test("Verify header, h1 tag, and navigation are readable", async ({
    page,
  }) => {
    await page.goto("./");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    const h1 = await page.locator("h1").textContent();
    expect(h1?.trim()).toBe(
      "NextStarter - A boilerplate for creating NextJS projects with TypeScript and Tailwind."
    );

    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
    // nav.locator("button").first().click();

    // await nav.getByRole("listitem").filter({ hasText: "Tech Stack" }).click();
  });
});

test.describe("Home page sections", () => {
  test("Verify home page sections display correct data.", async ({ page }) => {
    const aboutSection = page.locator("section#about");
    const aboutH2 = aboutSection.locator("h2").first();
    expect(await aboutH2.textContent()).toBe("About NextStarter");
  });
});
