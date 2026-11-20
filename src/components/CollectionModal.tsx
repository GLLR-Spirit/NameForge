import React, { useState } from 'react';
import { useEscapeKey, useModalFocus } from '../hooks';
import { X, FolderPlus, Check } from 'lucide-react';
import { createCollection, updateCollection } from '../services/storage';
import { NamedCollection } from '../types';
import { getAppSettings } from '../services/settings';
import { getCollectionModalLabels } from '../i18n/collectionModal';

interface CollectionModalProps {
  collection?: NamedCollection | null;
  onClose: () => void;
  onSaved: () => void;
}

const COLOR_OPTIONS = [
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#eab308', // Amber
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#f97316', // Orange
];

export const CollectionModal: React.FC<CollectionModalProps> = ({
  collection,
  onClose,
  onSaved,
}) => {
  useEscapeKey(onClose);
  const modalRef = useModalFocus<HTMLDivElement>();
  const [name, setName] = useState(collection?.name || '');
  const [description, setDescription] = useState(collection?.description || '');
  const [color, setColor] = useState(collection?.color || '#8b5cf6');
  const [success, setSuccess] = useState(false);
  const t = getCollectionModalLabels(getAppSettings().language);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (collection) {
      updateCollection(collection.id, name.trim(), description.trim(), color);
    } else {
      createCollection(name.trim(), description.trim(), color);
    }

    setSuccess(true);
    onSaved();
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-modal-title"
        className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-2xl relative text-start text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg transition cursor-pointer"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-violet-500/20 text-blue-700 dark:text-violet-300 flex items-center justify-center">
            <FolderPlus className="w-4 h-4" />
          </div>
          <h3 id="collection-modal-title" className="text-base font-bold text-slate-950 dark:text-white">
            {collection ? t.titleEdit : t.titleNew}
          </h3>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-5">
          {t.intro}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-violet-300 mb-1.5">
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="nf-input w-full h-10 px-3 text-xs"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-violet-300 mb-1.5">
              {t.descriptionLabel}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder={t.descriptionPlaceholder}
              className="nf-input w-full p-3 text-xs resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-violet-300 mb-1.5">
              {t.colorLabel}
            </label>
            <div className="flex items-center gap-2.5">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  aria-label={`${t.colorLabel}: ${c}`}
                  aria-pressed={color === c}
                  className={`w-7 h-7 rounded-full transition transform cursor-pointer ${
                    color === c ? 'scale-125 ring-2 ring-slate-900 dark:ring-white shadow-lg' : 'opacity-75 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="nf-btn-secondary px-4 py-2 text-xs cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="nf-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {success ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.saved}</span>
                </>
              ) : (
                <span>{t.save}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
