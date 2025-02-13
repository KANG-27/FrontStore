function Header() {
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
          <span className="material-icons">shopping_cart</span>

        </li>
      </ul>
    </nav>
  );
}

export default Header;
