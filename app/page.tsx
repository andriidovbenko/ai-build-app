"use client";

import { useState } from 'react';
import { Template, TemplatePreview } from '../src/components/TemplatePreview/TemplatePreview';
import { TemplateSidebar } from '../src/components/TemplateSidebar/TemplateSidebar';
import styles from './page.module.css';

const DEFAULT_TEMPLATE: Template = {
  id: 'new',
  name: 'New Template',
  content: 'Start typing your content here...',
  previewMode: 'desktop' as const,
};

export default function Home() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentPreviewMode, setCurrentPreviewMode] = useState<Template['previewMode']>('desktop');

  const handleSave = (template: Template) => {
    const isNew = template.id === 'new';
    const updatedTemplate = {
      ...template,
      id: isNew ? Date.now().toString() : template.id,
      previewMode: currentPreviewMode,
    };

    setTemplates(prev => {
      if (isNew) {
        return [...prev, updatedTemplate];
      }
      return prev.map(t => t.id === template.id ? updatedTemplate : t);
    });
    
    setSelectedTemplate(updatedTemplate);
  };

  const handleNewTemplate = () => {
    const newTemplate = { ...DEFAULT_TEMPLATE, previewMode: currentPreviewMode };
    setSelectedTemplate(newTemplate);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate({ ...template, previewMode: currentPreviewMode });
  };

  const handlePreviewModeChange = (mode: Template['previewMode']) => {
    setCurrentPreviewMode(mode);
    if (selectedTemplate) {
      setSelectedTemplate({ ...selectedTemplate, previewMode: mode });
    }
  };

  return (
    <div className={styles.container}>
      <TemplateSidebar
        templates={templates}
        onTemplateSelect={handleTemplateSelect}
        selectedTemplateId={selectedTemplate?.id}
        onNewTemplate={handleNewTemplate}
      />
      <main className={styles.main}>
        {selectedTemplate ? (
          <TemplatePreview
            initialTemplate={selectedTemplate}
            onSave={handleSave}
            initialEditMode={true}
            onPreviewModeChange={handlePreviewModeChange}
          />
        ) : (
          <div className={styles.empty}>
            <p>Select a template or</p>
            <button onClick={handleNewTemplate} className={styles.newButton}>
              Create New Template
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
