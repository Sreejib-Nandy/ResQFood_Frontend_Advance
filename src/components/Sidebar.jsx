import { useState } from 'react'
import { Hamburger, BaggageClaim, Sparkle, MenuIcon, XIcon, LineChart } from 'lucide-react'
import upload from "../assets/upload_area.png";
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

const Sidebar = () => {
    const [isOpen, setisOpen] = useState(false);
    const { user } = useAuth();

    const adminLinks = [
        { name: 'Create Food', pathname: '/restaurant/dashboard/create-food', icon: Hamburger },
        { name: 'Claim Handle', pathname: '/restaurant/dashboard/claim-handle', icon: BaggageClaim },
        { name: 'Impacts', pathname: '/restaurant/dashboard/impacts', icon: Sparkle },
        { name: 'Analytics & CSR', pathname: '/restaurant/dashboard/analytics-csr', icon: LineChart }
    ]

    return (
        <>
            <div>
                {isOpen ? (
                    <XIcon
                        className='w-8 h-8 md:hidden fixed top-5 left-5 sm:top-6 z-50 text-white'
                        onClick={() => setisOpen(false)}
                    />
                ) : (
                    <MenuIcon
                        className='w-8 h-8 md:hidden fixed top-5 left-5 sm:top-6 z-50 text-white'
                        onClick={() => setisOpen(true)}
                    />
                )}
                <div
                    className={`fixed top-18 left-0 flex flex-col h-[calc(100vh-72px)] items-center pt-6 bg-[#ccff33]/34 max-md:backdrop-blur-xl max-w-60 w-full border-r border-gray-300/30 text-lg max-md:text-md z-40 transition-all duration-300 overflow-hidden ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}
                >
                    <img src={user.image == null ? upload : user.image} alt="User" className='w-14 h-14 md:h-20 md:w-20 rounded-full mx-20' />
                    <p className='py-2 text-base font-medium max-md:hidden'>{user?.name}</p>
                    <div className='w-full'>
                        {adminLinks.map((link, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={link.pathname}
                                    onClick={() => setisOpen(false)}
                                    className={({ isActive }) =>
                                        `relative flex items-center max-md:justify-center gap-2 w-full py-3 md:pl-10 first:mt-4 ${isActive ? 'bg-[#ccff33]/70' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <link.icon className='w-5 h-5 max-md:w-4 max-md:h-4' />
                                            <p className='text-sm'>{link.name}</p>
                                            <span
                                                className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive ? 'bg-[#4b7505]' : ''
                                                    }`}
                                            />
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
