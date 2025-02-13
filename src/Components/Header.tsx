
import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

function Header() {
  // const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const getProductos = async () => {
      const data = await fetchData("http://localhost:3000/cart");
      if (data) {
        setProductos(data);
        // setLoading(false);
      }
    };
    getProductos();
  }, []);

  return (
    <nav className="w-full px-20 py-10 bg-gray-200 text-black">
      <ul className="flex justify-between">
        <li>Home</li>
        <li>Products</li>
        <li>
          <label htmlFor="">
            <input type="text" className="border-2 border-black rounded-sm" />
          </label>
        </li>
        <li>About Us</li>
        <li>
          <div className="relative">
            {productos.length > 0 && (
              <div className="absolute bg-white top-[-10px] rounded-full flex justify-center p-1 px-2 text-[10px] right-[-7px]">
                {productos.length}
              </div>
            )}
            <span className="material-icons !text-[30px]">shopping_cart</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
