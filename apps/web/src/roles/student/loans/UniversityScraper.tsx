import React, { useState, useEffect, useRef } from 'react';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { useAuth } from '@/shared/contexts/AuthContext';

const SOURCES = [
    { id: 'ugc', name: 'UGC Universities', url: 'https://www.ugc.gov.in' },
    { id: 'aicte', name: 'AICTE Colleges', url: 'https://www.aicte-india.org' },
    { id: 'nirf', name: 'NIRF Ranking Universities', url: 'https://www.nirfindia.org' },
    { id: 'github', name: 'GitHub Universities Dataset', url: 'https://github.com/Hipo/university-domains-list' },
    { id: 'hipolabs', name: 'Hipolabs Universities API', url: 'http://universities.hipolabs.com' },
    { id: 'shiksha', name: 'Shiksha', url: 'https://www.shiksha.com' },
    { id: 'collegedunia', name: 'Collegedunia', url: 'https://collegedunia.com' },
    { id: 'leverage', name: 'LeverageEdu', url: 'https://leverageedu.com' },
];

const DATA_FIELDS = [
    'University Name', 'Website', 'Country', 'City', 'Courses',
    'Fees', 'Scholarships', 'Accommodation', 'Ranking',
    'Facilities', 'Language', 'Admission Requirements', 'Placement Statistics'
];

const UniversityScraper = () => {
    const { accessToken } = useAuth();
    const [selectedSource, setSelectedSource] = useState(SOURCES[0].id);
    const [customUrl, setCustomUrl] = useState('');
    const [isScraping, setIsScraping] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [stats, setStats] = useState({
        crawled: 0,
        pages: 0,
        records: 0,
        duplicates: 0,
        errors: 0
    });

    // Config states
    const [config, setConfig] = useState({
        maxPages: 100,
        depth: 2,
        delay: 1,
        threads: 4,
        selectedFields: DATA_FIELDS
    });

    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const addLog = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${type.toUpperCase()}] ${timestamp} - ${message}`]);
    };

    const handleStartScraping = async () => {
        setIsScraping(true);
        setLogs([]);
        setStats({ crawled: 0, pages: 0, records: 0, duplicates: 0, errors: 0 });
        setProgress(0);

        addLog(`Initiating engine for ${selectedSource === 'custom' ? customUrl : selectedSource.toUpperCase()}...`);

        try {
            const response = await fetch('http://localhost:3001/api/scraper/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    source: selectedSource,
                    config: {
                        ...config,
                        url: customUrl
                    }
                })
            });

            if (!response.ok) throw new Error('Failed to start scraper');

            const { jobId } = await response.json();
            addLog(`Job ${jobId} accepted by backend workers.`, 'info');

            // Start polling for status
            const pollInterval = setInterval(async () => {
                try {
                    const statusRes = await fetch(`http://localhost:3001/api/scraper/status/${jobId}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` }
                    });
                    if (!statusRes.ok) return;

                    const jobData = await statusRes.json();

                    if (jobData.status === 'completed') {
                        setProgress(100);
                        setIsScraping(false);
                        addLog('Scraping job completed successfully!', 'success');
                        clearInterval(pollInterval);
                    } else if (jobData.status === 'failed') {
                        setIsScraping(false);
                        addLog('Scraping job failed on worker node.', 'error');
                        clearInterval(pollInterval);
                    } else {
                        // Simulate progress increment during run
                        setProgress(prev => Math.min(95, prev + 2));
                        if (Math.random() > 0.8) {
                            addLog("Processing new records batch...");
                            setStats(s => ({ ...s, pages: s.pages + 1, records: s.records + 5 }));
                        }
                    }
                } catch (e) {
                    console.error("Polling error", e);
                }
            }, 3000);

        } catch (error: any) {
            addLog(`API Error: ${error.message}`, 'error');
            setIsScraping(false);
        }
    };

    const toggleField = (field: string) => {
        setConfig(prev => ({
            ...prev,
            selectedFields: prev.selectedFields.includes(field)
                ? prev.selectedFields.filter(f => f !== field)
                : [...prev.selectedFields, field]
        }));
    };

    return (
        <SuperAdminLayout title="University Scraper Engine">
            <div className="p-8 max-w-[1400px] mx-auto flex flex-col gap-6">

                {/* 1. Control & Config Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Source Selection */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <span className="material-symbols-outlined">source</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Source Selection</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Predefined Sources</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    value={selectedSource}
                                    onChange={(e) => setSelectedSource(e.target.value)}
                                >
                                    {SOURCES.map(source => (
                                        <option key={source.id} value={source.id}>{source.name}</option>
                                    ))}
                                    <option value="custom">-- Custom Website URL --</option>
                                </select>
                            </div>

                            {selectedSource === 'custom' && (
                                <div className="animate-in fade-in slide-in-from-top-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://exampleuniversity.edu"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                        value={customUrl}
                                        onChange={(e) => setCustomUrl(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Automation</span>
                                    <span className="text-sm font-medium text-slate-600">Daily Scrape @ 02:00 AM</span>
                                </div>
                                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                                    Schedule Task
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scraper Configuration */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <span className="material-symbols-outlined">settings_input_component</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Scraping Parameters</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Max Pages</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    value={config.maxPages}
                                    onChange={(e) => setConfig({ ...config, maxPages: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Crawl Depth</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    value={config.depth}
                                    onChange={(e) => setConfig({ ...config, depth: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Delay (sec)</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    value={config.delay}
                                    onChange={(e) => setConfig({ ...config, delay: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Threads</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                                    value={config.threads}
                                    onChange={(e) => setConfig({ ...config, threads: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Fields to Extract</label>
                            <div className="flex flex-wrap gap-2">
                                {DATA_FIELDS.slice(0, 8).map(field => (
                                    <button
                                        key={field}
                                        onClick={() => toggleField(field)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${config.selectedFields.includes(field)
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-blue-500'
                                            }`}
                                    >
                                        {field}
                                    </button>
                                ))}
                                <span className="text-[10px] text-slate-400 flex items-center px-2">+{DATA_FIELDS.length - 8} more</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Action Area */}
                <div className="bg-gradient-to-r from-[#2b6cee] to-[#1e40af] p-6 rounded-2xl shadow-lg flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10 flex flex-col gap-1">
                        <h4 className="text-white font-bold text-xl">Ready to launch engine?</h4>
                        <p className="text-blue-100 text-sm opacity-80">This will initiate the Scrapy + Playwright stack locally.</p>
                    </div>

                    <button
                        disabled={isScraping}
                        onClick={handleStartScraping}
                        className={`relative z-10 px-8 py-4 bg-white text-[#2b6cee] font-black rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3 disabled:opacity-50 disabled:scale-100`}
                    >
                        {isScraping ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                                Scraping in Progress...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">rocket_launch</span>
                                START SCRAPING
                            </>
                        )}
                    </button>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                </div>

                {/* 3. Monitoring & Stats Area */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {[
                        { label: 'Websites Crawled', value: stats.crawled, icon: 'public', color: 'text-blue-600 bg-blue-50' },
                        { label: 'Pages Scraped', value: stats.pages, icon: 'description', color: 'text-indigo-600 bg-indigo-50' },
                        { label: 'Data Extracted', value: stats.records, icon: 'database', color: 'text-emerald-600 bg-emerald-50' },
                        { label: 'Duplicates Skipped', value: stats.duplicates, icon: 'content_copy', color: 'text-amber-600 bg-amber-50' },
                        { label: 'Runtime Errors', value: stats.errors, icon: 'error', color: 'text-rose-600 bg-rose-50' }
                    ].map(stat => (
                        <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center gap-2">
                            <div className={`${stat.color} p-2 rounded-lg`}>
                                <span className="material-symbols-outlined">{stat.icon}</span>
                            </div>
                            <h5 className="text-2xl font-black text-slate-800">{stat.value}</h5>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* 4. Live Progress & Logs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Progress Bar Widget */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-800">Job Progress</h4>
                            <span className="text-blue-600 font-black">{Math.floor(progress)}%</span>
                        </div>

                        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                            <div
                                className="bg-blue-600 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="block text-[8px] font-black text-slate-400 uppercase">Est. Time Remaining</span>
                                <span className="text-sm font-bold text-slate-700">04:12s</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span className="block text-[8px] font-black text-slate-400 uppercase">Throughput</span>
                                <span className="text-sm font-bold text-slate-700">12 records/min</span>
                            </div>
                        </div>
                    </div>

                    {/* Console Logs */}
                    <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden flex flex-col h-[300px] border-4 border-slate-800 shadow-2xl">
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="size-2.5 rounded-full bg-rose-500"></div>
                                    <div className="size-2.5 rounded-full bg-amber-500"></div>
                                    <div className="size-2.5 rounded-full bg-emerald-500"></div>
                                </div>
                                <span className="text-xs font-mono text-slate-400 ml-2">scraper_engine_logs.txt</span>
                            </div>
                            <button
                                onClick={() => setLogs([])}
                                className="text-[10px] font-bold text-slate-500 hover:text-white uppercase"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto font-mono text-[11px] space-y-1">
                            {logs.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-600 italic">
                                    No logs yet. Click start to begin.
                                </div>
                            ) : (
                                logs.map((log, i) => {
                                    let textColor = 'text-slate-300';
                                    if (log.includes('SUCCESS')) textColor = 'text-emerald-400';
                                    if (log.includes('ERROR')) textColor = 'text-rose-400';

                                    return <div key={i} className={`${textColor} animate-in fade-in duration-300`}>{log}</div>;
                                })
                            )}
                            <div ref={logEndRef} />
                        </div>
                    </div>
                </div>

            </div>
        </SuperAdminLayout>
    );
};

export default UniversityScraper;
