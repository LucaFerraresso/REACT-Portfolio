"use client";

import React, { useState, useEffect, useCallback } from "react";
// Stato iniziale per un nuovo elemento
const initialNewItem = { title: "", description: "", category: "" };

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(initialNewItem);
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    isAdding: false,
    isUpdating: false,
  });
  const [editItemId, setEditItemId] = useState(null);
  const [animatingItems, setAnimatingItems] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = useCallback(async () => {
    setLoadingState((prev) => ({ ...prev, isLoading: true }));
    // Simula il ritardo per lo skeleton loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const response = await fetch("/api/items");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      handleError("Failed to fetch items.");
    } finally {
      setLoadingState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const handleError = useCallback((message) => {
    console.error(message);
    alert(message);
  }, []);

  const isValidNewItem = useCallback(() => {
    return Object.values(newItem).every((field) => field.trim());
  }, [newItem]);

  const resetNewItem = useCallback(() => {
    setNewItem(initialNewItem);
  }, []);

  const animateItem = useCallback((id, animation) => {
    setAnimatingItems((prev) => ({ ...prev, [id]: animation }));
    // Pulisce l'animazione dopo 1500ms
    setTimeout(() => {
      setAnimatingItems((prev) => ({ ...prev, [id]: "" }));
    }, 1500);
  }, []);

  const addItem = useCallback(async () => {
    if (!isValidNewItem()) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoadingState((prev) => ({ ...prev, isAdding: true }));
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const addedItem = await response.json();
      resetNewItem();
      animateItem(addedItem._id, "fadeIn");
      setItems((prev) => [...prev, addedItem]);
    } catch (error) {
      handleError("Failed to add item.");
    } finally {
      setLoadingState((prev) => ({ ...prev, isAdding: false }));
    }
  }, [newItem, isValidNewItem, animateItem, resetNewItem, handleError]);

  const updateItem = useCallback(async () => {
    if (!newItem.title.trim() && !newItem.category.trim()) {
      alert("Please fill in at least one required field.");
      return;
    }
    setLoadingState((prev) => ({ ...prev, isUpdating: true }));
    animateItem(editItemId, "pulse");
    try {
      const response = await fetch(`/api/items?updateId=${editItemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const updatedItem = await response.json();
      setItems((prev) =>
        prev.map((item) =>
          item._id === editItemId ? { ...item, ...newItem } : item
        )
      );
      resetNewItem();
      setEditItemId(null);
    } catch (error) {
      handleError("Failed to update item.");
    } finally {
      setLoadingState((prev) => ({ ...prev, isUpdating: false }));
    }
  }, [newItem, editItemId, animateItem, resetNewItem, handleError]);

  const deleteItem = useCallback(
    async (id) => {
      animateItem(id, "fadeOut");
      // Pulisce l'elemento dopo il ritardo per l'animazione
      setTimeout(async () => {
        try {
          const response = await fetch(`/api/items?id=${id}`, {
            method: "DELETE",
          });
          if (!response.ok) throw new Error("Network response was not ok");
          const deleteResult = await response.json();
          if (deleteResult.deletedCount > 0) {
            setItems((prev) => prev.filter((item) => item._id !== id));
          }
        } catch (error) {
          handleError("Failed to delete item.");
        }
      }, 1500); // Ritardo deve corrispondere alla durata dell'animazione
    },
    [animateItem, handleError]
  );

  const handleEditClick = useCallback((item) => {
    setEditItemId(item._id);
    setNewItem({
      title: item.title,
      description: item.description,
      category: item.category,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-10">
      <div className="p-8 rounded shadow-md w-full max-w-md bg-white border border-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          MongoDB App
        </h1>

        {/* Sezione Aggiungi/Modifica Item */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2 text-gray-700">
            {editItemId ? "Edit Item" : "Add New Item"}
          </h2>
          <div className="space-y-2">
            <input
              type="text"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            <input
              type="text"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            <input
              type="text"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              placeholder="Category"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />

            <button
              onClick={editItemId ? updateItem : addItem}
              disabled={loadingState.isAdding || !isValidNewItem()}
              className={`w-full p-2 rounded transition-transform transform ${
                loadingState.isAdding || loadingState.isUpdating
                  ? "bg-blue-300 text-white"
                  : !isValidNewItem()
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 transition-transform hover:scale-105"
              }`}
            >
              {loadingState.isAdding
                ? "Adding..."
                : loadingState.isUpdating
                ? "Updating..."
                : editItemId
                ? "Update Item"
                : "Add Item"}
            </button>
          </div>
        </div>

        {/* Sezione Lista Item */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4 text-gray-700">
            Items in Database
          </h2>
          {loadingState.isLoading ? (
            <div className="space-y-4">
              {/* Skeleton loading */}
              <div className="p-4 bg-gray-200 rounded border border-gray-300 shadow-md animate-pulse">
                <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-400 rounded w-1/2"></div>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item._id}
                  className={`p-4 bg-white rounded border border-black shadow-md transition-opacity duration-500 ease-in-out ${
                    animatingItems[item._id] === "fadeOut"
                      ? "animate-fadeOut"
                      : animatingItems[item._id] === "fadeIn"
                      ? "animate-fadeIn"
                      : animatingItems[item._id] === "pulse"
                      ? "animate-pulse opacity-80"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        Title: {item.title}
                      </h3>
                      <p className="text-gray-600">
                        Description: {item.description}
                      </p>
                      <p className="text-gray-600">Category: {item.category}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className={`bg-yellow-500 text-white p-1 rounded transition-transform transform ${
                          editItemId === item._id
                            ? "bg-yellow-600"
                            : "hover:bg-yellow-600"
                        }`}
                      >
                        {editItemId === item._id ? "Editing..." : "Edit"}
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-transform transform hover:scale-105"
                      >
                        {animatingItems[item._id] === "fadeOut"
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
