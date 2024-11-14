import React from 'react'
import Logo from './logo/Logo'
import Link from 'next/link'
import Media from './medias/Media'
import { signIn, signOut, auth } from '../auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { db } from '../../db'
import { usersTable } from '../../db/schema'
import { eq } from 'drizzle-orm'

const Header = async () => {

    const session = await auth().catch(err => {
        console.error("Session retrieval error:", err);
        return null;
    });

    async function storeUserIfNew() {
        if (session?.user) {
            const { name, email } = session.user;

            const existingUser = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .get();

            if (!existingUser) {
                await db.insert(usersTable).values({ name, email });
            }
        }
    }

    async function getAllUsers() {
        const users = await db.select().from(usersTable);
        return users;
    }

    const users = await getAllUsers();
    //console.log(users);

    if (session) {
        await storeUserIfNew();
    }

    return (
        <header className=' border border-transparent py-5 bg-[#ffa60008] shadow flex flex-col gap-7 items-center md:flex-row md:justify-evenly md:gap-0'>
            <Link className=' self-center' href={'/'}>
                <Logo />
            </Link>

            <div className=' self-center'>
                <Media />
            </div>

            <div className=' flex flex-wrap self-center justify-center gap-8'>
                <div className='self-center flex flex-row gap-5'>

                    <Link
                        className=' self-center text-xl font-bold hover:text-orange-700 duration-200 md:text-2xl'
                        href={'/'}
                    >
                        Home
                    </Link>
                    <Link
                        href={'/explore'}
                    >
                        <h1 className=' text-xl font-bold hover:text-orange-700 duration-200 md:text-2xl'>Explore</h1>
                    </Link>
                    <Link
                        className=' self-center text-xl font-bold hover:text-orange-700 duration-200 md:text-2xl'
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

                        <p className=' self-center text-[15px] font-bold text-center text-red-700'>Signin to leave<br /> a comment</p>
                    </div>
                    :
                    <div className=' flex flex-wrap justify-center gap-2 self-center'>

                        <Link href={'/create-comment'}>
                            <button className=' self-center font-bold text-[18px] border border-transparent bg-orange-800 rounded-[5px] px-5 py-2 text-white hover:bg-orange-600 duration-200'>
                                Leave a comment
                            </button>
                        </Link>

                        <form
                            action={async () => {
                                "use server"
                                await signOut()
                                redirect('/')
                            }}
                        >
                            <button
                                className=' border border-transparent text-[18px] font-semibold bg-blue-800 text-white px-5 py-2 rounded-[5px] hover:bg-blue-500 duration-200'
                            >
                                Signout
                            </button>
                        </form>

                        <div className=' flex flex-wrap gap-2 md:gap-0'>
                            <Image
                                src={session.user?.image}
                                alt={session.user?.name}
                                width={35}
                                height={25}
                                className=' self-center object-cover rounded-[50%]'
                            />
                            <p className=' self-center text-[15px] text-center font-bold md:w-[100px]'>{session.user?.name}</p>
                        </div>

                    </div>
                }
            </div>

        </header>
    )
}

export default Header