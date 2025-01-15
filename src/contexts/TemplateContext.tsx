'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { Template } from '@/types/Template';

interface TemplateContextType {
  templates: Template[];
  selectedTemplate: Template | null;
  currentPreviewMode: Template['previewMode'];
  addTemplate: (template: Template) => void;
  updateTemplate: (template: Template) => void;
  deleteTemplate: (templateId: string) => void;
  selectTemplate: (template: Template | null) => void;
  setPreviewMode: (mode: Template['previewMode']) => void;
  createNewTemplate: () => void;
}

const DEFAULT_TEMPLATE: Template = {
  id: 'new',
  name: '',
  content: '',
  previewMode: 'desktop' as const,
};

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentPreviewMode, setCurrentPreviewMode] = useState<Template['previewMode']>('desktop');

  const addTemplate = (template: Template) => {
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

  const updateTemplate = (template: Template) => {
    setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
  };

  const selectTemplate = (template: Template | null) => {
    setSelectedTemplate(template ? { ...template, previewMode: currentPreviewMode } : null);
  };

  const setPreviewMode = (mode: Template['previewMode']) => {
    setCurrentPreviewMode(mode);
    if (selectedTemplate) {
      setSelectedTemplate({ ...selectedTemplate, previewMode: mode });
    }
  };

  const createNewTemplate = () => {
    const newTemplate = { ...DEFAULT_TEMPLATE, previewMode: currentPreviewMode };
    setSelectedTemplate(newTemplate);
  };

  return (
    <TemplateContext.Provider value={{
      templates,
      selectedTemplate,
      currentPreviewMode,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      selectTemplate,
      setPreviewMode,
      createNewTemplate,
    }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
} 