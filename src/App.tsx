import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useGeneratorLocalization } from './hooks/useGeneratorLocalization';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
const HomeView = lazy(() => import('./views/HomeView').then((module) => ({ default: module.HomeView })));
const GeneratorsListView = lazy(() => import('./views/GeneratorsListView').then((module) => ({ default: module.GeneratorsListView })));
const GeneratorDetailView = lazy(() => import('./views/GeneratorDetailView').then((module) => ({ default: module.GeneratorDetailView })));
const MyNamesView = lazy(() => import('./views/MyNamesView').then((module) => ({ default: module.MyNamesView })));
const CreativeStudioView = lazy(() => import('./views/CreativeStudioView').then((module) => ({ default: module.CreativeStudioView })));
import { GeneratorId } from './types';
import { GENERATORS_METADATA, ALL_GENERATORS_LIST } from './data/generators';
import { applySettingsToDOM, getAppSettings, subscribeToSettings, SUPPORTED_LANGUAGES } from './services/settings';
import { getShellLabels } from './i18n/shell';
import { getOpenGraphLocale, getSeoDescription, setMetaContent } from './i18n/seoMetadata';
import { CreativeStudioTransferContext } from './types/nameInsight';
import { scrollToTop } from './utils/motion';
import './styles/animated-headings.css';

export const App: React.FC = () => {
  const { title: getLocalizedGeneratorTitle, shortTitle: getLocalizedGeneratorShortTitle, description: getLocalizedGeneratorDescription } = useGeneratorLocalization();
  const [currentView, setCurrentView] = useState<string>('home');
  const [currentGenerator, setCurrentGenerator] = useState<GeneratorId>('fantasy');
  const [generatorsCategory, setGeneratorsCategory] = useState<string>('all');
  const [styleStudioText, setStyleStudioText] = useState<string>('NameForge');
  const [studioContext, setStudioContext] = useState<CreativeStudioTransferContext | undefined>(undefined);
  const [settings, setSettings] = useState(getAppSettings());

  // Initialize and subscribe to settings
  useEffect(() => {
    const initialSettings = getAppSettings();
    applySettingsToDOM(initialSettings);

    const unsub = subscribeToSettings((s) => {
      setSettings(s);
      applySettingsToDOM(s);
    });

    // Keep the "system" theme in sync when the operating system theme changes.
    const media = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
    const handleSystemThemeChange = () => {
      const current = getAppSettings();
      if (current.theme === 'system') {
        applySettingsToDOM(current);
      }
    };

    media?.addEventListener?.('change', handleSystemThemeChange);
    // Compatibility with older browsers that expose the legacy listener API.
    if (media && !media.addEventListener) {
      media.addListener(handleSystemThemeChange);
    }

    return () => {
      unsub();
      media?.removeEventListener?.('change', handleSystemThemeChange);
      if (media && !media.removeEventListener) {
        media.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  // Handle URL hash changes for deep linking
  const parseHash = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    const [hashPath, hashQuery] = rawHash.split('?');
    const hash = (hashPath || '').replace(/\/+$/, '');
    const validFamilies = new Set(['all', 'fantasy', 'business', 'creative', 'innovation']);

    if (!hash || hash === 'faq') {
      setCurrentView('home');
      return;
    }
    if (
      hash === 'generators' ||
      hash === 'all-name-generators' ||
      hash === 'catalog' ||
      hash === 'catalogue' ||
      hash.startsWith('catalog/') ||
      hash.startsWith('catalogue/')
    ) {
      let requestedCategory = 'all';
      if (hashQuery) {
        const params = new URLSearchParams(hashQuery);
        const catParam = params.get('category') || params.get('family') || '';
        if (validFamilies.has(catParam)) requestedCategory = catParam;
      } else if (hash.includes('/')) {
        const subCat = hash.split('/')[1] || '';
        if (validFamilies.has(subCat)) requestedCategory = subCat;
      }
      setGeneratorsCategory(requestedCategory);
      setCurrentView('generators');
      return;
    }
    if (hash === 'my-names') {
      setCurrentView('my-names');
      return;
    }
    if (hash === 'text-art-studio' || hash === 'symbols-text-art' || hash === 'symboles-text-art') { setCurrentView('creative-studio'); return; }
    if (hash === 'bio-caption-studio' || hash === 'bio-studio' || hash === 'caption-studio') { setCurrentView('creative-studio'); return; }
    if (hash === 'username-designer' || hash === 'username-generator' || hash === 'pseudo-generator') { setCurrentView('creative-studio'); return; }
    if (hash === 'style-studio' || hash === 'atelier-style' || hash === 'text-styler') {
      setCurrentView('creative-studio');
      return;
    }
    if (hash === 'creative-studio' || hash.startsWith('creative-studio/')) { setCurrentView('creative-studio'); return; }
    if (hash.startsWith('generator/')) {
      const genId = hash.replace('generator/', '') as GeneratorId;
      if (GENERATORS_METADATA[genId]) {
        setCurrentGenerator(genId);
        setCurrentView('generator-detail');
        return;
      }
    }
    // Also match legacy file-like hashes if any: e.g. #anime-name-generator
    const matchLegacy = hash.replace('-name-generator', '') as GeneratorId;
    if (GENERATORS_METADATA[matchLegacy]) {
      setCurrentGenerator(matchLegacy);
      setCurrentView('generator-detail');
      return;
    }

    setCurrentView('home');
  };

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    const handleCustomNav = (e: Event) => {
      const detail = (e as CustomEvent<{
        view?: string;
        name?: string;
        generatorId?: GeneratorId | string;
        studioContext?: CreativeStudioTransferContext;
      }>).detail;
      if (detail?.view) {
        handleNavigate(detail.view, detail.name || detail.generatorId, detail.studioContext);
      }
    };
    window.addEventListener('nameforge:navigate', handleCustomNav);
    return () => {
      window.removeEventListener('hashchange', parseHash);
      window.removeEventListener('nameforge:navigate', handleCustomNav);
    };
  }, []);

  const handleNavigate = (
    view: string,
    generatorId?: GeneratorId | string,
    transferContext?: CreativeStudioTransferContext
  ) => {
    const validFamilies = new Set(['all', 'fantasy', 'business', 'creative', 'innovation']);
    if (view === 'home') {
      window.location.hash = '';
      setCurrentView('home');
      scrollToTop();
    } else if (view === 'generators' || view === 'catalog' || view === 'catalogue') {
      const nextFamily = typeof generatorId === 'string' && validFamilies.has(generatorId) ? generatorId : 'all';
      setGeneratorsCategory(nextFamily);
      window.location.hash = nextFamily === 'all' ? '/generators' : `/generators?category=${nextFamily}`;
      setCurrentView('generators');
      scrollToTop();
    } else if (view === 'my-names') {
      window.location.hash = '/my-names';
      setCurrentView('my-names');
      scrollToTop();
    } else if (['creative-studio', 'style-studio', 'text-art-studio', 'bio-caption-studio', 'username-designer'].includes(view)) {
      const tab = view === 'style-studio' ? 'text-styles'
        : view === 'username-designer' ? 'username'
        : view === 'bio-caption-studio' ? 'bio-caption'
        : view === 'text-art-studio' ? 'symbols-art' : 'text-styles';
      if (transferContext) {
        setStudioContext(transferContext);
        setStyleStudioText(transferContext.name);
      } else if (view === 'style-studio' && generatorId) {
        setStudioContext(undefined);
        setStyleStudioText(String(generatorId));
      }
      window.location.hash = '/creative-studio/' + tab;
      setCurrentView('creative-studio');
      scrollToTop();
    } else if (view === 'generator-detail' && generatorId) {
      const gId = generatorId as GeneratorId;
      window.location.hash = `/generator/${gId}`;
      setCurrentGenerator(gId);
      setCurrentView('generator-detail');
      scrollToTop();
    }
  };

  // Keep the browser's language and reading direction synchronized with the selected language.
  useEffect(() => {
    const languageMeta = SUPPORTED_LANGUAGES.find((language) => language.code === settings.language);
    document.documentElement.lang = settings.language;
    document.documentElement.dir = languageMeta?.dir || 'ltr';
  }, [settings.language]);

  // Keep browser and social metadata synchronized with the active view and language.
  // GitHub Pages serves a client-rendered app; crawlers that do not execute JavaScript
  // will still see the safe default metadata from index.html.
  useEffect(() => {
    const labels = getShellLabels(settings.language);
    const titles: Record<string, string> = {
      home: `NameForge — ${ALL_GENERATORS_LIST.length} ${labels.pageTitles.home}`,
      generators: `${labels.pageTitles.generators} (${ALL_GENERATORS_LIST.length}) — NameForge`,
      'my-names': `${labels.pageTitles.myNames} — NameForge`,
      'creative-studio': `${labels.pageTitles.styleStudio} — NameForge`,
    };
    const generatorMeta = currentView === 'generator-detail' ? GENERATORS_METADATA[currentGenerator] : undefined;
    const generatorTitle = generatorMeta
      ? getLocalizedGeneratorTitle(currentGenerator, settings.language, generatorMeta.title)
      : labels.pageTitles.generator;
    const title = currentView === 'generator-detail'
      ? `${generatorTitle} | NameForge`
      : titles[currentView] || 'NameForge';
    const description = getSeoDescription(
      (currentView === 'creative-studio' ? 'style-studio' : currentView) as
        | 'home'
        | 'generators'
        | 'my-names'
        | 'style-studio'
        | 'generator-detail',
      settings.language,
      currentView === 'creative-studio' ? labels.pageTitles.styleStudio : generatorTitle
    );

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:locale"]', getOpenGraphLocale(settings.language));
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [currentView, currentGenerator, settings.language, getLocalizedGeneratorTitle]);

  return (
    <div className="nf-app-shell min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 dark:focus:bg-violet-600 focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none"
      >
        {getShellLabels(settings.language).skipToMain}
      </a>

      <Navbar
        currentView={currentView}
        currentGenerator={currentView === 'generator-detail' ? currentGenerator : undefined}
        onNavigate={handleNavigate}
      />

      <main id="main-content" className="nf-site-main flex-1 focus:outline-none" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center px-6" role="status" aria-live="polite">
              <span className="text-sm text-slate-600 dark:text-slate-400">{getShellLabels(settings.language).loading}</span>
            </div>
          }
        >
          {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}
          {currentView === 'generators' && (
            <GeneratorsListView onNavigate={handleNavigate} initialCategory={generatorsCategory} />
          )}
          {currentView === 'generator-detail' && (
            <GeneratorDetailView generatorId={currentGenerator} onNavigate={handleNavigate} />
          )}
          {currentView === 'my-names' && <MyNamesView onNavigate={handleNavigate} />}
          {currentView === 'creative-studio' && (
            <CreativeStudioView
              onNavigate={handleNavigate}
              initialText={styleStudioText}
              initialContext={studioContext}
            />
          )}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} currentView={currentView} />
    </div>
  );
};

export default App;
