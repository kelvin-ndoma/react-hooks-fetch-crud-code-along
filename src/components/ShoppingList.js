import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((resp) => resp.json())
      .then((data) => setItems(data));
  }, []);

  function handleDeleteClick(deletedItem){
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  function handleUpdatedItem(updatedItem){
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    })
    setItems(updatedItems)
  }

  function handleAddItem(data){
    setItems([...items, data])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className='ShoppingList'>
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className='Items'>
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdatedItem={handleUpdatedItem} onDeletedItem={handleDeleteClick}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
