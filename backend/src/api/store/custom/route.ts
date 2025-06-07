import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const storeModuleService = req.scope.resolve(Modules.STORE);
  
  try {
    const stores = await storeModuleService.listStores();
    const store = stores[0]; // Get the first (default) store
      res.json({
      store: {
        id: store.id,
        name: store.name,
        supported_currencies: store.supported_currencies,
      }
    });
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ error: "Failed to fetch store information" });
  }
}

