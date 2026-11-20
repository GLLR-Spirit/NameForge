import React from 'react';
import { GeneratedName } from '../types';
import { CompleteNameAnalysisModal } from './CompleteNameAnalysisModal';

interface NameDetailsModalProps {
  nameItem: GeneratedName;
  onClose: () => void;
  onUpdate?: () => void;
}

export const NameDetailsModal: React.FC<NameDetailsModalProps> = ({
  nameItem,
  onClose,
  onUpdate,
}) => (
  <CompleteNameAnalysisModal item={nameItem} onClose={onClose} onUpdate={onUpdate} />
);
