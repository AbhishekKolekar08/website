// src/components/Output.js

import React from 'react';

const Output = ({ content }) => {
  return (
    <div style={{ width: '1100px', height: '800px', overflowY: 'scroll', border: '1px solid #ccc' }}>
      <pre>{content}</pre>
    </div>
  );
};

export default Output;
