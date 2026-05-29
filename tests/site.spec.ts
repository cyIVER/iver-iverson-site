import { expect, test } from "@playwright/test";

const pages = ["/", "/work", "/writing", "/about", "/resume", "/archive"];

test.describe("static portfolio", () => {
  for (const route of pages) {
    test(`loads ${route} without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });
      await page.goto(route);
      await expect(page.locator("body")).toContainText("Iver Iverson");
      await expect(page.locator("main")).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("archive filtering works without a server runtime", async ({ page }) => {
    await page.goto("/archive");
    await page.getByRole("button", { name: /Cyber education/ }).click();
    await expect(page.getByRole("link", { name: /DCO 450/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Hunter-7/ })).toHaveCount(0);
  });

  test("resume timeline expands and downloads are linked", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("link", { name: "PDF" })).toHaveAttribute("href", /iver-iverson-resume\.pdf/);
    await page.getByRole("button", { name: /Course platform/ }).click();
    await expect(page.getByText(/DCO 450 and DCO 550/)).toBeVisible();
  });

  test("case study pages expose architecture diagrams", async ({ page }) => {
    await page.goto("/work/hunter-7");
    await expect(page.getByLabel("Project architecture diagram")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Problem" })).toBeVisible();
  });
});
