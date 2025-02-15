import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";

const CarouselSlide = () => {
  const items = [
    {
      id: "Banner img 1",
      image: "Banner/Banner1.jpg",
      caption1: "Discover Your Signature Scent",
      caption2: "At our Perfume Shop, we believe in the power of a personal fragrance. From fresh floral notes to deep, spicy undertones, explore scents that are as unique as you are. Find the fragrance that speaks to your style and leaves a lasting impression."
    },
    {
      id: "Banner img 2",
      image: "Banner/Banner2.jpg",
      caption1: "Embrace Luxury in Every Drop",
      caption2: "Elevate your fragrance experience with our carefully curated collection of luxury perfumes. Each scent tells a story, blending high-quality ingredients for a lasting allure. Step into a world of elegance and find the perfect match for your sophisticated taste."
    },
    {
      id: "Banner img 3",
      image: "Banner/Banner3.jpg",
      caption1: "Indulge in the Art of Fragrance",
      caption2: "Perfume is more than a scent; it’s an art form. Our range of perfumes invites you to indulge in aromatic masterpieces crafted by expert perfumers. Discover scents that are bold, subtle, or seductive, tailored to complement every mood and occasion."
    },
  ];
  return (
    <Carousel indicators={false}>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default CarouselSlide;