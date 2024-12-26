export function customMarkdownParser(content: string) {
  return content
    .replace(/::left::(.*?)::/gs, '<div style="text-align: left;">$1</div>')
    .replace(/::right::(.*?)::/gs, '<div style="text-align: right;">$1</div>')
    .replace(
      /::justify::(.*?)::/gs,
      '<div style="text-align: justify;">$1</div>'
    );
}
