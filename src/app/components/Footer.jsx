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
        <footer
        style={{boxShadow:"0 -1px 2px #00000012"}}
            className=' border border-transparent mt-[80px] bg-[#ffa60008] px-3 py-5 flex flex-col items-center gap-5 relative bottom-0 w-full md:px-0'
        >
            <div className=' flex flex-col gap-2'>
                <h1 className=' font-bold text-xl'>Browse Meals By Name</h1>
                <div className=' flex flex-wrap gap-2'>
                    {letterTab.map((letter) => (
                        <Link
                            className=' font-bold text-xl border border-transparent px-2 text-orange-950 rounded-[5px] bg-orange-200 hover:translate-y-[-5px] duration-200'
                            key={nanoid(10)}
                            href={`/browse/${letter}`}
                        >
                            {letter}
                        </Link>
                    ))}
                </div>
            </div>

            <div className=' hidden mt-5 w-[60rem] h-[1px] bg-red-950 rounded-[10px] md:block'></div>

            <div className=' font-bold flex flex-wrap text-xl mt-5 gap-5 md:gap-[80px]'>
                <p className=' self-center'>© {year} <span className=' text-orange-950 font-extrabold'>Feastify</span>, All rights reserved</p>


                <div className=' flex font-bold flex-row gap-5'>
                    <Link target='_blank' href={'https://www.linkedin.com/in/aboubacar-traore-495736252/'}>Linkedin</Link>
                    <Link target='_blank' href={'https://www.facebook.com/profile.php?id=100092315485742'}>Facebook</Link>
                    <Link target='_blank' href={'https://x.com/Aboubac48530295'}>Twitter</Link>
                </div>


                <div className=' self-center font-bold flex flex-row gap-5'>
                    <Link href={'/contact'}>Contact</Link>
                    <Link href={'/about'}>About</Link>
                </div>


            </div>


        </footer>
    )
}

export default Footer