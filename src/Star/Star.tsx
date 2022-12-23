import React from "react";
import full_star from "../images/full_star.svg";
import empty_star from "../images/empty_star.svg";

type StarProps = {
    isFull: number
}

export const Star: React.FC<StarProps> = ({isFull}) => {
    return (
        <div className="star"><img src={(isFull) ? full_star : empty_star} alt="img" /></div>
    )
}