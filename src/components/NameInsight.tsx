import React from 'react';
import { GeneratedName, GeneratorMeta } from '../types';
import { CompleteNameAnalysisModal } from './CompleteNameAnalysisModal';

interface NameInsightProps {
  item: GeneratedName;
  meta: GeneratorMeta;
  onClose: () => void;
}

export const NameInsight: React.FC<NameInsightProps> = ({ item, meta, onClose }) => (
  <CompleteNameAnalysisModal item={item} meta={meta} onClose={onClose} />
);
