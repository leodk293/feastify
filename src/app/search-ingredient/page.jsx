'use client'

import React from 'react'
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {

    const searchParams = useSearchParams();
    const ingredientName = searchParams.get("ingredient");

    const [ingredients, setIngredients] = useState({
        error: false,
        data: undefined,
        loading: false
    });

    function handleError() {
        setIngredients({
            error: true,
            data: undefined,
            loading: false
        });
    }

    function setLoader() {
        setIngredients({
            error: false,
            data: undefined,
            loading: true
        });
    }

    async function fecthMealsByIngredients() {
        if (!ingredientName) return;
        setLoader();

        try {
            //const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(ingredientName)}`);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredientName)}`);
            if (!response.ok) {
                throw new Error("An error has occurred");
            }
            const result = await response.json();
            setIngredients({
                error: false,
                data: result.meals,
                loading: false
            });
        } catch (error) {
            console.error(error.message);
            handleError();
        }
    }

    useEffect(() => {
        fecthMealsByIngredients();
    }, [ingredientName]);

    return (
        <main className="flex flex-col items-center mx-3 md:mx-0">
            <div className=' flex flex-col gap-1'>
                <h1 className="text-xl font-extrabold text-red-950 mt-10 md:text-3xl">Results for meals containing &apos; {ingredientName} &apos; like ingredient </h1>
                <div className=" hidden md:w-[69rem] h-[2px] bg-red-950 md:block"></div>
            </div>

            {ingredients.loading ? (
                <p className="text-orange-800 text-3xl font-bold text-center mt-10">Loading...</p>
            )
                :
                ingredients.error ?
                    (
                        <p className="text-red-800 text-3xl font-bold text-center mt-10">Something went wrong, please try again.</p>
                    )
                    : ingredients.data && ingredients.data.length > 0 ?
                        (
                            <div className="flex flex-wrap w-auto justify-center gap-5 mt-10 md:w-[70rem]">

                                {ingredients.data.map((meal) => (
                                    <Link href={`/recipes/${meal.idMeal}`} key={meal.idMeal}>
                                        <div className="flex flex-col gap-2 hover:brightness-75 duration-200">
                                            <Image
                                                src={meal.strMealThumb}
                                                alt={meal.strMeal}
                                                width={200}
                                                height={100}
                                                className="border border-orange-950 w-[150px] rounded-[5px] object-cover md:w-[200px]"
                                            />
                                            <p className="w-[150px] text-[17px] font-semibold md:w-[200px]">{meal.strMeal}</p>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        )
                        :
                        (
                            <p className="text-orange-800 text-2xl font-bold mt-[60px] md:h-[10rem]">No results found for {ingredientName}.</p>
                        )}
        </main>
    )
}
