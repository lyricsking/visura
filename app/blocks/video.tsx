import Block from ".";

interface VideoBlockProps {
  url: string;
  autoplay: boolean;
}

export const VideoBlock: Block<VideoBlockProps> = {
  type: "",
  props: { url: "", autoplay: false },
  render: function (props: VideoBlockProps): JSX.Element {
    return <video src={props.url} autoPlay={props.autoplay} />;
  },
};
