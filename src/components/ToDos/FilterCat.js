import React from "react";

export default function FilterCat(props) {
  return (
    <div className="text-center mt-4">
      <button
        onClick={() => props.setFilter(0)}
        className="btn btn-dark m-1"
      >
        All
      </button>
      {props.categories.map((cat) => (
        <button
          key={cat.CategoryId}
          onClick={() => props.setFilter(Number(cat.CategoryId))}
          className="btn btn-dark m-1"
        >
          {cat.Name}
        </button>
      ))}
    </div>
  );
}