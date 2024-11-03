import React from 'react'
import FeastifyLogo from './feastify.png'
import Image from 'next/image'

export default function Logo() {
    return (
        <div className=' flex flex-row gap-3'>
            <h1 className=' text-3xl self-center font-bold'>Feastify</h1>
            <Image
                src={FeastifyLogo}
                alt='LOGO'
                width={60}
                height={40}
                className=' self-center object-cover'
            />
        </div>
    )
}
