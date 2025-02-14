import { useEffect, useState } from "react";
import { fetchData } from "../api/api";
import Presupuesto from "./Presupuesto";

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
  const [modal, setModal] = useState(false);
  const [presupuesto, setPresupuesto] = useState(false);
  const [listPresupuesto, setListPresupuesto] = useState(false);
  const [price, setPrice] = useState();

  const carritoCantidad =
    JSON.parse(localStorage.getItem("carritoCantidad")) || 0;

  useEffect(() => {
    const getProductos = async () => {
      const data = await fetchData("http://localhost:3000/cart");
      if (data) {
        setProductos(data);
        localStorage.setItem("carritoCantidad", JSON.stringify(data.length));
        // setLoading(false);
      }
    };
    getProductos();
  }, []);

  function findBestCombination(price: string) {
    const getProduct = async () => {
      const data = await fetchData(`http://localhost:3000/budget/${price}`);
      if (data) {
        setListPresupuesto(data);
      }
    };
    getProduct();
  }

  console.log(listPresupuesto);

  return (
    <>
      <nav className="w-full px-20 py-10 bg-gray-200 text-black">
        <ul className="flex justify-between">
          <li>Home</li>
          <li>Products</li>
          <li>
            <label htmlFor="">
              <input type="text" className="border-2 border-black rounded-sm" />
            </label>
          </li>
          <li
            className="cursor-pointer"
            onClick={async () => await setPresupuesto(true)}
          >
            Presupuesto
          </li>
          <li className="cursor-pointer">
            <div className="relative">
              {carritoCantidad > 0 && (
                <div className="absolute bg-white top-[-10px] rounded-full flex justify-center p-1 px-2 text-[10px] right-[-7px]">
                  {carritoCantidad}
                </div>
              )}
              <span
                className="material-icons !text-[30px]"
                onClick={async () => await setModal(true)}
              >
                shopping_cart
              </span>
            </div>
          </li>
        </ul>
      </nav>
      {presupuesto && (
        <>
          <div className="flex flex-col items-center w-auto px-20 py-5 mt-20 border-2 border-white rounded-lg gap-5">
            <h2>¿Cual es tu presupuesto?</h2>
            <div className="flex flex-col gap-5">
              <label htmlFor="">
                Total
                <input
                  type="text"
                  className="border-2 border-white ml-2 pl-2 rounded-lg"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <button onClick={async () => await findBestCombination(price)}>
                Buscar
              </button>
            </div>
          </div>
          {listPresupuesto && (
            <div className="grid grid-cols-4 gap-4 mt-10">
              {listPresupuesto.map((producto) => (
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
                      // onClick={async () => await agregarCarrito(producto.id)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {modal && (
        <div className="fixed overflow-x-auto scroll-x flex justify-center items-center w-screen h-screen bg-black/80 rounded-sm">
          <div className="flex bg-white w-[50%] flex flex-col text-black px-5 pb-10 absolute top-[20vh]">
            <div className="flex justify-between">
              <span className="text-[30px] mt-10">Carrito</span>
              <span
                className="text-[30px] cursor-pointer"
                onClick={async () => await setModal(false)}
              >
                x
              </span>
            </div>
            <div className="mt-5">
              {productos.map((product) => (
                <div className="flex">
                  <img
                    src={product.imagen}
                    alt=""
                    width={200}
                    className="h-[200px]"
                  />
                  <div className="flex flex-col justify-between">
                    <h2>{product.titulo}</h2>
                    <h2>{product.descripcion}</h2>
                    <h2 className="text-center">{product.precio}</h2>
                    <button className="text-white">comprar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
