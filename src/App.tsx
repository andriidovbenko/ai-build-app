"use client";

import { Template, TemplatePreview } from './components/TemplatePreview/TemplatePreview';

function App() {
  const initialTemplate = {
    id: '1',
    name: 'Sample Template',
    content: 'This is a sample template content.\nYou can edit this text.',
    previewMode: 'desktop' as const,
  };

  const handleSave = (template: Template) => {
    console.log('Saving template:', template);
    // Implement your save logic here
  };

  return (
    <div>
      <h1>Template Preview</h1>
      <TemplatePreview 
        initialTemplate={initialTemplate} 
        onSave={handleSave} 
      />
    </div>
  );
}

export default App; 