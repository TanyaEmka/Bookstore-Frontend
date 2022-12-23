import React from "react";
import { Star } from "../Star/Star";

type ShortRatingProps = {
    value: number,
    count: number
}

export const Rating: React.FC<ShortRatingProps> = ({value, count}) => {
    let ratingArr = [1, 1, 1, 1, 1]

    return (
        <div 
            className="rating"
            title={'Число оценивших: (' + count + ')'}
        >
            {ratingArr.map((element: number, item: number)=> {
                return (
                    <Star isFull={(item <= value - 1) ? 1 : 0} key={item} />
                )
            })}
        </div>
    )
}