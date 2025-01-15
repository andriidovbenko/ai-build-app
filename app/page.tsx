"use client";

import { useTemplate } from '@/contexts/TemplateContext';
import { TemplatePreview } from '@/components/TemplatePreview';
import { TemplateSidebar } from '@/components/TemplateSidebar';
import { useToast } from '@chakra-ui/react';
import { Flex, Box, Text, Button, VStack } from '@chakra-ui/react';

export default function Home() {
  const { selectedTemplate, createNewTemplate } = useTemplate();
  const toast = useToast();

  return (
    <Flex w="100%" minH="100vh">
      <TemplateSidebar />
      <Box 
        as="main" 
        flex={1} 
        p={4}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
      >
        {selectedTemplate ? (
          <TemplatePreview />
        ) : (
          <VStack 
            spacing={4} 
            p={8} 
            borderRadius="md" 
            bg="gray.50"
            mt={20}
          >
            <Text>Select a template or</Text>
            <Button
              onClick={createNewTemplate}
              bg="#ffd700"
              _hover={{ bg: '#ffed4a' }}
            >
              Create New Template
            </Button>
          </VStack>
        )}
      </Box>
    </Flex>
  );
}
