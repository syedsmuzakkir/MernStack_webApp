import Image from "next/image";
import ProductForm from "./components/ProductForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
     <ProductForm/>
    </main>
  );
}
