export function customMarkdownParser(content: string) {
  return content
    .replace(/<< (.*?) <</g, '<div style="text-align: left;">$1</div>')
    .replace(/>> (.*?) >>/g, '<div style="text-align: right;">$1</div>')
    .replace(/== (.*?) ==/g, '<div style="text-align: justify;">$1</div>');
}
