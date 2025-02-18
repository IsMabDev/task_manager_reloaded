import React from "react";

function CategoryCard({ column, colorCategory, onClick }: { column: string, colorCategory: string | undefined, onClick: () => void }) {
  console.log('colorCategory: ', colorCategory);

  return (
    <button
      type="button"
      key={column}
      className={`categoryCard  flex justify-center cursor-pointer ${
        colorCategory && colorCategory !== "#fff" ? "bg-red-200" : "bg-gray-200"
      }  items-center w-30  h-10 rounded-2xl fluid-text`}
      onClick={onClick}
    >
      {column}
    </button>
  );
}

export default CategoryCard;