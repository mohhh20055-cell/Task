import React, { useState, useEffect } from 'react';
import { AppConfig, FormMode, FormSubmission } from './types';
import { DEFAULT_CONFIG, STORAGE_KEY_CONFIG, STORAGE_KEY_SUBMISSIONS } from './constants/defaultConfig';
import { DogProductsForm } from './components/DogProductsForm';
import { RewardsForm } from './components/RewardsForm';
import { AdminPanel } from './components/AdminPanel';
import { SuccessView } from './components/SuccessView';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [submissions, setSubmissions] = useState<FormSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [submittedForm, setSubmittedForm] = useState<string | null>(null);

  // Check URL pathname, hash, and search query for 'admin'
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      const isAdminRequested =
        path.includes('/admin') ||
        path.endsWith('admin') ||
        hash.includes('admin') ||
        search.includes('admin');

      setIsAdminView(isAdminRequested);
    };

    checkAdminRoute();

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [config]);

  const saveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
    } catch (err) {
      console.error('Failed to save config:', err);
    }
  };

  const handleFormSubmit = (submission: FormSubmission) => {
    const updated = [submission, ...submissions];
    setSubmissions(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save submission:', err);
    }
    const formTitle =
      submission.formType === 'dog_products' ? config.dogForm.title : config.rewardsForm.title;
    setSubmittedForm(formTitle);
  };

  const handleClearSubmissions = () => {
    setSubmissions([]);
    try {
      localStorage.removeItem(STORAGE_KEY_SUBMISSIONS);
    } catch (err) {
      console.error('Failed to clear submissions:', err);
    }
  };

  const openAdmin = () => {
    setIsAdminView(true);
    window.history.pushState({}, '', '#admin');
  };

  const closeAdmin = () => {
    setIsAdminView(false);
    window.history.pushState({}, '', window.location.pathname.replace(/\/admin\/?$/, '') || '/');
  };

  if (isAdminView) {
    return (
      <AdminPanel
        config={config}
        onSaveConfig={saveConfig}
        submissions={submissions}
        onClearSubmissions={handleClearSubmissions}
        onCloseAdmin={closeAdmin}
      />
    );
  }

  if (submittedForm) {
    return (
      <SuccessView
        formTitle={submittedForm}
        onReset={() => setSubmittedForm(null)}
        onAdminClick={openAdmin}
      />
    );
  }

  if (config.activeMode === 'rewards') {
    return (
      <RewardsForm
        config={config}
        onSubmit={handleFormSubmit}
        onAdminClick={openAdmin}
      />
    );
  }

  return (
    <DogProductsForm
      config={config}
      onSubmit={handleFormSubmit}
      onAdminClick={openAdmin}
    />
  );
}
