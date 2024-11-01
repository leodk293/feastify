import React from 'react'
import Logo from './logo/Logo'
import Link from 'next/link'
import Media from './medias/Media'

const Header = () => {
    return (
        <header className=' border border-transparent py-5 bg-[#ffa60008] shadow flex flex-col gap-7 items-center md:flex-row md:justify-evenly md:gap-0'>
            <Link href={'/'}>
                <Logo />
            </Link>

            <div className=' self-center'>
                <Media />
            </div>

            <div className=' flex flex-wrap justify-center gap-4'>
                <div className='self-center flex flex-row gap-2'>
                    <Link href={'/'}>
                        <h1 className=' text-2xl font-semibold'>Home</h1>
                    </Link>
                    <Link className=' self-center text-2xl font-semibold' href={'/'}>
                        Contact
                    </Link>
                </div>

                <form className=' self-center' action="">
                    <button className=' border border-transparent text-[18px] font-semibold bg-red-700 text-white px-5 py-2 rounded-[25px]'>
                        Signin with google
                    </button>
                </form>
            </div>

        </header>
    )
}

export default Header