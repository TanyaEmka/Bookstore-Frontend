import React from "react";
import "./StatusFilter.css";
import { useState, useEffect } from "react";
import { StatusProps } from "../Book/BookTypes";
import { FilterBlock } from "../FilterBlock/FilterBlock";

export const StatusFilter: React.FC = () => {

    const [statusArray, setStatusArray] = useState<Array<StatusProps>>([])

    const getStatuses = () => {
        fetch('/statuses/')
        .then((response) => {
            return response.json()
        })
        .then((data: Array<StatusProps>) => {
            setStatusArray([...data])
        })
    }

    useEffect(() => {
        getStatuses();
    }, [])

    return (
        <div className="status_filter">
            {statusArray.map((element: StatusProps, index: number) => {
                return (
                    <FilterBlock id={element.id} name={element.name} />
                )
            })}
            <FilterBlock id={0} name={"Выбрать всё"} />
        </div>
    )
}