import React from "react";

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const categories = ["All", "Personal", "Work"];

  return (
    <div className="category-filter-container">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          // Aqui usamos uma Template String para adicionar a classe 'active' dinamicamente
          className={`btn-category ${
            selectedCategory === category ? "active" : ""
          }`}
        >
          {category === "All" ? "Todos" : category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
