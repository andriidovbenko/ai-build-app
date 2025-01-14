"use client";

import { useState, useEffect } from 'react';
import styles from './TemplatePreview.module.css';

export interface Template {
  id: string;
  name: string;
  content: string;
  previewMode: 'desktop' | 'tablet' | 'mobile';
}

interface TemplatePreviewProps {
  initialTemplate: Template;
  onSave: (template: Template) => void;
  initialEditMode?: boolean;
  onPreviewModeChange?: (mode: Template['previewMode']) => void;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  initialTemplate,
  onSave,
  initialEditMode = false,
  onPreviewModeChange,
}) => {
  const [template, setTemplate] = useState<Template>(initialTemplate);
  const [isEditing, setIsEditing] = useState(initialEditMode);

  useEffect(() => {
    setIsEditing(initialEditMode);
    setTemplate(initialTemplate);
  }, [initialTemplate, initialEditMode]);

  const handleDeviceChange = (mode: Template['previewMode']) => {
    setTemplate((prev) => ({ ...prev, previewMode: mode }));
    onPreviewModeChange?.(mode);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplate((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleSave = () => {
    onSave(template);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.deviceButtons}>
          <button
            onClick={() => handleDeviceChange('desktop')}
            className={template.previewMode === 'desktop' ? styles.active : ''}
          >
            Desktop
          </button>
          <button
            onClick={() => handleDeviceChange('tablet')}
            className={template.previewMode === 'tablet' ? styles.active : ''}
          >
            Tablet
          </button>
          <button
            onClick={() => handleDeviceChange('mobile')}
            className={template.previewMode === 'mobile' ? styles.active : ''}
          >
            Mobile
          </button>
        </div>
        <div className={styles.actionButtons}>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
      </div>

      <div className={`${styles.header} ${styles[template.previewMode]}`}>
        {isEditing ? (
          <input
            type="text"
            value={template.name}
            onChange={handleNameChange}
            className={styles.nameInput}
            placeholder="Template name"
          />
        ) : (
          <h2 className={styles.templateName}>{template.name}</h2>
        )}
      </div>

      <div className={`${styles.preview} ${styles[template.previewMode]}`}>
        {isEditing ? (
          <textarea
            value={template.content}
            onChange={handleContentChange}
            className={styles.editor}
          />
        ) : (
          <div className={styles.content}>{template.content}</div>
        )}
      </div>
    </div>
  );
}; 