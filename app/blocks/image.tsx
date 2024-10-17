import Block from ".";

interface ImageBlockProps {
  src: string;
  alt: string;
}

export const ImageBlock: Block<ImageBlockProps> = {
  type: "image",
  props: {
    src: "",
    alt: "",
  },
  render(props) {
    return <img src={props.src} alt={props.alt} />;
  },
};
