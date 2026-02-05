import client from "./api_client";

class AssetsService {
  async fetchAssets(params) {

    /*
    For API call

    try {
      const result = await client.get("/assets", {
        params,
      });
      return result.data;
    } catch (error) {
      console.error("Failed to fetch assets from API", error);
      throw error;
    }
    */

    // I made this one depend on mock data because , 
    // I was not able to fetch data from API So I was getting plane UI 
    // and can't able to see the how the table will looks (-_-)

    return Promise.resolve({
      "node-1": {
        type: "Node",
        totalCost: 123.45,
      },
      "node-2": {
        type: "Node",
        totalCost: 98.12,
      },
      "disk-1": {
        type: "Disk",
        totalCost: 45.67,
      },
      "network-1": {
        type: "Network",
        totalCost: 32.89,
      }
    });
  }
}

export default new AssetsService();
