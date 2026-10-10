import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './landing_page/home/HomePage';
import AboutPage from './landing_page/about/AboutPage';
import ContactPage from './landing_page/contact/ContactPage';
import ProductPage from './landing_page/product/productPage';
import PageNotFound from './landing_page/PageNotFound';
import Navbar from './landing_page/Navbar';
import RecipesHero from './landing_page/Recipes/RecipesHero';
import TomatoKetchup from './landing_page/product/subProduct.jsx/TomatoKetchup';
import RedChilli from './landing_page/product/subProduct.jsx/RedChilli';
import GreenChilli from './landing_page/product/subProduct.jsx/GreenChilli';
import SchezwanChutney from './landing_page/product/subProduct.jsx/SchezwanChutney';
import PizzaPastaSauce from './landing_page/product/subProduct.jsx/PizzaPastaSauce';
import GarlicPaste from './landing_page/product/subProduct.jsx/GarlicPaste';
import Pickles from './landing_page/product/subProduct.jsx/Pickles';
import VegMayonnaise from './landing_page/product/subProduct.jsx/VegMayonnaise';
import MomosChutney from './landing_page/product/subProduct.jsx/MomosChutney';
import SoyaSauce from './landing_page/product/subProduct.jsx/SoyaSauce';
import Company from './landing_page/about/subAbout/Company';
import Director from './landing_page/about/subAbout/Director';
import ManagementTeam from './landing_page/about/subAbout/ManagementTeam';
import Video from './landing_page/about/subAbout/Video';
import Footer from './landing_page/Footer';
import GoToTop from './landing_page/GoToTop';
import CartPage from './landing_page/cart/CartPage';
import CheckoutPage from './landing_page/checkout/CheckoutPage';
import { CartProvider } from './context/CartContext';
import RouteSeo from './landing_page/RouteSeo';
import { MotionConfig } from 'framer-motion';
import { ScrollToTop, PageTransition, ScrollProgress, CartToast } from './landing_page/SiteMotion';

createRoot(document.getElementById("root")).render(
      <CartProvider>
        <BrowserRouter>
          <MotionConfig reducedMotion="user">
          <RouteSeo />
          <ScrollToTop />
          <ScrollProgress />
          <div className="flex min-h-dvh w-full max-w-full min-w-0 flex-col overflow-x-clip">
            <Navbar />
            <main className="w-full max-w-full min-w-0 flex-1 overflow-x-clip">
              <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/about/company" element={<Company />}></Route>
                <Route path="/about/director" element={<Director />}></Route>
                <Route path="/about/ManagementTeam" element={<ManagementTeam />}></Route>
                <Route path="/about/video" element={<Video />}></Route>

                <Route path="/contact" element={<ContactPage />}></Route>
                <Route path="/product" element={<ProductPage />}></Route>
                <Route path="/product/TomatoKetchup" element={<TomatoKetchup />}></Route>
                <Route path="/product/RedChilliSauce" element={<RedChilli />}></Route>
                <Route path="/product/GreenChilli" element={<GreenChilli />}></Route>
                <Route path="/product/SchezwanChutney" element={<SchezwanChutney />}></Route>
                <Route path="/product/PizzaPastaSauce" element={<PizzaPastaSauce />}></Route>
                <Route path="/product/GarlicPaste" element={<GarlicPaste />}></Route>
                <Route path="/product/Pickles(Achar)" element={<Pickles />}></Route>
                <Route path="/product/VegMayonnaise" element={<VegMayonnaise />}></Route>
                <Route path="/product/MomosChutney" element={<MomosChutney />}></Route>
                <Route path="/product/SoyaSauce" element={<SoyaSauce />}></Route>
                <Route path="/recipe" element={<RecipesHero/>}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/checkout" element={<CheckoutPage />}></Route>
                <Route path="/*" element={<PageNotFound />}></Route>
              </Routes>
              </PageTransition>
            </main>
            <GoToTop />
            <CartToast />
            <Footer />
          </div>
          </MotionConfig>
        </BrowserRouter>
      </CartProvider>
);
