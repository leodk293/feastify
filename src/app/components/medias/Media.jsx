import React from 'react'
import Link from 'next/link'
import { Twitter, Facebook, Linkedin } from 'lucide-react'

export default function Media() {
    return (
        <div className=' flex flex-row gap-2 '>
            <Link target='_blank' href={'https://x.com/Aboubac48530295'}>
                <div className=' border border-transparent rounded-[5px] bg-red-950 p-1 hover:bg-orange-900 duration-200'>
                    <Twitter color='#fff' size={30} strokeWidth={1.5} />
                </div>
            </Link>

            <Link target='_blank' href={'https://www.facebook.com/profile.php?id=100092315485742'}>
                <div className=' border border-transparent rounded-[5px] bg-red-950 p-1 hover:bg-orange-900 duration-200'>
                    <Facebook color='#fff' size={30} strokeWidth={1.5} />
                </div>
            </Link>

            <Link target='_blank' href={'https://www.linkedin.com/in/aboubacar-traore-495736252/'}>
                <div className=' border border-transparent rounded-[5px] bg-red-950 p-1 hover:bg-orange-900 duration-200'>
                    <Linkedin color='#fff' size={30} strokeWidth={1.5} />
                </div>
            </Link>

        </div>
    )
}
