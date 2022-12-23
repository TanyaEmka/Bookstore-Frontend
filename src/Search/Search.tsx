import React, { useEffect } from "react";
import search from "../images/search.svg";
import filter from "../images/filter.svg";
import "./Search.css";
import { useState } from "react";
import { useAppDispath, useAppSelector } from "../store";
import { changeSearchName } from "../store/actions/searchActions";

export const Search: React.FC = () => {

    const dispath = useAppDispath();

    const [visible, setVisible] = useState('none');
    const [editSearch, setEditSearch] = useState(useAppSelector((state) => state.searchR.search));

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            dispath(changeSearchName(editSearch))
        }
    }

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditSearch({...editSearch, name: e.target.value});
    }

    const chnageMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditSearch({...editSearch, min_price: e.target.value});
    }

    const chnageMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditSearch({...editSearch, max_price: e.target.value});
    }

    const openFilters = (visible: string) => {
        let min_price_element = document.getElementById('min_price');
        let max_price_element = document.getElementById('max_price');
        let tire_element = document.getElementById('tire');
        if (max_price_element && min_price_element && tire_element)
        {
            min_price_element.style.display = visible;
            max_price_element.style.display = visible;
            tire_element.style.display = visible;
        }
    }

    const enterFilters = (e: any) => {
        setVisible(visible === 'none' ? '' : 'none');
        openFilters(visible);
    }

    useEffect(() => {
        openFilters(visible);
    })

    return (
        <div 
            className="search"
            onKeyDown={onKeyDown}
        >
            <div className="search_img">
                <img src={search} alt="search_img"/>
            </div>
            <div 
                className="text"
                onKeyDown={onKeyDown}
            >
                <input
                    type="text"
                    placeholder="Поиск"
                    value={editSearch.name}
                    onChange={changeName}
                />
            </div>
            <div 
                className="filter_img"
                onClick={enterFilters}
            >
                <img src={filter} alt="filter_img" />
            </div>
            <div className="min_price" id="min_price">
                <input 
                    type="number"
                    placeholder="0 Р"
                    onChange={chnageMinPrice}
                    onKeyDown={onKeyDown}
                />
            </div>
            <div className="tire" id="tire">
                -
            </div>
            <div className="max_price" id="max_price">
                <input 
                    type="number"
                    placeholder="0 P"
                    onChange={chnageMaxPrice}
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    )
} 