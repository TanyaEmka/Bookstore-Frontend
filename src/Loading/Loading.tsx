import React from "react";
import { ThreeDots } from "react-loader-spinner";

export const Loading: React.FC = () => {
    return (
        <div className="loading">
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#9D83E9" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}