'use client';
import React from 'react'
import { useState } from 'react'
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Faq() {
    const [showRes1, setShowRes1] = useState(false);
    const [showRes2, setShowRes2] = useState(false);
    const [showRes3, setShowRes3] = useState(false);
    return (
        <main
            className=' flex flex-col border border-transparent w-auto shadow p-5 bg-orange-50 rounded-[5px] gap-3 md:w-[65rem]'
        >

            <div className=' flex flex-col gap-3 font-bold text-xl justify-between md:text-2xl'>
                <button
                    onClick={() => setShowRes1(!showRes1)}
                    className=' flex flex-row font-bold text-xl justify-between md:text-2xl'>
                    <h1>What&apos;s Featify</h1>
                    {!showRes1 ?
                        <ChevronDown size={28} strokeWidth={1.5} />
                        :
                        <ChevronUp size={28} strokeWidth={1.5} />
                    }
                </button>
                <p className={` ${!showRes1 ? 'hidden' : 'block'} font-semibold text-[16px] md:text-xl`}>Featify is a website where you will find out several recipes and tips according to your taste,
                    the fabulous place for the passionnate of cook
                </p>
            </div>

            <div className='  w-[20rem] h-[1px] bg-black md:w-[63rem]'></div>

            <div className=' flex flex-col gap-3 font-bold text-xl justify-between md:text-2xl'>
                <button
                    onClick={() => setShowRes2(!showRes2)}
                    className=' flex flex-row font-bold text-xl justify-between md:text-2xl'>
                    <h1>Who is the author of Feastify</h1>
                    {!showRes2 ?
                        <ChevronDown size={28} strokeWidth={1.5} />
                        :
                        <ChevronUp size={28} strokeWidth={1.5} />
                    }
                </button>
                <p className={` ${!showRes2 ? 'hidden' : 'block'} font-semibold text-[16px] md:text-xl`}>Featify has been coded by someone passionnate by computer science, animes, sport, videos games and cooking,
                    for any further informations, contact : <span className='font-extrabold'>aboubatraore04@gmail.com</span> or click here : <Link className=' font-bold' href={'/contact'}>contact</Link>
                </p>
            </div>

            <div className='  w-[20rem] h-[1px] bg-black md:w-[63rem]'></div>

            <div className=' flex flex-col gap-3 font-bold text-xl justify-between md:text-2xl'>
                <button
                    onClick={() => setShowRes3(!showRes3)}
                    className=' flex flex-row justify-between'>
                    <h1>Is Feastify free ?</h1>
                    {!showRes3 ?
                        <ChevronDown size={28} strokeWidth={1.5} />
                        :
                        <ChevronUp size={28} strokeWidth={1.5} />
                    }
                </button>
                <p className={` ${!showRes3 ? 'hidden' : 'block'} font-semibold text-[16px] md:text-xl`}>Feastify is absoluetly free, signup, leave us a comment</p>
            </div>

        </main>
    )
}
