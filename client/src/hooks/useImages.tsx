export enum IMAGES_FOR {
  CAROUSEL,
}

const carousel = require.context('/src/assets/carousel', false, /\.(png|jpe?g|svg)$/);
const carouselList: Array<string> = carousel.keys().map((image) => carousel(image));

const useImages = (imageFor: IMAGES_FOR) => {
  switch (imageFor) {
    case IMAGES_FOR.CAROUSEL:
      return carouselList;
    default:
      return [];
  }
};

export default useImages;
