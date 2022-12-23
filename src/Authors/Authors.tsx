import React from "react";
import "./Authors.css";
import { BookList } from "../BookList/BookList";

export const Authors: React.FC = () => {
    return (
        <div className="authors">
            <p>Author</p>
            <BookList />
        </div>
    )
}