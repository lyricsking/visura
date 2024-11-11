type TextBlockProps = {
  content: string;
};
export function TextBlock({content}: TextBlockProps) {
  return (
    <div className="p-4 bg-gray-200 my-2 rounded">
      <p>{content}</p>
    </div>
  );
}
