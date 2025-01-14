"use client";

import { Template } from '../TemplatePreview/TemplatePreview';
import styles from './TemplateSidebar.module.css';

interface TemplateSidebarProps {
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
  selectedTemplateId?: string;
  onNewTemplate: () => void;
}

export const TemplateSidebar: React.FC<TemplateSidebarProps> = ({
  templates,
  onTemplateSelect,
  selectedTemplateId,
  onNewTemplate,
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.title}>Saved Templates</h2>
        <button onClick={onNewTemplate} className={styles.newTemplateButton}>
          + New Template
        </button>
      </div>
      <div className={styles.templateList}>
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`${styles.templateItem} ${
              template.id === selectedTemplateId ? styles.selected : ''
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}; 