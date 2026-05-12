import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import ShopClient from "../../components/shop/shop-client";

import { getProducts } from "@/lib/get-products";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />

      <ShopClient products={products} />

      <Footer />
    </>
  );
}