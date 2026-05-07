import { Link } from 'react-router-dom'
import logo from "../assets/logo.png";

const RestaurantDashboardNavbar = () => {
  return (
    <div className='fixed w-full flex items-center px-15 sm:px-15 md:px-10 lg:px-16 py-2 max-md:py-4 text-white bg-blue-950/85'>
      <Link
        to="/"
        className="flex items-center outline-none focus:outline-none"
        onClick={() => {
          scrollTo(0, 0);
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="h-10 sm:h-12 lg:h-14 w-auto object-contain cursor-pointer"
        />
        <p className="text-4xl max-lg:text-3xl">
          Res
          <span
            className="text-[#ccff33]"
            style={{ fontFamily: '"Sekuya", system-ui', fontWeight: 700 }}
          >
            Q
          </span>
          Food
        </p>
      </Link>
    </div>
  )
}

export default RestaurantDashboardNavbar
