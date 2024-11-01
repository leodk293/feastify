import React from 'react'
import Link from 'next/link'
import { Twitter, Facebook, Linkedin } from 'lucide-react'

export default function Media() {
    return (
        <div className=' flex flex-row gap-2 border border-transparent px-5 py-2 bg-orange-800 rounded-[25px]'>
            <Link href={'/'}>
                <Twitter color='#fff'  size={30} strokeWidth={2.25} />
            </Link>
            <Link href={'/'}>
                <Facebook color='#fff' size={30} strokeWidth={2.25} />
            </Link>
            <Link href={'/'}>
                <Linkedin color='#fff' size={30} strokeWidth={2.25} />
            </Link>

        </div>
    )
}
