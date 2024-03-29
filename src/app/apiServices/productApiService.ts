import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/definer";
import { ProductSearchObj, SearchObj } from "../../types/others";
import { Product } from "../../types/product";

class ProductApiService {
  private readonly path: string;
  constructor() {
    this.path = serverApi;
  }

  async getTrendProducts(data: SearchObj): Promise<Product[]> {
    try {
      const url = `/products?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.get(this.path + url, { withCredentials: true });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const best_products: Product[] = result.data.data;
      return best_products;
    } catch (err: any) {
      console.log(`ERROR >>> getBestProducts ${err.message}`);
      throw err;
    }
  }

  async getSaleProducts(data: ProductSearchObj): Promise<Product[]> {
    try {
      const url = `/products?order=${data.order}&page=${data.page}&limit=${data.limit}`,
        result = await axios.post(this.path + url, data, {
          withCredentials: true,
        });
      assert.ok(result, Definer.general_err1);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const products: Product[] = result.data.data;
      return products;
    } catch (err: any) {
      console.log(`ERROR >>> getTargetProducts ${err.message}`);
      throw err;
    }
  }

  async getChosenProduct(dish_id: string): Promise<Product> {
    try {
      const url = `/products/${dish_id}`,
        result = await axios.get(this.path + url, {
          withCredentials: true,
        });
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state !== "fail", result?.data?.message);
      console.log("state>>>", result.data.state);

      const product: Product = result.data.data;
      return product;
    } catch (err: any) {
      console.log(`ERROR >>> getChosenDish ${err.message}`);
      throw err;
    }
  }
}

export default ProductApiService;
