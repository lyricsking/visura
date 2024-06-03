import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const NumberedLineInputForm = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [sanitizedHtmlContent, setSanitizedHtmlContent] = useState('');

  const handleChange = (e) => {
    setHtmlContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sanitize HTML content
    const sanitizedHtml = DOMPurify.sanitize(htmlContent);
    setSanitizedHtmlContent(sanitizedHtml);
  };

  return (
    <div className="flex flex-col items-center w-4/5 mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative w-full">
          <textarea
            className="w-full h-64 p-2 pl-12 font-mono whitespace-pre overflow-auto resize-y border border-gray-300 rounded-lg"
            value={htmlContent}
            onChange={handleChange}
            placeholder="Enter HTML content"
            rows={10}
          ></textarea>
          <div className="absolute top-2 left-2 text-gray-400 select-none pointer-events-none">
            {Array.from({ length: htmlContent.split('\n').length }).map((_, index) => (
              <div key={index} className="leading-6">{index + 1}</div>
            ))}
          </div>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
      </form>
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold mb-2">Rendered HTML:</h3>
        <div className="p-4 border border-gray-300 rounded-lg" dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}></div>
      </div>
    </div>
  );
};

export default NumberedLineInputForm;
