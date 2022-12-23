import React from "react";
import { BookList } from "../BookList/BookList";
import { Search } from "../Search/Search";
import { StatusFilter } from "../StatusFilter/StatusFilter";

export const MainPage: React.FC = () => {
    return (
        <div className="main_page">
            <Search />
            <StatusFilter />
            <BookList />
        </div>
    )
}