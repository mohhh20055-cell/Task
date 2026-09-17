import React, { useState } from 'react';
import { AppConfig, FormMode, FormSubmission } from '../types';
import {
  Save,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Gift,
  Dog,
  Settings,
  Database,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Lock,
  LogOut,
  Key
} from 'lucide-react';
import { DEFAULT_CONFIG } from '../constants/defaultConfig';

interface Props {
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => void;
  submissions: FormSubmission[];
  onClearSubmissions: () => void;
  onCloseAdmin: () => void;
}

export const AdminPanel: React.FC<Props> = ({
  config,
  onSaveConfig,
  submissions,
  onClearSubmissions,
  onCloseAdmin,
}) => {
  // Password Protection State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Tab & Form State
  const [activeTab, setActiveTab] = useState<'switcher' | 'links' | 'leads' | 'settings'>('switcher');
  const [formData, setFormData] = useState<AppConfig>({ ...config });
  const [saveAlert, setSaveAlert] = useState<boolean>(false);

  // New Password State inside Settings
  const [newAdminPassword, setNewAdminPassword] = useState<string>(config.adminPassword || 'admin');

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = config.adminPassword || DEFAULT_CONFIG.adminPassword || 'admin';
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleToggleMode = (newMode: FormMode) => {
    const updated = { ...formData, activeMode: newMode };
    setFormData(updated);
    onSaveConfig(updated);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      adminPassword: newAdminPassword.trim() || 'admin',
    };
    setFormData(updated);
    onSaveConfig(updated);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('هل أنت تأكد من استعادة الإعدادات الافتراضية؟')) {
      setFormData(DEFAULT_CONFIG);
      setNewAdminPassword(DEFAULT_CONFIG.adminPassword);
      onSaveConfig(DEFAULT_CONFIG);
      setSaveAlert(true);
      setTimeout(() => setSaveAlert(false), 2000);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('لا توجد بيانات مسجلة للتصدير.');
      return;
    }

    const headers = ['ID', 'Form Type', 'Date', 'Interested', 'First Name', 'Last Name', 'Phone', 'Email', 'Offer Clicked'];
    const rows = submissions.map((s) => [
      s.id,
      s.formType,
      s.date,
      `"${s.data.interested || ''}"`,
      `"${s.data.firstName || ''}"`,
      `"${s.data.lastName || ''}"`,
      `"${s.data.phoneNumber || ''}"`,
      `"${s.data.email || ''}"`,
      `"${s.data.clickedOffer || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If not authenticated, show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#f1f3f4] text-[#202124] flex items-center justify-center p-4 font-['Roboto',sans-serif]">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#dadce0] shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-[#673ab7] text-white flex items-center justify-center font-bold mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-[#202124]">لوحة التحكم - تسجيل الدخول</h1>
            <p className="text-xs text-[#5f6368]">أدخل كلمة المرور للوصول إلى إعدادات لوحة المسؤول</p>
          </div>

          {authError && (
            <div className="p-3 rounded-lg bg-[#fce8e6] text-[#c5221f] text-xs font-bold text-center border border-[#f5c2c7]">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#202124] mb-1.5 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-[#673ab7]" />
                <span>كلمة المرور:</span>
              </label>
              <input
                type="password"
                required
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full p-3 bg-white border border-[#dadce0] rounded-xl text-sm font-mono text-[#202124] outline-none focus:border-[#673ab7] focus:ring-2 focus:ring-[#673ab7]/20 transition-all"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#673ab7] hover:bg-[#5e35b1] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>دخول لوحة التحكم</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#f1f3f4] text-center">
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-xs text-[#1a73e8] hover:underline font-semibold flex items-center justify-center gap-1 mx-auto"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>العودة للموقع المباشر</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f1f3f4] text-[#202124] font-['Roboto',sans-serif]">
      {/* Top Navbar */}
      <header className="bg-white border-b border-[#dadce0] sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#673ab7] text-white flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#202124]">لوحة التحكم الرئيسية (Admin Dashboard)</h1>
              <p className="text-xs text-[#5f6368]">التحكم الكامل واليدوي في نمط الصفحة، الروابط، والنصوص</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCloseAdmin}
              className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>عرض الموقع</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#d93025] text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg flex items-center gap-1 shadow-sm transition-all cursor-pointer"
              title="قفل لوحة التحكم"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">قفل اللوحة</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto border-t border-[#f1f3f4] pt-1">
          <button
            type="button"
            onClick={() => setActiveTab('switcher')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'switcher'
                ? 'border-[#673ab7] text-[#673ab7]'
                : 'border-transparent text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>التحكم بصفحة الموقع (تبديل يدوي)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'links'
                ? 'border-[#673ab7] text-[#673ab7]'
                : 'border-transparent text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>روابط أزرار العروض (CPA Links)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#673ab7] text-[#673ab7]'
                : 'border-transparent text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>الردود والبيانات المسجلة ({submissions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#673ab7] text-[#673ab7]'
                : 'border-transparent text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>نصوص الصفحات وكلمة المرور</span>
          </button>
        </div>
      </header>

      {/* Save Notification Banner */}
      {saveAlert && (
        <div className="bg-[#188038] text-white py-2.5 px-4 text-center font-bold text-sm shadow flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5" />
          <span>تم حفظ التعديلات وتطبيقها فوراً على الموقع المباشر!</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {/* TAB 1: MANUAL ONE CLICK SWITCHER */}
        {activeTab === 'switcher' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#dadce0] p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#202124] mb-2 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-[#673ab7]" />
                <span>التبديل اليدوي المباشر لصفحة الموقع</span>
              </h2>
              <p className="text-sm text-[#5f6368] mb-6">
                اختر النمط الذي تريد عرضه للزوار عند تصفحهم لموقعك. يتغير النمط فوراً وبكبسة زر واحدة:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1: Dog Products Form */}
                <div
                  onClick={() => handleToggleMode('dog_products')}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all relative overflow-hidden ${
                    formData.activeMode === 'dog_products'
                      ? 'border-[#673ab7] bg-[#f7f2fc] shadow-md'
                      : 'border-[#dadce0] bg-white hover:border-[#673ab7]/50 hover:bg-[#fafafa]'
                  }`}
                >
                  {formData.activeMode === 'dog_products' && (
                    <div className="absolute top-3 left-3 bg-[#673ab7] text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>الصفحة النشطة حالياً للزوار</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#673ab7]/10 text-[#673ab7] flex items-center justify-center font-bold">
                      <Dog className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#202124]">1. نموذج عروض منتجات الكلاب (Dog Products)</h3>
                      <p className="text-xs text-[#5f6368]">نموذج استبيان وجمع بيانات الزوار</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#3c4043] leading-relaxed mb-4">
                    يعرض استبياناً بأسلوب نماذج جوجل لجمع بيانات المستثمرين أو المهتمين (سؤال الاهتمام، الاسم الأول، اسم العائلة، الهاتف، والبريد الإلكتروني).
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#dadce0]/60 flex items-center justify-between">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        formData.activeMode === 'dog_products'
                          ? 'bg-[#673ab7] text-white'
                          : 'bg-[#f1f3f4] text-[#202124] hover:bg-[#e8eaed]'
                      }`}
                    >
                      {formData.activeMode === 'dog_products' ? 'نشط الآن' : 'تفعيل هذه الصفحة'}
                    </button>

                    <span className="text-xs text-[#673ab7] font-semibold">نمط الاستبيان (Survey)</span>
                  </div>
                </div>

                {/* Option 2: Rewards & Gift Cards Task Form */}
                <div
                  onClick={() => handleToggleMode('rewards')}
                  className={`border-2 rounded-xl p-5 cursor-pointer transition-all relative overflow-hidden ${
                    formData.activeMode === 'rewards'
                      ? 'border-[#1a73e8] bg-[#e8f0fe]/60 shadow-md'
                      : 'border-[#dadce0] bg-white hover:border-[#1a73e8]/50 hover:bg-[#fafafa]'
                  }`}
                >
                  {formData.activeMode === 'rewards' && (
                    <div className="absolute top-3 left-3 bg-[#1a73e8] text-white text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>الصفحة النشطة حالياً للزوار</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#1a73e8]/10 text-[#1a73e8] flex items-center justify-center font-bold">
                      <Gift className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#202124]">2. صفحة الجوائز والمهام (Rewards Program)</h3>
                      <p className="text-xs text-[#5f6368]">صفحة هدايا ومكافآت بأزرار عروض مباشرة</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#3c4043] leading-relaxed mb-4">
                    يعرض تعليمات برنامج المكافآت المصممة للتحويل العالي مع أزرار توجيه مباشرة لمستخدمي الأندرويد والكمبيوتر.
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#dadce0]/60 flex items-center justify-between">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        formData.activeMode === 'rewards'
                          ? 'bg-[#1a73e8] text-white'
                          : 'bg-[#f1f3f4] text-[#202124] hover:bg-[#e8eaed]'
                      }`}
                    >
                      {formData.activeMode === 'rewards' ? 'نشط الآن' : 'تفعيل هذه الصفحة'}
                    </button>

                    <span className="text-xs text-[#1a73e8] font-semibold">نمط العروض (CPA / Tasks)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-[#f8f9fa] border border-[#dadce0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-[#202124]">
                  <span className="font-bold">الصفحة المعروضة حالياً:</span>
                  <span className="px-2.5 py-1 rounded bg-[#673ab7]/15 text-[#673ab7] font-bold">
                    {formData.activeMode === 'dog_products' ? 'نموذج منتجات الكلاب 🐕' : 'برنامج الجوائز والمهام 🎁'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onCloseAdmin}
                  className="bg-[#202124] hover:bg-[#3c4043] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة كزائر</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CPA OFFER LINKS CONFIGURATION */}
        {activeTab === 'links' && (
          <form onSubmit={handleSaveAll} className="space-y-6">
            <div className="bg-white rounded-xl border border-[#dadce0] p-6 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-[#202124] flex items-center gap-2">
                <Sliders className="w-6 h-6 text-[#1a73e8]" />
                <span>إعداد روابط الأزرار والعروض (CPA Offers)</span>
              </h2>
              <p className="text-sm text-[#5f6368]">
                قم بضبط روابط الإحالة والعروض المخصصة لكل من مستخدمي هواتف الأندرويد وأجهزة أجهزة أجهزة الكمبيوتر:
              </p>

              <div className="grid grid-cols-1 gap-5">
                {/* Android URL */}
                <div className="p-4 rounded-lg bg-[#f8f9fa] border border-[#dadce0] space-y-2">
                  <label className="block text-sm font-bold text-[#202124] flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    <span>رابط عرض مستخدمي الأندرويد (Android URL):</span>
                  </label>
                  <input
                    type="url"
                    value={formData.rewardsForm.androidUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, androidUrl: e.target.value },
                      })
                    }
                    placeholder="https://your-cpa-network.com/offer-android"
                    className="w-full p-2.5 bg-white border border-[#dadce0] rounded-lg text-sm font-mono text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                  <div className="text-xs text-[#5f6368] space-y-1">
                    <span>نص الزر:</span>
                    <input
                      type="text"
                      value={formData.rewardsForm.androidButtonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rewardsForm: { ...formData.rewardsForm, androidButtonText: e.target.value },
                        })
                      }
                      className="mt-1 w-full p-2 bg-white border border-[#dadce0] rounded text-xs text-[#202124]"
                    />
                  </div>
                </div>

                {/* PC / Desktop URL */}
                <div className="p-4 rounded-lg bg-[#f8f9fa] border border-[#dadce0] space-y-2">
                  <label className="block text-sm font-bold text-[#202124] flex items-center gap-2">
                    <span className="text-lg">💻</span>
                    <span>رابط عرض مستخدمي الكمبيوتر (PC / Desktop URL):</span>
                  </label>
                  <input
                    type="url"
                    value={formData.rewardsForm.pcUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, pcUrl: e.target.value },
                      })
                    }
                    placeholder="https://your-cpa-network.com/offer-desktop"
                    className="w-full p-2.5 bg-white border border-[#dadce0] rounded-lg text-sm font-mono text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]"
                  />
                  <div className="text-xs text-[#5f6368] space-y-1">
                    <span>نص الزر:</span>
                    <input
                      type="text"
                      value={formData.rewardsForm.pcButtonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          rewardsForm: { ...formData.rewardsForm, pcButtonText: e.target.value },
                        })
                      }
                      className="mt-1 w-full p-2 bg-white border border-[#dadce0] rounded text-xs text-[#202124]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#dadce0]">
                <button
                  type="submit"
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ الروابط الآن</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: LEADS & SUBMISSIONS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#dadce0] p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#202124] flex items-center gap-2">
                    <Database className="w-6 h-6 text-[#673ab7]" />
                    <span>الردود والبيانات المسجلة للزوار</span>
                  </h2>
                  <p className="text-xs text-[#5f6368]">إجمالي التسجيلات المخزنة: {submissions.length}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    disabled={submissions.length === 0}
                    className="bg-[#188038] hover:bg-[#137333] disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تصدير ملف Excel / CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('هل أنت متأكد من مسح جميع السجلات المخزنة؟')) {
                        onClearSubmissions();
                      }
                    }}
                    disabled={submissions.length === 0}
                    className="bg-[#d93025] hover:bg-[#b3261e] disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>مسح الكل</span>
                  </button>
                </div>
              </div>

              {submissions.length === 0 ? (
                <div className="p-12 text-center text-[#5f6368] border border-dashed border-[#dadce0] rounded-lg">
                  <Database className="w-12 h-12 text-[#dadce0] mx-auto mb-2" />
                  <p className="font-semibold">لا توجد ردود مسجلة بعد.</p>
                  <p className="text-xs mt-1">عندما يقوم أي زائر بملء الاستبيان أو النقر على أحد أزرار العروض، سيتم تسجيل بياناته هنا تلقائياً.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#dadce0] rounded-lg">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-[#f8f9fa] border-b border-[#dadce0] text-[#5f6368] font-bold">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">نوع النموذج</th>
                        <th className="p-3">التاريخ والوقت</th>
                        <th className="p-3">الاسم الكامل</th>
                        <th className="p-3">الهاتف</th>
                        <th className="p-3">البريد الإلكتروني</th>
                        <th className="p-3">مهتم؟</th>
                        <th className="p-3">تفاصيل النشاط والنقر</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#dadce0]">
                      {submissions.map((sub, idx) => (
                        <tr key={sub.id} className="hover:bg-[#f8f9fa] transition-colors">
                          <td className="p-3 font-mono text-[#5f6368]">{idx + 1}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                sub.formType === 'dog_products'
                                  ? 'bg-[#673ab7]/10 text-[#673ab7]'
                                  : 'bg-[#1a73e8]/10 text-[#1a73e8]'
                              }`}
                            >
                              {sub.formType === 'dog_products' ? 'منتجات الكلاب' : 'عرض المكافآت'}
                            </span>
                          </td>
                          <td className="p-3 text-[#5f6368] font-mono whitespace-nowrap">
                            {new Date(sub.date).toLocaleString('ar-EG')}
                          </td>
                          <td className="p-3 font-bold text-[#202124]">
                            {sub.data.firstName || ''} {sub.data.lastName || ''}
                            {!sub.data.firstName && !sub.data.lastName && '-'}
                          </td>
                          <td className="p-3 font-mono text-[#1a73e8]">{sub.data.phoneNumber || '-'}</td>
                          <td className="p-3 font-mono text-[#202124]">{sub.data.email || '-'}</td>
                          <td className="p-3">
                            {sub.data.interested === 'Yes' ? (
                              <span className="text-[#188038] font-bold">نعم</span>
                            ) : sub.data.interested === 'No' ? (
                              <span className="text-[#d93025] font-bold">لا</span>
                            ) : (
                              '-'
                            )}
                          </td>
                          <td className="p-3 text-[#5f6368]">{sub.data.clickedOffer || (sub.data.agree ? 'وافق على الشروط' : '-')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: GENERAL TEXT SETTINGS & PASSWORD */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveAll} className="space-y-6">
            <div className="bg-white rounded-xl border border-[#dadce0] p-6 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-[#202124] flex items-center gap-2">
                <Settings className="w-6 h-6 text-[#673ab7]" />
                <span>تخصيص النصوص وكلمة المرور</span>
              </h2>

              {/* Password Management */}
              <div className="p-4 rounded-xl bg-[#f7f2fc] border border-[#673ab7]/20 space-y-3">
                <h3 className="font-bold text-sm text-[#673ab7] flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>كلمة مرور لوحة التحكم (Admin Password):</span>
                </h3>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">تغيير كلمة المرور الخاصة بالدخول للوحة التحكم:</label>
                  <input
                    type="text"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="كلمة المرور الجديدة..."
                    className="w-full max-w-md p-2.5 bg-white border border-[#dadce0] rounded-lg text-sm font-mono text-[#202124]"
                  />
                  <p className="text-[11px] text-[#5f6368] mt-1">
                    كلمة المرور الافتراضية هي <code className="bg-white px-1 rounded font-bold text-[#673ab7]">admin</code>. يمكنك تغييرها إلى أي كلمة مرور مخصصة.
                  </p>
                </div>
              </div>

              {/* Dog Form Titles */}
              <div className="p-4 rounded-lg bg-[#f8f9fa] border border-[#dadce0] space-y-3">
                <h3 className="font-bold text-sm text-[#673ab7]">نصوص نموذج منتجات الكلاب:</h3>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">العنوان الرئيسي للنموذج:</label>
                  <input
                    type="text"
                    value={formData.dogForm.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dogForm: { ...formData.dogForm, title: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">الوصف المكتوب تحت العنوان:</label>
                  <textarea
                    rows={2}
                    value={formData.dogForm.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dogForm: { ...formData.dogForm, description: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">نص خيار الموافقة والمشاركة:</label>
                  <input
                    type="text"
                    value={formData.dogForm.agreeText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dogForm: { ...formData.dogForm, agreeText: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
              </div>

              {/* Rewards Form Titles */}
              <div className="p-4 rounded-lg bg-[#f8f9fa] border border-[#dadce0] space-y-3">
                <h3 className="font-bold text-sm text-[#1a73e8]">نصوص صفحة العروض والجوائز:</h3>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">العنوان العلوي للصفحة:</label>
                  <input
                    type="text"
                    value={formData.rewardsForm.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, title: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">عنوان البرنامج أو الهدية:</label>
                  <input
                    type="text"
                    value={formData.rewardsForm.programTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, programTitle: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">تنبيه الشروط والمتطلبات:</label>
                  <input
                    type="text"
                    value={formData.rewardsForm.importantReq}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, importantReq: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">تفاصيل الأجهزة والدول المسموحة:</label>
                  <input
                    type="text"
                    value={formData.rewardsForm.deviceInfo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, deviceInfo: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">خطوات إكمال العرض:</label>
                  <textarea
                    rows={4}
                    value={formData.rewardsForm.instructions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, instructions: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5f6368] mb-1">شروط وأحكام العرض:</label>
                  <textarea
                    rows={2}
                    value={formData.rewardsForm.termsText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rewardsForm: { ...formData.rewardsForm, termsText: e.target.value },
                      })
                    }
                    className="w-full p-2 bg-white border border-[#dadce0] rounded text-sm text-[#202124]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#dadce0]">
                <button
                  type="submit"
                  className="bg-[#673ab7] hover:bg-[#5e35b1] text-white text-sm font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ كافة التعديلات وكلمة المرور</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs text-[#d93025] hover:underline cursor-pointer font-semibold"
                >
                  استعادة الإعدادات الافتراضية
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
