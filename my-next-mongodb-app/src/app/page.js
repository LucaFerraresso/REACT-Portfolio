"use client";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [animatingItems, setAnimatingItems] = useState({});

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetch("/api/items");
      const data = await response.json();
      setItems(data);
      setIsLoading(false);
    }, 1500); // Delay to simulate loading
  };

  // Add new item to the database
  const addItem = async () => {
    setIsAdding(true);
    if (!newItem.title.trim() || !newItem.category.trim()) return;

    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const addedItem = await response.json();
    setNewItem({ title: "", description: "", category: "" });
    setAnimatingItems((prev) => ({
      ...prev,
      [addedItem._id]: "fadeIn",
    }));
    setItems((prev) => [...prev, addedItem]);

    setTimeout(() => {
      setIsAdding(false);
      setAnimatingItems((prev) => ({
        ...prev,
        [addedItem._id]: "",
      }));
    }, 1500); // Simulate fade-in duration
  };

  // Delete item from the database
  const deleteItem = async (id) => {
    setAnimatingItems((prev) => ({
      ...prev,
      [id]: "fadeOut",
    }));
    setTimeout(async () => {
      const response = await fetch(`/api/items?id=${id}`, {
        method: "DELETE",
      });
      const deleteResult = await response.json();
      if (deleteResult.deletedCount > 0) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
      setAnimatingItems((prev) => ({
        ...prev,
        [id]: "",
      }));
    }, 1500); // Simulate fade-out duration
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="p-8 rounded shadow-md w-full max-w-md bg-white border border-black">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          MongoDB App
        </h1>

        {/* Add Item Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2 text-gray-700">
            Add New Item
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
              onClick={addItem}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              {isAdding ? "Adding..." : "Add Item"}
            </button>
          </div>
        </div>

        {/* Items List Section */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4 text-gray-700">
            Items in Database
          </h2>
          {isLoading ? (
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
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      {animatingItems[item._id] === "fadeOut"
                        ? "Deleting..."
                        : "Delete"}
                    </button>
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
