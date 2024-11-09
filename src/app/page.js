'use client';
import Image from "next/image";
import ramen from '../../public/ramen.png'
import { Twitter, Facebook, Linkedin, Search } from 'lucide-react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Faq from "./components/faq/Faq";

export default function Home() {
  const router = useRouter();
  const [mealName, setMealName] = useState("");
  const [ingredientName, setIngredientName] = useState("");

  const [ingredients, setIngredients] = useState([]);

  const handleMealSubmit = (event) => {
    event.preventDefault();
    if (mealName.trim()) {
      router.push(`/search-meal?meal=${encodeURIComponent(mealName)}`);
      setMealName('');
    }
  };

  const handleIngredientSubmit = (event) => {
    event.preventDefault();
    if (ingredientName.trim()) {
      router.push(`/search-ingredient?ingredient=${encodeURIComponent(ingredientName)}`);
      setIngredientName('');
    }
  }



  const [meals, setMeals] = useState({
    error: false,
    data: undefined,
    loading: false
  })

  function handleError() {
    setMeals({
      error: true,
      data: undefined,
      loading: false
    })
  }

  function setLoader() {
    setMeals({
      error: false,
      data: undefined,
      loading: true
    })
  }

  async function fetchMeals() {
    setLoader();
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v2/1/randomselection.php');
      if (!response.ok) {
        throw new Error('An error has occured')
      }
      const result = await response.json();
      setMeals({
        error: false,
        data: result.meals,
        loading: false
      })

    }
    catch (error) {
      console.log(error.message);
      handleError();
    }
  }

  async function fecthIngredientsList() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      if (!response.ok) {
        throw new Error(`An error has occured : ${response.status}`)
      }

      const result = await response.json();
      setIngredients(result.meals);

    }
    catch (error) {
      console.log(error.message);
      setIngredients([]);
    }

  }

  function displayIngredientsImage(ingredient) {
    return `https://www.themealdb.com/images/ingredients/${ingredient}.png`
  }

  useEffect(() => {
    fetchMeals();
    fecthIngredientsList();
  }, []);

  return (
    <main className=" flex flex-col items-center mx-3 md:mx-0">

      <div className="flex flex-row justify-center">

        <Image
          src={ramen}
          alt="RAMEN IMAGE"
          width={150}
          height={50}
          className=" object-cover self-center hidden md:block"
        />

        <div className=" flex flex-col items-center gap-5">
          <h1 className=" text-4xl font-bold text-center">Welcome to Feastify</h1>

          <p className=" font-semibold text-[18px] leading-7 text-center w-auto md:w-[50rem]">Feastify, your ultimate kitchen companion! Discover a world of delicious recipes
            and helpful cooking tips tailored just for you. Signin and explore, cook, and share your culinary journey by leaving
            comments and connecting with other food lovers!
          </p>
        </div>

        <Image
          src={ramen}
          alt="RAMEN IMAGE"
          width={150}
          height={50}
          className=" object-cover self-center hidden md:block"
        />

      </div>

      <div className=" flex flex-col gap-2 mt-10">
        <h1 className="text-2xl text-orange-950 font-bold">Follow us :</h1>
        <div className=" flex flex-row gap-2">
          <Link className=" border border-transparent p-2 rounded-[5px] bg-orange-900 hover:bg-orange-800 duration-200" href={'/'}>
            <Twitter color='#fff' size={30} strokeWidth={1.5} />
          </Link>
          <Link className=" border border-transparent p-2 rounded-[5px] bg-orange-900 hover:bg-orange-800 duration-200" href={'/'}>
            <Facebook color='#fff' size={30} strokeWidth={1.5} />
          </Link>
          <Link className=" border border-transparent p-2 rounded-[5px] bg-orange-900 hover:bg-orange-800 duration-200" href={'/'}>
            <Linkedin color='#fff' size={30} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className=" flex flex-col">

        <form
          onSubmit={handleMealSubmit}
          className=" mt-10 flex flex-row"
        >
          <input
            required
            style={{ borderRadius: "5px 0 0 5px" }}
            className=" outline-none bg-transparent capitalize w-auto border font-bold text-orange-800 border-r-transparent border-orange-800 p-2 text-xl placeholder:text-orange-950 md:w-[25rem]"
            type="text"
            placeholder="Search for a Meal..."
            onChange={(event) => setMealName(event.target.value)}
            value={mealName}
          />

          <button
            style={{ borderRadius: "0 5px 5px 0" }}
            className=" border-2 border-orange-900 bg-orange-800 p-1 hover:bg-red-900 duration-300">
            <Search color="#fff" size={28} strokeWidth={1.75} />
          </button>
        </form>

        <div className=" translate-y-5 self-center flex flex-row gap-2">
          <span className=" hidden w-[200px] h-[1px] bg-black self-center md:block"></span>
          <span className=" self-center font-bold text-xl">or</span>
          <span className=" hidden w-[200px] h-[1px] bg-black self-center md:block"></span>
        </div>

        <form
          onSubmit={handleIngredientSubmit}
          className=" mt-10 flex flex-row"
        >
          <input
            required
            list='ingredientslist'
            style={{ borderRadius: "5px 0 0 5px" }}
            className=" outline-none bg-transparent capitalize w-auto border font-bold text-orange-800 border-r-transparent border-orange-800 p-2 text-xl placeholder:text-orange-950 md:w-[25rem]"
            type="text"
            placeholder="Enter an main ingredient..."
            onChange={(event) => setIngredientName(event.target.value)}
            value={ingredientName}
          />

          <datalist id="ingredientslist">
            {Array.isArray(ingredients) && ingredients.map((ingredient) => (
              <option
                value={ingredient.strIngredient}
                key={ingredient.idIngredient}
              />
            ))}
          </datalist>

          <button
            style={{ borderRadius: "0 5px 5px 0" }}
            className=" border-2 border-orange-900 bg-orange-800 p-1 hover:bg-red-900 duration-300">
            <Search color="#fff" size={28} strokeWidth={1.75} />
          </button>
        </form>

      </div>

      <h1 className=" text-3xl text-center mt-[80px] font-extrabold text-red-950">Discover some tasty meals 😋</h1>

      <div className=" hidden md:w-[68rem] h-[1px] rounded-[25px] bg-red-950 mt-5 md:block"></div>

      <div className=" mt-10 flex flex-col gap-5 w-auto items-center md:w-[70rem]">

        {meals.loading === true ?
          <p className=" text-orange-800 text-3xl font-bold text-center mt-10">Loading...</p> :
          meals.error === true ?
            <p className=" text-red-800 text-3xl font-bold text-center mt-10">Something went wrong, check that you are connected</p> :

            <div
              className=" flex flex-wrap justify-center gap-5"
            >
              {
                meals.data && meals.data.map((meal) => (
                  <Link href={`/recipes/${meal.idMeal}`} key={meal.idMeal}>
                    <div
                      className=" flex flex-col gap-2 hover:brightness-75 duration-200"
                    >
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={200}
                        height={100}
                        className=" border border-orange-950 rounded-[5px] object-cover"

                      />

                      <p className="w-[200px] text-[17px] font-semibold">{meal.strMeal}</p>

                    </div>
                  </Link>
                ))
              }
            </div>

        }

      </div>

      <div className=" hidden md:w-[68rem] h-[1px] rounded-[25px] bg-red-950 mt-2 translate-y-5 md:block"></div>

      <div className=" mt-[120px] flex flex-col gap-5 w-auto items-center md:w-[70rem]">

        <h1 className=" font-extrabold text-red-950 text-3xl text-center">Browse among severals ingredients</h1>

        <div className="flex flex-wrap justify-center gap-5">

          {ingredients ?
            ingredients.slice(0, 10).map((ingredient) => (
              <Link
                href={`/search-ingredient?ingredient=${encodeURIComponent(ingredient.strIngredient)}`}
                key={ingredient.idIngredient}
                className=" hover:translate-y-[-5px] duration-200"
              >
                <div
                  className=" flex flex-col items-center gap-3 border border-transparent px-5 py-2 rounded-[5px] shadow bg-[#f8deac2b] "
                >
                  <Image
                    src={displayIngredientsImage(ingredient.strIngredient)}
                    alt={ingredient.strIngredient}
                    width={150}
                    height={100}
                  />

                  <p className="text-[16px] text-center font-semibold ">{ingredient.strIngredient}</p>

                </div>
              </Link>
            ))
            :
            <p className="text-red-800 text-3xl font-bold text-center mt-10">Something went wrong</p>

          }

        </div>

        <Link href={'/list-ingredients'}>
          <button
            className=" outline-none mt-2 text-red-800 text-xl font-bold rounded-[5px] shadow px-5 py-2 border border-transparent bg-orange-100 hover:translate-x-2 duration-200">
            Click here for more
          </button>
        </Link>

      </div>

      <div className=" flex flex-col mt-[80px] gap-5">
        <h1 className=" text-4xl font-extrabold">FAQ</h1>
        <Faq />
      </div>

      <h1 className=" mt-[100px] font-bold text-center text-[16px] md:text-2xl">
        <span>🍔 Total Meals : 303</span> / <span>🥩 Total Ingredients: 575</span>
      </h1>

    </main>
  );
}
