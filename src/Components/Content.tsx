import { useEffect, useState } from "react";

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
    //LLamado api
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const data: Producto[] = await response.json();

        setProductos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function agregarCarrito(productoId: number) {
    try {
      const response = await fetch(`http://localhost:3000/cart/${productoId}`);
      const data: Producto[] = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
