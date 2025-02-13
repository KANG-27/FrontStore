import { useEffect, useState } from "react";
import { fetchData } from "../api/api";

interface Producto {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

function Content() {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const getProductos = async () => {
      const data = await fetchData("http://localhost:3000/product");
      if (data) {
        setProductos(data);
        setLoading(false);
      }
    };
    getProductos();
  }, []);

  async function agregarCarrito(productoId: number) {
    const getProductos = async () => {
      const data = await fetchData(`http://localhost:3000/cart/${productoId}`);
      console.log(data);
    };
    getProductos();
  }

  return (
    <div className="w-full mt-20 px-20">
      ¿Que te gustaria adquirir el dia de hoy?
      {loading && productos.length != 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-10">
          {productos.map((producto) => (
            <div className="flex flex-col justify-between text-black bg-white border-2 border-black rounded-lg">
              <div className="flex justify-center items-center h-[60%]">
                <img
                  src={producto.imagen}
                  alt=""
                  width={200}
                  className="h-100px"
                />
              </div>
              <div className="flex flex-col justify-between p-5 gap-2">
                <h2>{producto.titulo}</h2>
                <span>{producto.descripcion}</span>
                <span>{producto.precio}</span>
                <button
                  className="text-white"
                  onClick={async () => await agregarCarrito(producto.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Content;
