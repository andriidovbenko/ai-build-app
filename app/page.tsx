"use client";

import { useState } from 'react';
import { Template, TemplatePreview } from '../src/components/TemplatePreview/TemplatePreview';
import { TemplateSidebar } from '../src/components/TemplateSidebar/TemplateSidebar';
import { Toast } from '../src/components/Toast/Toast';
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
  const [showToast, setShowToast] = useState(false);

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
    setShowToast(true);
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

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
    setShowToast(true);
  };

  return (
    <div className={styles.container}>
      <TemplateSidebar
        templates={templates}
        onTemplateSelect={handleTemplateSelect}
        selectedTemplateId={selectedTemplate?.id}
        onNewTemplate={handleNewTemplate}
        onDeleteTemplate={handleDeleteTemplate}
      />
      <main className={styles.main}>
        {selectedTemplate ? (
          <TemplatePreview
            initialTemplate={selectedTemplate}
            onSave={handleSave}
            initialEditMode={selectedTemplate.id === 'new'}
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
      {showToast && (
        <Toast 
          message={selectedTemplate ? "Template was saved" : "Template was deleted"} 
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
