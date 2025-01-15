"use client";

import { Template } from '../TemplatePreview/TemplatePreview';
import styles from './TemplateSidebar.module.css';
import { useState, useEffect } from 'react';

interface TemplateSidebarProps {
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
  selectedTemplateId?: string;
  onNewTemplate: () => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const TemplateSidebar: React.FC<TemplateSidebarProps> = ({
  templates,
  onTemplateSelect,
  selectedTemplateId,
  onNewTemplate,
  onDeleteTemplate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  const handleNewTemplate = () => {
    onNewTemplate();
    setIsOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation(); // Prevent template selection when clicking delete
    onDeleteTemplate(templateId);
  };

  return (
    <>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.title}>Saved Templates</h2>
          <button onClick={handleNewTemplate} className={styles.newTemplateButton}>
            + New Template
          </button>
        </div>
        <div className={styles.templateList}>
          {templates.map((template) => (
            <div key={template.id} className={styles.templateItemWrapper}>
              <button
                onClick={() => {
                  onTemplateSelect(template);
                  setIsOpen(false);
                }}
                className={`${styles.templateItem} ${
                  template.id === selectedTemplateId ? styles.selected : ''
                }`}
              >
                {template.name}
              </button>
              <button
                onClick={(e) => handleDelete(e, template.id)}
                className={styles.deleteButton}
                title="Delete template"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}; 