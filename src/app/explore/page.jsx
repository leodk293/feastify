'use client'
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState({
        error: false,
        data: undefined,
        loading: false,
    });

    const [target, setTarget] = useState('');

    async function fetchData(api_url, api_key) {
        try {
            const response = await fetch(api_url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            return result.meals.map((obj) => obj[api_key]);
        } catch (error) {
            console.error('Fetch error:', error.message);
            return [];
        }
    }

    function handleError() {
        setFilteredMeals({
            error: true,
            data: undefined,
            loading: false,
        });
    }

    function setLoader() {
        setFilteredMeals({
            error: false,
            data: undefined,
            loading: true,
        });
    }

    async function fetchFilteredMealsByCategory(category) {
        if (!category) return;
        setTarget(category);
        setLoader();
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            if (!response.ok) throw new Error(`An error has occurred: ${response.status}`);
            const result = await response.json();
            setFilteredMeals({
                error: false,
                data: result.meals,
                loading: false,
            });
        } catch (error) {
            handleError();
            console.error(error.message);
        }
    }

    async function fetchFilteredMealsByArea(area) {
        if (!area) return;
        setTarget(area);
        setLoader();
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
            if (!response.ok) throw new Error(`An error has occurred: ${response.status}`);
            const result = await response.json();
            setFilteredMeals({
                error: false,
                data: result.meals,
                loading: false,
            });
        } catch (error) {
            handleError();
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData('https://www.themealdb.com/api/json/v1/1/list.php?a=list', 'strArea').then(setAreas);
        fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'strCategory').then(setCategories);
        fetchData('https://www.themealdb.com/api/json/v1/1/list.php?i=list', 'strIngredient').then(setIngredients);
    }, []);

    useEffect(() => {
        if (categories.length > 0) fetchFilteredMealsByCategory(categories[0]);
    }, [categories]);

    return (
        <main className="flex flex-col items-center mx-3 md:mx-0">
            <div className="flex flex-col gap-3">

                <div className=' flex flex-wrap gap-10'>

                    <h1 className=' text-2xl self-center font-bold'>Filter Meals :</h1>

                    <select
                        className="text-[17px] font-semibold outline-none border border-transparent rounded-[5px] cursor-pointer px-5 py-2 bg-orange-900 text-white"
                        onChange={(e) => fetchFilteredMealsByCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option value={category} key={nanoid(10)}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <select
                        className="text-[17px] font-semibold outline-none border border-transparent rounded-[5px] cursor-pointer px-5 py-2 bg-orange-900 text-white"
                        onChange={(e) => fetchFilteredMealsByArea(e.target.value)}
                    >
                        <option value="">Select an area</option>
                        {areas.map((area) => (
                            <option value={area} key={nanoid(10)}>
                                {area}
                            </option>
                        ))}
                    </select>

                </div>


                <div className=' mt-10 flex flex-col gap-2'>
                    <h1 className=' text-4xl text-center font-bold text-orange-950 md:text-left'>{target}</h1>
                    <span className='w-[69rem] h-[1px] rounded-[25px] bg-orange-950 hidden md:block'></span>
                </div>
                {filteredMeals.error ? (
                    <p className='text-red-800 text-3xl font-bold text-center mt-10'>Something went wrong, try again</p>
                ) : filteredMeals.loading ? (
                    <p className="text-orange-800 mt-5 text-3xl font-bold text-center">Loading...</p>
                ) : (
                    <div className="flex flex-wrap mt-5 w-auto justify-center gap-5 md:w-[70rem]">
                        {filteredMeals.data?.map((meal) => (
                            <Link href={`/recipes/${meal.idMeal}`} key={meal.idMeal}>
                                <div className="flex flex-col gap-2 hover:brightness-75 duration-200">
                                    <Image
                                        src={meal.strMealThumb}
                                        width={200}
                                        height={100}
                                        alt={meal.strMeal}
                                        className="border border-orange-950 rounded-[5px] object-cover"
                                    />
                                    <p className='w-[200px] text-[17px] font-semibold'>{meal.strMeal}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Page;
