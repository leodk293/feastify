"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Loader from "../components/Loader";

function MealsContent() {
  const searchParams = useSearchParams();
  const mealName = searchParams.get("meal");

  const [meals, setMeals] = useState({
    error: false,
    data: undefined,
    loading: false,
  });

  function handleError() {
    setMeals({
      error: true,
      data: undefined,
      loading: false,
    });
  }

  function setLoader() {
    setMeals({
      error: false,
      data: undefined,
      loading: true,
    });
  }

  async function fetchMeals() {
    if (!mealName) return;
    setLoader();

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          mealName
        )}`
      );
      if (!response.ok) {
        throw new Error("An error has occurred");
      }
      const result = await response.json();
      setMeals({
        error: false,
        data: result.meals,
        loading: false,
      });
    } catch (error) {
      console.error(error.message);
      handleError();
    }
  }

  useEffect(() => {
    fetchMeals();
  }, [mealName]);

  return (
    <main className="flex flex-col items-center mx-3 md:mx-0">
      <div>
        <h1 className="text-3xl font-extrabold text-red-950 mt-10">
          Search Results for: {mealName}
        </h1>
        <div className="hidden md:w-[69rem] h-[2px] bg-red-950 md:block"></div>
      </div>

      {meals.loading ? (
        <Loader />
      ) : meals.error ? (
        <p className="text-red-800 text-3xl font-bold text-center mt-10">
          Something went wrong, please try again.
        </p>
      ) : meals.data && meals.data.length > 0 ? (
        <div className="flex flex-wrap w-auto justify-center gap-5 mt-10 md:w-[70rem]">
          {meals.data.map((meal) => (
            <Link href={`/recipes/${meal.idMeal}`} key={meal.idMeal}>
              <div className="flex flex-col gap-2 hover:brightness-75 duration-200">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={200}
                  height={100}
                  className="border border-orange-950 w-[150px] rounded-[5px] object-cover md:w-[200px]"
                />
                <p className="w-[150px] text-[17px] font-semibold md:w-[200px]">
                  {meal.strMeal}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-orange-800 text-2xl font-bold mt-[60px] md:h-[10rem]">
          No results found for {mealName}.
        </p>
      )}
    </main>
  );
}

export default function SearchResults() {
  return (
    <Suspense
      fallback={
        <p className="text-center mt-10 text-2xl">Loading search results...</p>
      }
    >
      <MealsContent />
    </Suspense>
  );
}
