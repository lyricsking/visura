import { Block } from "~/blocks/types/block";

export class ImageBlock implements Block {
  id: string;
  type: string = "image";
  src: string;
  alt: string;

  constructor(id: string, src: string, alt: string) {
    this.id = id;
    this.src = src;
    this.alt = alt;
  }

  render() {
    return <img src={this.src} alt={this.alt} />;
  }
}

declare module "~/blocks/types/block" {
  interface BlockTypes {
    // You can dynamically add more block types here if needed
    image: ImageBlock;
  }
}
