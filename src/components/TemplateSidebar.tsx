"use client";

import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useTemplate } from '@/contexts/TemplateContext';

export const TemplateSidebar = () => {
  const { 
    templates, 
    selectedTemplate, 
    selectTemplate, 
    createNewTemplate, 
    deleteTemplate 
  } = useTemplate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [isOpen]);

  const handleNewTemplate = () => {
    createNewTemplate();
    setIsOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation();
    deleteTemplate(templateId);
  };

  return (
    <>
      <Button
        display={{ base: 'block', md: 'none' }}
        position="fixed"
        top="0.5rem"
        left="0.5rem"
        zIndex={1000}
        onClick={() => setIsOpen(!isOpen)}
        bg="#ffd700"
        _hover={{ bg: '#ffed4a' }}
      >
        {isOpen ? '✕' : '☰'}
      </Button>
      
      <Box
        w="250px"
        bg="#f5f5f5"
        p="1rem"
        borderRightWidth="1px"
        h="100vh"
        position={{ base: 'fixed', md: 'relative' }}
        left={0}
        top={0}
        transform={{ base: isOpen ? 'translateX(0)' : 'translateX(-100%)', md: 'none' }}
        transition="transform 0.3s ease"
        zIndex={999}
        pt={{ base: '4rem', md: '1rem' }}
      >
        <Stack direction="column" alignItems="stretch">
          <Heading size="md" textAlign="center">Saved Templates</Heading>
          <Button
            onClick={handleNewTemplate}
            bg="#ffd700"
            _hover={{ bg: '#ffed4a' }}
            w="100%"
          >
            + New Template
          </Button>
          <Stack direction="column" alignItems="stretch">
            {templates.map((template) => (
              <Flex key={template.id} gap="0.5rem">
                <Button
                  onClick={() => {
                    selectTemplate(template);
                    setIsOpen(false);
                  }}
                  flex={1}
                  textAlign="left"
                  bg={template.id === selectedTemplate?.id ? '#ffd700' : 'white'}
                  _hover={{ bg: template.id === selectedTemplate?.id ? '#ffd700' : '#ffd70020' }}
                >
                  {template.name}
                </Button>
                <Button
                  onClick={(e) => handleDelete(e, template.id)}
                  bg="#ff4444"
                  color="white"
                  _hover={{ bg: '#ff0000' }}
                  size="sm"
                  px="0.5rem"
                >
                  ✕
                </Button>
              </Flex>
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}; 