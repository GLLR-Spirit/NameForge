import React, { useEffect, useState } from 'react';
import { FolderOpen, Trash2, RefreshCw, Save, Check, X } from 'lucide-react';
import {
  createSavedProject,
  deleteSavedProject,
  getSavedProjects,
  restoreSavedProject,
  subscribeToStorage,
} from '../services/storage';
import { SavedProject } from '../types';
import { getAppSettings, subscribeToSettings } from '../services/settings';
import { getProjectWorkspaceCopy } from '../i18n/moduleLabels';

export const ProjectWorkspace: React.FC = () => {
  const [language, setLanguage] = useState(() => getAppSettings().language);
  useEffect(() => subscribeToSettings((next) => setLanguage(next.language)), []);
  const t = getProjectWorkspaceCopy(language);
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const reload = () => setProjects(getSavedProjects());
  useEffect(() => {
    reload();
    return subscribeToStorage(reload);
  }, []);

  const handleCreate = () => {
    const project = createSavedProject(name, description);
    if (!project) {
      setStatus(t.error);
      return;
    }
    setName('');
    setDescription('');
    setStatus(t.created);
    reload();
  };

  const handleRestore = (id: string) => {
    const result = restoreSavedProject(id);
    setStatus(result.success ? t.restored : (result.errors[0] || t.error));
    reload();
  };

  const handleConfirmDelete = (id: string) => {
    setStatus(deleteSavedProject(id) ? t.removed : t.error);
    setConfirmDeleteId(null);
    reload();
  };

  return (
    <section className="nf-project-workspace nf-surface p-4 sm:p-6 space-y-4" aria-labelledby="saved-projects-title">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-[var(--nf-primary-soft)] text-[var(--nf-primary)] flex items-center justify-center">
          <FolderOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 id="saved-projects-title" className="text-lg font-extrabold text-[var(--nf-ink)]">
            {t.title}
          </h2>
          <p className="text-xs text-[var(--nf-muted)] mt-1">{t.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_auto] gap-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={80}
          placeholder={t.name}
          aria-label={t.name}
          className="nf-input min-w-0 h-10 px-3 text-sm"
        />
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={240}
          placeholder={t.details}
          aria-label={t.details}
          className="nf-input min-w-0 h-10 px-3 text-sm"
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={!name.trim()}
          className="nf-btn-primary h-10 px-4 text-xs inline-flex items-center justify-center gap-2 disabled:opacity-45 cursor-pointer whitespace-nowrap"
        >
          <Save className="w-4 h-4" />
          <span>{t.create}</span>
        </button>
      </div>

      {status && (
        <p role="status" aria-live="polite" className="text-xs font-medium text-[var(--nf-secondary-ink)]">
          {status}
        </p>
      )}

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--nf-subtle)] py-3">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {projects.map((project) => (
            <article key={project.id} className="nf-panel p-4 space-y-3">
              <div>
                <h3 className="font-bold text-sm text-[var(--nf-ink)]">{project.name}</h3>
                {project.description && (
                  <p className="text-xs text-[var(--nf-muted)] mt-1">{project.description}</p>
                )}
                <p className="text-[11px] text-[var(--nf-subtle)] mt-2 tabular-nums">
                  {t.counts(project)}
                </p>
                <p className="text-[10px] text-[var(--nf-subtle)] mt-1 tabular-nums">
                  {new Date(project.updatedAt).toLocaleString(language)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRestore(project.id)}
                  className="nf-btn-secondary px-3 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[var(--nf-secondary-ink)]" />
                  <span>{t.restore}</span>
                </button>

                {confirmDeleteId === project.id ? (
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleConfirmDelete(project.id)}
                      className="px-3 py-1.5 rounded-lg bg-[var(--nf-danger-bg)] border border-[var(--nf-danger-border)] text-[var(--nf-danger)] text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.confirmDelete}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className="nf-btn-ghost px-2.5 py-1.5 text-xs inline-flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{t.cancel}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(project.id)}
                    className="px-3 py-1.5 rounded-lg bg-[var(--nf-danger-bg)] border border-[var(--nf-danger-border)] text-[var(--nf-danger)] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.remove}</span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
