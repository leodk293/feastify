'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const Page = () => {
    /*const [categories, setCategories] = useState({
        error: false,
        data: undefined
    })

    const [areaa, setAreas] = useState({
        error: true,
        data: undefined
    })

    const [Ingrdients, setIngredients] = useState({
        error:true,
        data:undefined
    })*/

    const [areas, setAreas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    async function fetchData(api_url, api_key) {
        try {
            const response = await fetch(api_url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const arrayOfValues = result.meals.map(obj => obj[api_key]);

            return arrayOfValues;
        } catch (error) {
            console.error('Fetch error:', error.message);
            return [];
        }
    }

    /*const areas_variables = fetchData('https://www.themealdb.com/api/json/v1/1/list.php?a=list', 'strArea');
    const categories_variables = fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'strCategory');
    const ingredients_variables = fetchData('https://www.themealdb.com/api/json/v1/1/list.php?i=list', 'strIngredient');

    useEffect(() => {
        setAreas(areas_variables);
        setCategories(categories_variables);
        setIngredients(ingredients_variables)
    }, [])*/

    const [filteredMeals, setFilteredMeals] = useState({
        error: false,
        data: undefined,
        loading: false
    })

    function handleError() {
        setFilteredMeals({
            error: true,
            data: undefined,
            loading: false
        })
    }

    function setLoader() {
        setFilteredMeals({
            error: false,
            data: undefined,
            loading: true
        })
    }

    useEffect(() => {
        fetchData('https://www.themealdb.com/api/json/v1/1/list.php?a=list', 'strArea').then(setAreas);
        fetchData('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'strCategory').then(setCategories);
        fetchData('https://www.themealdb.com/api/json/v1/1/list.php?i=list', 'strIngredient').then(setIngredients);
    }, []);

    async function fetchFilteredMealsByCategory(event) {
        setLoader();
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${event.target.value}`)
            if (!response.ok) {
                throw new Error(`An error has occured : ${response.status}`)
            }

            const result = await response.json();
            setFilteredMeals({
                error: false,
                data: result.meals,
                loading: false
            })
        }
        catch (error) {
            handleError();
            console.log(error.message)
        }
    }

    async function fetchFilteredMealsByArea(event) {
        setLoader();
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${event.target.value}`)
            if (!response.ok) {
                throw new Error(`An error has occured : ${response.status}`)
            }

            const result = await response.json();
            setFilteredMeals({
                error: false,
                data: result.meals,
                loading: false
            })
        }
        catch (error) {
            handleError();
            console.log(error.message)
        }
    }

    return (
        <main className=' flex flex-col items-center'>
            <div className=' flex flex-col gap-3'>
                <h1>Filter Meals:</h1>
                <div className=' flex flex-wrap gap-5 justify-center'>

                    <div className=' flex flex-row gap-2'>
                        <p className=' text-xl'>By Category</p>
                        <select onChange={fetchFilteredMealsByCategory} name="" id="">
                            {categories.map((category) => (
                                <option
                                    className=' text-[17px] font-semibold outline-none border border-transparent px-5 py-2 bg-[#ffa60008] text-white'
                                    value={category}
                                    key={nanoid(10)}
                                >
                                    {category}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className=' flex flex-row gap-2'>
                        <p className=' text-xl'>By Area</p>
                        <select onChange={fetchFilteredMealsByArea} name="" id="">
                            {areas.map((area) => (
                                <option
                                    className=' text-[17px] font-semibold outline-none border border-transparent px-5 py-2 bg-[#ffa60008] text-white'
                                    value={area}
                                    key={nanoid(10)}
                                >
                                    {area}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className=' flex flex-row gap-2'>
                        <p>By Main Ingrdient</p>
                        <select name="" id="">
                            {ingredients.map((ingredient) => (
                                <option
                                    value={ingredient}
                                    key={nanoid(10)}
                                >
                                    {ingredient}
                                </option>
                            ))}
                        </select>
                    </div> */}

                </div>
            </div>

        </main>
    )
}

export default Page