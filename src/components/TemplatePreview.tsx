"use client";

import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Input, 
  Textarea, 
  HStack, 
  VStack,
  Text,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Template } from '@/types/Template';
import { useTemplate } from '@/contexts/TemplateContext';

// Create motion components
const MotionBox = motion(Box);
const MotionInput = motion(Input);
const MotionText = motion(Text);

// Add this near the top of the file, outside the component
const PREVIEW_MODES: Template['previewMode'][] = ['desktop', 'tablet', 'mobile'];

export const TemplatePreview = () => {
  const { 
    selectedTemplate,
    addTemplate,
    setPreviewMode,
    currentPreviewMode
  } = useTemplate();
  const toast = useToast();

  const [template, setTemplate] = useState<Template>(selectedTemplate!);
  const [isEditing, setIsEditing] = useState(selectedTemplate?.id === 'new');

  useEffect(() => {
    setIsEditing(selectedTemplate?.id === 'new');
    setTemplate(selectedTemplate!);
  }, [selectedTemplate]);

  const handleDeviceChange = (mode: Template['previewMode']) => {
    setTemplate((prev: Template) => ({ ...prev, previewMode: mode }));
    setPreviewMode(mode);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplate((prev: Template) => ({ ...prev, content: e.target.value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prev: Template) => ({ ...prev, name: e.target.value }));
  };

  const handleSave = () => {
    if (!template.name.trim()) {
      toast({
        description: "Please enter a template name",
        status: 'error',
        duration: 3000,
        position: 'bottom',
      });
      return;
    }

    if (!template.content.trim()) {
      toast({
        description: "Please enter some content",
        status: 'error',
        duration: 3000,
        position: 'bottom',
      });
      return;
    }

    addTemplate(template);
    setIsEditing(false);
    toast({
      description: "Template saved successfully",
      status: 'success',
      duration: 3000,
      position: 'bottom',
    });
  };

  const getPreviewWidth = () => {
    switch (template.previewMode) {
      case 'desktop':
        return 'min(1200px, 1000%)';
      case 'tablet':
        return 'min(768px, 1000%)';
      case 'mobile':
        return 'min(375px, 100%)'
    }
  };

  return (
    <VStack spacing={4} w="100%" p={4}>
      <Box
        mt={{ base: '40px', md: '0' }}
        w="100%"
        bg="gray.100"
        p={4}
        borderRadius="md"
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <HStack spacing={2} w={{ base: '100%', md: 'auto' }} justify="center">
            {PREVIEW_MODES.map((mode) => (
              <Button
                key={mode}
                onClick={() => handleDeviceChange(mode)}
                bg={template.previewMode === mode ? 'orange.400' : '#ffd700'}
                color={template.previewMode === mode ? 'white' : 'gray.800'}
                _hover={{ bg: template.previewMode === mode ? 'orange.500' : '#ffed4a' }}
                flex={{ base: 1, md: 'auto' }}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </HStack>
          <HStack spacing={2} w={{ base: '100%', md: 'auto' }} justify="center">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              bg="#ffd700"
              _hover={{ bg: '#ffed4a' }}
              flex={{ base: 1, md: 'auto' }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && (
              <Button
                onClick={handleSave}
                bg="#ffd700"
                _hover={{ bg: '#ffed4a' }}
                flex={{ base: 1, md: 'auto' }}
              >
                Save
              </Button>
            )}
          </HStack>
        </Flex>
      </Box>

      <MotionBox 
        w={getPreviewWidth()}
        maxW={'100%'}
        mx="auto"
        layout
        transition={{ duration: 0.3 }}
      >
        {isEditing ? (
          <MotionInput
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            value={template.name}
            onChange={handleNameChange}
            fontSize="xl"
            p={2}
            mb={4}
            borderColor="gray.200"
            placeholder="Template name"
          />
        ) : (
          <MotionText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            fontSize="xl" 
            p={2} 
            mb={4}
            placeholder='Template name'
          >
            {template.name}
          </MotionText>
        )}
      </MotionBox>

      <MotionBox
        w={getPreviewWidth()}
        maxW="100%"
        minH={template.previewMode === 'mobile' ? '400px' : template.previewMode === 'tablet' ? '600px' : '800px'}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        mx="auto"
        layout
        transition={{ duration: 0.3 }}
        h="100%"
        display="flex"
        flexDirection="column"
      >
        {isEditing ? (
          <Textarea
            as={motion.textarea}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            value={template.content}
            onChange={handleContentChange}
            flex={1}
            minH="300px"
            resize="none"
            borderColor="gray.200"
            placeholder='Write your content here...'
          />
        ) : (
          <MotionText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whiteSpace="pre-wrap"
            flex={1}
          >
            {template.content}
          </MotionText>
        )}
      </MotionBox>
    </VStack>
  );
}; 