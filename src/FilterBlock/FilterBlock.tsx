import React, { useEffect, useState } from "react";
import "./FilterBlock.css";
import { StatusProps } from "../Book/BookTypes";
import { useAppDispath, useAppSelector } from "../store";
import { changeSearchName } from "../store/actions/searchActions";

export const FilterBlock: React.FC<StatusProps> = ({id, name}) => {

    const dispath = useAppDispath();

    const editSearch = useAppSelector((state) => state.searchR.search)
    const [isChanged, setIsChanged] = useState(false);

    const onClickBlock = (e: any) => {
        let newId = id.toString()
        if (id === 0)
            newId = ""
        setIsChanged(true);
        dispath(changeSearchName({...editSearch, status_id: newId}))
    }

    useEffect(() => {
        let isCh = false;
        if (editSearch.status_id === id.toString())
            isCh = true
        setIsChanged(isCh)
    }, [dispath, editSearch.status_id])

    return (
        <div className="filter_block " onClick={onClickBlock}>
            <div className={isChanged ? "is_changed" : "is_not"}>{name}</div>
        </div>
    )
}