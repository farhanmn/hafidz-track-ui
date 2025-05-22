import type {Metadata} from "next";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brands: string;
  sku: string;
  weight: number;
  dimensions: object;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: object[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: object;
  images: string[];
  thumbnail: string;
}

export const metadata: Metadata = {
  title: "Homepage",
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=30');
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4 text-blue-600">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h2 className="font-bold text-lg mb-1 text-blue-500">{product.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}