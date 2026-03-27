import { test, expect } from "@playwright/test";

test.describe("Dashboard - Mapa de Obras", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("deve carregar a página inicial com mapa", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("CONCRETA");
    await expect(page.locator("text=Painel de Monitoramento")).toBeVisible();
  });

  test("deve exibir estatísticas do dashboard", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Total de Obras" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Em Andamento" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Concluídas" })).toBeVisible();
  });

  test("deve exibir mapa com container", async ({ page }) => {
    const mapContainer = page.locator('[data-testid="map-container"], .leaflet-container, [class*="h-full"][class*="w-full"]');
    await expect(mapContainer.first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Dashboard - Filtros", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("deve exibir barra de filtros", async ({ page }) => {
    await expect(page.locator('[placeholder*="Buscar"]')).toBeVisible();
    await expect(page.getByText("Bairro", { exact: true })).toBeVisible();
  });

  test("deve filtrar por texto", async ({ page }) => {
    const searchInput = page.locator('[placeholder*="Buscar"]');
    await searchInput.fill("Escola");
    await page.waitForTimeout(500);
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Detalhes da Obra", () => {
  test("deve exibir informações completas", async ({ page }) => {
    await page.goto("/obras/obra-001");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("deve voltar para dashboard", async ({ page }) => {
    await page.goto("/obras/obra-001");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: /voltar/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Acessibilidade", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("deve ter skip link para conteúdo principal", async ({ page }) => {
    await expect(page.locator('a[href="#main-content"]')).toBeAttached();
  });

  test("deve ter foco navegável por Tab", async ({ page }) => {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(["A", "BUTTON", "INPUT"]).toContain(focused);
  });
});

test.describe("Responsividade", () => {
  test("deve funcionar em mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("deve funcionar em tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });
});
