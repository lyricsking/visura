import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/shared/components/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "anshu.jpg",
  "bottle-hands.jpg",
  "capsules.jpg",
  "jellybee.jpg",
  "orange-pills-xs.jpg",
  "powders.jpg",
];

export default function HomeCarousel() {
  const imagesUrl = "/images/";
  return (
    <Carousel
      className="w-full"
      orientation="horizontal"
      opts={{ align: "center", loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent className="-px-8">
        {images.map((image, index) => (
          <CarouselItem key={index} className="aspect-w-5 aspect-h-3">
            <div className="flex-[0_0_100%] border flex items-center justify-center">
              <img
                className="object-cover"
                src={imagesUrl + image}
                alt={"carousel image " + image}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
