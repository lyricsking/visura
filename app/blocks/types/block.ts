interface Block<T> {
  type: string; // Unique type identifier for the block
  props: T; // Props specific to the block
  render: (props: T) => JSX.Element; // Function to render the block
}