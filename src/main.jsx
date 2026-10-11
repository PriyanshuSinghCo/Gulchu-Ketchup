import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './landing_page/home/HomePage';
import RecipesHero from './landing_page/Recipes/RecipesHero';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import GoToTop from './landing_page/GoToTop';
import { CartProvider } from './context/CartContext';
import RouteSeo from './landing_page/RouteSeo';
import { MotionConfig } from 'framer-motion';
import { ScrollToTop, PageTransition, ScrollProgress, CartToast } from './landing_page/SiteMotion';

const AboutPage = lazy(() => import('./landing_page/about/AboutPage'));
const ContactPage = lazy(() => import('./landing_page/contact/ContactPage'));
const ProductPage = lazy(() => import('./landing_page/product/productPage'));
const PageNotFound = lazy(() => import('./landing_page/PageNotFound'));
const TomatoKetchup = lazy(() => import('./landing_page/product/subProduct.jsx/TomatoKetchup'));
const RedChilli = lazy(() => import('./landing_page/product/subProduct.jsx/RedChilli'));
const GreenChilli = lazy(() => import('./landing_page/product/subProduct.jsx/GreenChilli'));
const SchezwanChutney = lazy(() => import('./landing_page/product/subProduct.jsx/SchezwanChutney'));
const PizzaPastaSauce = lazy(() => import('./landing_page/product/subProduct.jsx/PizzaPastaSauce'));
const GarlicPaste = lazy(() => import('./landing_page/product/subProduct.jsx/GarlicPaste'));
const Pickles = lazy(() => import('./landing_page/product/subProduct.jsx/Pickles'));
const VegMayonnaise = lazy(() => import('./landing_page/product/subProduct.jsx/VegMayonnaise'));
const MomosChutney = lazy(() => import('./landing_page/product/subProduct.jsx/MomosChutney'));
const SoyaSauce = lazy(() => import('./landing_page/product/subProduct.jsx/SoyaSauce'));
const Company = lazy(() => import('./landing_page/about/subAbout/Company'));
const Director = lazy(() => import('./landing_page/about/subAbout/Director'));
const ManagementTeam = lazy(() => import('./landing_page/about/subAbout/ManagementTeam'));
const Video = lazy(() => import('./landing_page/about/subAbout/Video'));
const CartPage = lazy(() => import('./landing_page/cart/CartPage'));
const CheckoutPage = lazy(() => import('./landing_page/checkout/CheckoutPage'));

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
              <Suspense fallback={<div className="min-h-[70vh]" />}>
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
              </Suspense>
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
