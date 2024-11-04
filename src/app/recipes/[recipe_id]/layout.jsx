import React from 'react'

export async function generateMetadata({ params }, parent) {
    const id = params.recipe_id;

    const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await recipe.json();

    return {
        title: ` ${result.meals[0].strMeal} | Feastify`,
        description: ` ${result.meals[0].strMeal} Infos are displayed here .`,
    };
}

export default function layout({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}
