import React from 'react'
import Hero from './Hero';
import TopSellingItems from './TopSellingItems';
import OurStory from './Story';
import RecipesHero from './../Recipes/RecipesHero';

function HomePage() {
  return (
    <div>
        <Hero />
         <OurStory/>
         <RecipesHero/>
        <TopSellingItems />
       
    </div>
  )
}

export default HomePage;