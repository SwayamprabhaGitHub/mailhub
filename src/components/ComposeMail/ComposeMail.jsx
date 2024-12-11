import React, { useState } from 'react';
import TextEditor from './TextEditor';

const ComposeMail = ({ to, setTo, subject, setSubject, editorContent, setEditorContent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
      <div className="mb-0">
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          className="w-full p-2 border border-b-slate-300 border-t-0 border-r-0 border-l-0 focus:outline-none"
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="w-full p-2 border border-b-slate-300 border-t-0 border-r-0 border-l-0 focus:outline-none"
        />
      </div>
      <div className="text-editor-container">
        {/* Use the TextEditor component */}
        <TextEditor
          value={editorContent}
          onChange={setEditorContent}
        />
      </div>
    </div>
  );
};

export default ComposeMail;
