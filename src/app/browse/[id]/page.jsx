'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Page = ({ params }) => {
    const [browsedMeals, setBrowsedMeals] = useState({
        error: false,
        data: undefined,
        loading: false,
    });

    function handleError() {
        setBrowsedMeals({
            error: true,
            data: undefined,
            loading: false,
        });
    }

    function setLoader() {
        setBrowsedMeals({
            error: false,
            data: undefined,
            loading: true,
        });
    }

    const [letterId, setLetterId] = useState('');

    useEffect(() => {
        params.then((resolvedParams) => setLetterId(resolvedParams.id));
    }, [params]);

    async function fetchBrowsedMeals() {
        setLoader();
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterId}`
            );
            if (!response.ok) {
                throw new Error(`An error has occurred: ${response.status}`);
            }
            const result = await response.json();
            setBrowsedMeals({
                error: false,
                data: result.meals,
                loading: false,
            });
        } catch (error) {
            console.log(error.message);
            handleError();
        }
    }

    useEffect(() => {
        if (letterId) {
            fetchBrowsedMeals();
        }
    }, [letterId]);

    return (
        <main className="flex flex-col items-center mx-3 md:mx-0">
            {browsedMeals.error ? (
                <p className="text-red-800 text-3xl font-bold text-center mt-10">
                    Something went wrong, try again
                </p>
            ) : browsedMeals.loading ? (
                <p className="text-orange-800 mt-5 text-3xl font-bold text-center">
                    Loading...
                </p>
            ) : (
                browsedMeals.data ? (
                    <div className="flex flex-col items-center gap-5">
                        <div className=' flex flex-col gap-2'>
                            <h1 className=' text-2xl font-bold'>Meals starting with ` {letterId} `</h1>
                            <div className=' hidden w-[65rem] h-[1px] bg-red-950 md:block'></div>
                        </div>
                        <div className="flex flex-wrap mt-5 w-auto justify-center gap-5 md:w-[70rem]">
                            {browsedMeals.data.map((meal) => (
                                <Link
                                    href={`/recipes/${meal.idMeal}`}
                                    key={meal.idMeal}
                                >
                                    <div className="flex flex-col gap-2 hover:brightness-75 duration-200">
                                        <Image
                                            src={meal.strMealThumb}
                                            width={200}
                                            height={100}
                                            alt={meal.strMeal}
                                            className="border border-orange-950 rounded-[5px] object-cover"
                                        />
                                        <p className="w-[200px] text-[17px] font-semibold">
                                            {meal.strMeal}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) :
                    <h1
                        className='text-3xl h-[15rem] text-center font-bold mt-10'
                    >
                        No Results for letter `{letterId}` 😢
                    </h1>
            )}
        </main>
    );
};

export default Page;
