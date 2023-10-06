import { IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useImages, { IMAGES_FOR } from "../../hooks/useImages";
import CarouselItem from "./CarouselItem";
import { Box } from "@mui/system";

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const carouselImages = useImages(IMAGES_FOR.CAROUSEL);
  return (
    <Carousel
      infiniteLoop={true}
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
          onClick={onClickHandler}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {carouselImages.map((imgSrc: string, index: number) => (
        <CarouselItem
          key={`carouselItem-image-${index}-${Math.floor(
            Math.random() * 10000
          )}`}
          isNonMobile={isNonMobile}
          imageSrc={imgSrc}
          index={index}
        />
      ))}
    </Carousel>
  );
};

export default MainCarousel;
