'use client';

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {

    const [listIngredients, setListIngredients] = useState({
        error: false,
        data: [],
        loaing: false
    })

    function handleError() {
        setListIngredients({
            error: true,
            data: [],
            loaing: false
        })
    }

    function setLoader() {
        setListIngredients({
            error: false,
            data: [],
            loaing: true
        })
    }

    function displayIngredientsImage(ingredient) {
        return `https://www.themealdb.com/images/ingredients/${ingredient}.png`
    }


    async function fecthAllListIngredients() {
        setLoader();
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            if (!response.ok) {
                throw new Error(`An error has occured : ${response.status}`)
            }

            const result = await response.json();
            setListIngredients({
                error: false,
                data: result.meals,
                loaing: false
            })
        }
        catch (error) {
            console.log(error.message);
            handleError();
        }
    }

    useEffect(() => {
        fecthAllListIngredients();
    }, [])

    return (
        <main className="flex flex-col items-center mx-3 md:mx-0">
            <h1 className=' text-2xl font-bold md:text-4xl'>🥩Total Ingredients : {listIngredients.data.length}</h1>
            {listIngredients.loaing === true ?
                <p className='text-orange-800 h-[30rem] text-3xl font-bold text-center mt-10'>Loading...</p>
                :
                listIngredients.error === true ?
                    <p className='text-red-800 h-[30rem] text-3xl font-bold text-center mt-10'>Something went wrong</p>
                    :
                    (
                        <div className='mt-[50px] flex flex-col gap-5 w-auto items-center md:w-[70rem]'>
                            {
                                <div className='flex flex-wrap justify-center gap-5'>
                                    {
                                        listIngredients.data.map((ingredient) => (

                                            <Link
                                                href={`/search-ingredient?ingredient=${encodeURIComponent(ingredient.strIngredient)}`}
                                                key={ingredient.idIngredient}
                                                className=" hover:translate-y-[-5px] duration-200"
                                            >

                                                <div
                                                    className=" flex flex-col items-center gap-3 border border-transparent px-5 py-2 rounded-[5px] shadow bg-[#f8deac2b] "
                                                >
                                                    <img
                                                        src={displayIngredientsImage(ingredient.strIngredient)}
                                                        alt={ingredient.strIngredient}
                                                        width={150}
                                                        height={100}
                                                        className=" object-cover w-[100px] md:w-[150px]"
                                                    />

                                                    <p className="text-[16px] text-center font-semibold ">{ingredient.strIngredient}</p>

                                                </div>

                                            </Link>

                                        ))
                                    }
                                </div>
                            }

                        </div>
                    )
            }

        </main>
    )
}
