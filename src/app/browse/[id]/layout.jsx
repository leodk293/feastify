import React from 'react'

export async function generateMetadata({ params }, parent) {
    const id = params.id;

    return {
        title: `Meals with ${id} | Feastify`,
    };
}


const layout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default layout