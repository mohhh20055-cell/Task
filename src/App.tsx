import React, { useState, useEffect } from 'react';
import { AppConfig, FormSubmission } from './types';
import { DEFAULT_CONFIG } from './constants/defaultConfig';
import { DogProductsForm } from './components/DogProductsForm';
import { RewardsForm } from './components/RewardsForm';
import { AdminPanel } from './components/AdminPanel';
import { SuccessView } from './components/SuccessView';
import {
  fetchConfigFromDB,
  saveConfigToDB,
  fetchSubmissionsFromDB,
  addSubmissionToDB,
  clearSubmissionsFromDB,
} from './services/dbService';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [submittedForm, setSubmittedForm] = useState<string | null>(null);

  // Load configuration and submissions from Supabase DB on startup
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      const [dbConfig, dbSubmissions] = await Promise.all([
        fetchConfigFromDB(),
        fetchSubmissionsFromDB(),
      ]);

      if (isMounted) {
        setConfig(dbConfig);
        setSubmissions(dbSubmissions);
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const saveConfig = async (newConfig: AppConfig): Promise<{ success: boolean; error?: string }> => {
    setConfig(newConfig);
    const result = await saveConfigToDB(newConfig);
    return result;
  };

  const handleFormSubmit = async (submission: FormSubmission) => {
    const updated = [submission, ...submissions];
    setSubmissions(updated);
    await addSubmissionToDB(submission);

    if (submission.formType === 'dog_products') {
      const formTitle = config.dogForm.title;
      setSubmittedForm(formTitle);
    }
  };

  const handleClearSubmissions = async () => {
    setSubmissions([]);
    await clearSubmissionsFromDB();
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
