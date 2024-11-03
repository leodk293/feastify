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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mealName.trim()) {
      router.push(`/search?meal=${encodeURIComponent(mealName)}`);
      setMealName('');
    }
  };

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

  useEffect(() => {
    fetchMeals();
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

      <form
        onSubmit={handleSubmit}
        className=" mt-10 flex flex-row"
      >
        <input
          style={{ borderRadius: "5px 0 0 5px" }}
          className=" outline-none bg-transparent w-auto border font-bold text-orange-800 border-r-transparent border-orange-800 p-2 text-xl placeholder:text-orange-950 md:w-[25rem]"
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

      <div className=" flex flex-col mt-[80px] gap-5">
        <h1 className=" text-4xl font-extrabold">FAQ</h1>
        <Faq />
      </div>

    </main>
  );
}
