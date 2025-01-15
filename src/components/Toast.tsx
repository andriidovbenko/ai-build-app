"use client";

import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  duration = 3000, 
  onClose 
}) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      description: message,
      status: 'success',
      duration,
      position: 'bottom',
      isClosable: true,
      onCloseComplete: onClose
    });
  }, [message, duration, onClose, toast]);

  return null;
}; 