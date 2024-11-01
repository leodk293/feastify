'use client';
import React from 'react'
import Link from 'next/link';
import { nanoid } from 'nanoid';


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    const letterTab = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    return (
        <footer className=' border border-transparent mt-[80px] bg-[#ffa60008] px-3 shadow py-5 flex flex-col items-center gap-5 relative bottom-0 w-full md:px-0'>
            <div className=' flex flex-col gap-2'>
                <h1 className=' font-bold text-xl'>Browse By Name</h1>
                <div className=' flex flex-wrap gap-2'>
                    {letterTab.map((letter) => (
                        <Link
                            className=' font-bold text-xl border border-transparent px-2 text-orange-950 rounded-[5px] bg-orange-200'
                            key={nanoid(10)}
                            href={'/'}
                        >
                            {letter}
                        </Link>
                    ))}
                </div>
            </div>

            <div className=' hidden mt-5 w-[60rem] h-[1px] bg-red-950 rounded-[10px] md:block'></div>

            <div className=' font-semibold flex flex-wrap text-xl mt-5 gap-5 md:gap-[80px]'>
                <p className=' self-center'>© {year} <span className=' font-extrabold'>Feastify</span>, All rights reserved</p>


                <div className=' flex flex-row gap-5'>
                    <Link href={'/'}>Linkedin</Link>
                    <Link href={'/'}>Facebook</Link>
                    <Link href={'/'}>Twitter</Link>
                </div>


                <div className=' self-center flex flex-row gap-5'>
                    <Link href={'/'}>Contact</Link>
                    <Link href={'/'}>About</Link>
                </div>


            </div>


        </footer>
    )
}

export default Footer