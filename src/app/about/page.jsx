import React from 'react'

export default function Page() {
  return (
    <main className='flex flex-col items-center mx-3 md:mx-0'>

      <div className=' w-auto md:w-[60rem]'>
        <div className=' flex flex-col gap-5'>
          <h1 className=' text-3xl font-bold'>About Feastify</h1>
          <p className=' font-semibold text-[15px] md:text-xl'>
            Welcome to Feastify – your ultimate kitchen companion! Whether you&apos;re a seasoned chef or a
            beginner, our mission is to make cooking easy, enjoyable, and accessible to everyone. We believe that
            cooking isn’t just about following recipes; it’s about creativity, flavor exploration, and bringing people
            together.
          </p>
        </div>

        <div className=' hidden w-[60rem] translate-y-5 h-[1px] bg-[#000000c2] rounded-[10px] md:block'></div>

        <div className=' mt-10 flex flex-col gap-5'>
          <h1 className=' text-3xl font-bold'>Why Feastify ?</h1>
          <p className=' font-semibold text-[15px] md:text-xl'>
            We understand that finding the perfect recipe can be overwhelming, so we’ve designed Feastify
            with you in mind. Our app offers a wide variety of recipes from all around the world, tailored to
            different skill levels, dietary preferences, and tastes. With step-by-step instructions, helpful tips,
            and an easy-to-navigate interface, cooking has never been simpler.
          </p>
        </div>

        <div className=' hidden w-[60rem] translate-y-5 h-[1px] bg-[#000000c2] rounded-[10px] md:block'></div>

        <div className=' mt-10 flex flex-col gap-5'>
          <h1 className=' text-3xl font-bold'>Features You’ll Love</h1>
          <ul className=' flex flex-col gap-1 text-[15px] font-semibold md:text-[18px]'>
            <li>Ingredient Search : Find recipes by typing in ingredients you already have at home.</li>
            <li>Meals Search : Search for a meal by typing his name</li>
            <li>Filter System : Filter meals according to their category (lamb, chicken, etc...), and their areas (american, british, moroccan, etc...)</li>
          </ul>
        </div>

        {/* <div className=' hidden w-[60rem] translate-y-5 h-[1px] bg-[#000000c2] rounded-[10px] md:block'></div> */}

        <p className=' text-4xl text-orange-950 font-bold mt-10'>Happy cooking !🔪</p>
      </div>

    </main>
  )
}
