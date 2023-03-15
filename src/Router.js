import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Partials
import Header from "./components/partial/Header";
import Footer from "./components/partial/Footer";

// Pages
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import RecipeDetail from "./components/RecipeDetail";

export default class ReactRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={
            <>
            <Header />
            <SearchResults />
            </>
        } />
          <Route path="/recipe-details/:id" element={
            <>
            <Header />
            <RecipeDetail />
            </>
        } />
          
        </Routes>
        <Footer />
      </HashRouter>
    );
  }
}
