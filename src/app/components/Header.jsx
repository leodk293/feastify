import React from 'react'
import Logo from './logo/Logo'
import Link from 'next/link'
import Media from './medias/Media'
import { signIn, signOut, auth } from '../auth'
import Image from 'next/image'

const Header = async () => {
    const session = await auth().catch(err => {
        console.error("Session retrieval error:", err);
        return null; // Fallback if session retrieval fails
    });


    return (
        <header className=' border border-transparent py-5 bg-[#ffa60008] shadow flex flex-col gap-7 items-center md:flex-row md:justify-evenly md:gap-0'>
            <Link className=' self-center' href={'/'}>
                <Logo />
            </Link>

            <div className=' self-center'>
                <Media />
            </div>

            <div className=' flex flex-wrap self-center justify-center gap-8'>
                <div className='self-center flex flex-row gap-3'>
                    <Link
                        href={'/home'}
                    >
                        <h1 className=' text-2xl font-semibold hover:text-orange-700 duration-200'>Home</h1>
                    </Link>
                    <Link
                        className=' self-center text-2xl font-semibold hover:text-orange-700 duration-200'
                        href={'/contact'}
                    >
                        Contact
                    </Link>
                </div>

                {!session?.user
                    ?
                    <div className=' flex flex-wrap gap-2 justify-center self-center'>
                        <form
                            action={async () => {
                                "use server"
                                await signIn('google')
                            }}
                            className=' self-center' >
                            <button
                                className=' border border-transparent text-[18px] font-semibold bg-red-800 text-white px-5 py-2 rounded-[5px] hover:bg-red-500 duration-200'
                            >
                                Signin with google
                            </button>
                        </form>

                        <p className=' text-xl self-center font-bold text-red-700'>Signin to leave a comment</p>
                    </div>
                    :
                    <div className=' flex flex-wrap justify-center gap-2 self-center'>
                        <Image
                            src={session.user?.image}
                            alt={session.user?.name}
                            width={35}
                            height={25}
                            className=' self-center object-cover rounded-[50%]'
                        />
                        <p className=' self-center text-xl font-bold'>{session.user?.name}</p>

                        <form
                            action={async () => {
                                "use server"
                                await signOut()
                            }}
                        >
                            <button
                                className=' border border-transparent text-[18px] font-semibold bg-blue-800 text-white px-5 py-2 rounded-[5px] hover:bg-blue-500 duration-200'
                            >
                                Signout
                            </button>
                        </form>

                        <button className=' self-center border border-transparent bg-red-800 rounded-[5px] px-5 py-2 text-white hover:bg-red-900 duration-200'>
                            <Link className=' font-bold text-[18px]' href={'/'}>
                                Leave a comment
                            </Link>
                        </button>
                    </div>

                }
            </div>

        </header>
    )
}

export default Header