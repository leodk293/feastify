'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReadMore from '../../components/readMore';
import { Youtube } from 'lucide-react';
import { nanoid } from 'nanoid';

export default function Page({ params }) {
  const [mealsInfos, setMealsInfo] = useState({
    error: false,
    data: undefined,
    loading: false,
  });

  const [ingredientNum, setIngredientNum] = useState([]);
  let tab = [];

  for (let i = 1; i <= 15; i++) {
    tab.push(i);
  }

  function displayIngredients(ingredientName) {
    return `https://www.themealdb.com/images/ingredients/${ingredientName}.png`
  }


  const [recipeId, setRecipeId] = useState(null);
  useEffect(() => {
    params.then((resolvedParams) => setRecipeId(resolvedParams.recipe_id));
  }, [params]);

  function handleError() {
    setMealsInfo({
      error: true,
      data: undefined,
      loading: false,
    });
  }

  function setLoader() {
    setMealsInfo({
      error: false,
      data: undefined,
      loading: true,
    });
  }

  async function fetchMealsInfos() {
    setLoader();
    try {
      if (!recipeId) return;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }

      const result = await response.json();
      setMealsInfo({
        error: false,
        data: result.meals[0],
        loading: false,
      });
    } catch (error) {
      handleError();
      console.log(error.message);
    }
  }

  useEffect(() => {
    setIngredientNum(tab);
    fetchMealsInfos();
  }, [recipeId]);

  return (
    <main className="flex flex-col items-center mx-3 md:mx-0">
      {
        mealsInfos.error === true
          ?
          <p className='text-red-800 text-3xl font-bold text-center mt-10'>Something went wrong, try again</p>
          :
          mealsInfos.loading === true
            ?
            <p className="text-orange-800 mt-5 text-3xl font-bold text-center">Loading...</p>
            :
            (
              mealsInfos.data &&
              <div className=' flex flex-col items-center gap-5'>

                <h1 className=' text-xl text-red-950 font-bold text-center w-auto md:text-4xl md:w-[55rem]'>
                  {mealsInfos.data.strMeal} (<span>{mealsInfos.data.strArea} / {mealsInfos.data.strCategory}</span>)
                </h1>

                <div
                  className='flex flex-col shadow border border-transparent rounded-[10px] p-10 bg-[#f8ddac14] items-center gap-5'
                >
                  <Image
                    src={mealsInfos.data.strMealThumb}
                    width={400}
                    height={200}
                    alt={mealsInfos.data.strMeal}
                    className=' rounded-[5px] border border-orange-950 object-cover'
                  />

                  <div className=' flex flex-col gap-2'>

                    <h1 className=' text-2xl text-orange-950 font-bold underline underline-offset-8'>Instructions</h1>

                    <div className=' w-auto text-[17px] leading-8 md:w-[55rem]'>
                      <ReadMore
                        text={mealsInfos.data.strInstructions}
                        maxLength={520}
                      />
                    </div>
                  </div>

                  <Link
                    target='_blank'
                    className=' self-start hover:translate-x-2 duration-200'
                    href={mealsInfos.data.strYoutube}
                  >
                    <button
                      className=' flex flex-row gap-2 border border-transparent bg-orange-100 text-red-800 font-bold text-xl px-5 py-2 rounded-[5px]'>
                      <p className=' self-center'>Watch the cooking video</p>
                      <Youtube color='#991b1b' size={36} strokeWidth={1.5} />
                    </button>
                  </Link>

                </div>

                <div className='mt-10 flex flex-col gap-5'>
                  <div className=' flex flex-col gap-2'>
                    <h1 className='text-2xl text-red-950 font-bold text-center md:text-left'>{mealsInfos.data.strMeal}&apos;s Ingredients <span className=' hidden md:inline'>🍖</span></h1>
                    <span className=' hidden w-[60rem] h-[1px] rounded-[25px] bg-red-950 md:block'></span>
                  </div>
                  <div className='w-auto flex flex-wrap justify-center gap-5 md:w-[60rem] md:justify-start'>
                    {ingredientNum.map((ingredient) => (

                      <div key={nanoid(10)}>
                        {mealsInfos.data[`strIngredient${ingredient}`]
                          ?
                          <div
                            className=' flex flex-col border border-transparent p-3 bg-[#f8deac2b] rounded-[5px] shadow gap-2'
                            key={nanoid(10)}
                          >
                            <div className='border border-transparent self-center shadow rounded-[10px] bg-[#ffd69d2e] p-2'>
                              <Image
                                src={displayIngredients(mealsInfos.data[`strIngredient${ingredient}`])}
                                alt={mealsInfos.data[`strIngredient${ingredient}`]}
                                width={150}
                                height={100}
                                className=' object-cover'
                              />
                            </div>

                            <p className='text-[16px] w-[180px] font-semibold'>
                              {mealsInfos.data[`strIngredient${ingredient}`]} / <span className=' font-bold text-orange-800'>{mealsInfos.data[`strMeasure${ingredient}`]}</span>
                            </p>
                          </div>
                          :
                          null
                        }

                      </div>
                    ))}
                  </div>
                </div>


              </div>
            )

      }
    </main>
  );
}
