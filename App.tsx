import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import { useFilter } from "./components/FilterContext";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs"; // Adjusted import path

const App: React.FC = () => {
  console.log("App: Rendering App component");

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
    filter,
    setFilter,
  } = useFilter();

  console.log("App: Filter context values:", {
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    keyword,
    filter,
  });

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  keyword={keyword}
                />
              }
            />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <div className="top-sellers">
            <TopSellers />
          </div>
          <div className="popular-blogs">
            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;