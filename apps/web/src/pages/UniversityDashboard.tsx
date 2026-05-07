import { Link } from 'react-router-dom';
import UniversityLayout from '@/layouts/UniversityLayout';
import { usePosts } from '@/shared/contexts/PostsContext';
import { useApplications } from '@/shared/contexts/ApplicationsContext';
import { useAuth } from '@/shared/contexts/AuthContext';

const UniversityDashboard = () => {
    const { posts } = usePosts();
    const { applications } = useApplications();
    const { user } = useAuth();

    const universityName = user?.university?.trim().toLowerCase();

    // Calculate dynamic stats for Posts
    const universityPosts = posts.filter(p =>
        p.institution?.trim().toLowerCase() === universityName
    );
    const publishedCount = universityPosts.filter(p => p.status === 'Published').length;

    // Calculate dynamic stats for Applications
    const universityApplications = applications.filter(app =>
        app.institution?.trim().toLowerCase() === universityName
    );

    // Generate Recent Activity
    const recentActivities = [
        ...universityApplications.map(app => ({
            id: app.id,
            type: 'application',
            title: 'New application received',
            description: `${app.studentName} applied for ${app.targetName}`,
            date: new Date(app.dateApplied),
            timeLabel: 'Recently'
        })),
        ...universityPosts.map(post => ({
            id: post.id,
            type: 'post',
            title: post.status === 'Published' ? 'Post published' : 'Post updated',
            description: `"${post.title}" was ${post.status === 'Published' ? 'published' : 'updated'}`,
            date: new Date(), // Mock date since posts don't have createdAt yet, but we can assume they are recent if in context
            timeLabel: 'Today'
        }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

    const totalApplications = universityApplications.length;

    // Calculate Top Performing Programs
    const programStats = universityApplications.reduce((acc: Record<string, number>, app) => {
        if (app.type === 'Program') {
            acc[app.targetName] = (acc[app.targetName] || 0) + 1;
        }
        return acc;
    }, {});

    const topPrograms = Object.entries(programStats)
        .map(([name, apps]) => ({
            name,
            apps,
            trend: '+5%' // Placeholder for trend
        }))
        .sort((a, b) => b.apps - a.apps)
        .slice(0, 4);

    // If no real programs, use placeholders but keep it clean
    const displayPrograms = topPrograms.length > 0 ? topPrograms : [
        { name: 'MSc Computer Science', apps: 0, trend: '+0%' },
        { name: 'MBA Professional Year', apps: 0, trend: '+0%' }
    ];

    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const last7Days = getLast7Days();
    const weeklyCounts = last7Days.map(date =>
        universityApplications.filter(app => app.dateApplied === date).length
    );

    const totalLast30Days = universityApplications.filter(app => {
        const appDate = new Date(app.dateApplied);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return appDate >= thirtyDaysAgo;
    }).length;

    // Generate SVG components for hybrid trend (normalized to viewBox="0 0 400 150")
    const maxCount = Math.max(...weeklyCounts, 5);
    const gridLines = [0, 0.25, 0.5, 0.75, 1].map(ratio => ({
        y: 140 - ratio * 100,
        label: Math.round(ratio * maxCount)
    }));

    const points = weeklyCounts.map((count, i) => {
        const x = (i / 6) * 360 + 20; // Padded x
        const y = 140 - (count / maxCount) * 100;
        return { x, y, count };
    });

    const pathD = points.length > 0
        ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
        : "M 20 120 L 380 120";

    const areaD = `${pathD} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z`;

    const bars = points.map((p, i) => ({
        x: p.x - 12,
        y: p.y,
        width: 24,
        height: 150 - p.y,
        count: p.count
    }));
    return (
        <UniversityLayout title="University Dashboard">
            <div className="p-8 max-w-7xl mx-auto w-full space-y-8 font-['Public_Sans']">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    <Link to="/university/applications" className="group">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col gap-4 shadow-sm shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-500/30 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="size-12 rounded-2xl bg-[#1E63F3]/10 text-[#1E63F3] flex items-center justify-center group-hover:bg-[#1E63F3] group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[24px]">description</span>
                                </div>
                                <span className="text-emerald-500 text-xs font-black font-['Public_Sans'] bg-emerald-50 px-3 py-1 rounded-full">+12%</span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.1em] ml-1">Total Applications</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-black text-slate-900 tracking-tight">
                                        {totalApplications > 0 ? totalApplications.toLocaleString() : '0'}
                                    </p>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-[#1E63F3] group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/university/published-posts" className="group">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col gap-4 shadow-sm shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-500/30 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="size-12 rounded-2xl bg-[#1E63F3]/10 text-[#1E63F3] flex items-center justify-center group-hover:bg-[#1E63F3] group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-[24px]">post_add</span>
                                </div>
                                <span className="text-emerald-500 text-xs font-black bg-emerald-50 px-3 py-1 rounded-full">+8%</span>
                            </div>
                            <div>
                                <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.1em] ml-1">Published Posts</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-3xl font-black text-slate-900 tracking-tight">{publishedCount > 0 ? publishedCount : '0'}</p>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-[#1E63F3] group-hover:translate-x-1 transition-all">arrow_forward_ios</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shadow-blue-100/50">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 tracking-tight">Applications Trend</h3>
                                <p className="text-xs text-slate-500 font-medium">{totalLast30Days} total in last 30 days</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 rounded-lg bg-[#1E63F3]/10 text-[#1E63F3] text-[10px] font-black uppercase tracking-widest">+5%</span>
                            </div>
                        </div>
                        <div className="h-64 flex flex-col justify-end gap-2 px-1 relative">
                            {/* Y-Axis Labels */}
                            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] font-black text-slate-300 py-4 pointer-events-none">
                                {[...gridLines].reverse().map((line, i) => (
                                    <span key={i}>{line.label}</span>
                                ))}
                            </div>

                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 150">
                                {/* Horizontal Grid Lines */}
                                {gridLines.map((line, i) => (
                                    <line key={i} x1="20" y1={line.y} x2="380" y2={line.y} stroke="#f1f5f9" strokeWidth="1" />
                                ))}

                                {/* Background Area */}
                                <path d={areaD} fill="url(#blueGradient)"></path>

                                {/* Vertical Bars */}
                                {bars.map((bar, i) => (
                                    <rect
                                        key={i}
                                        x={bar.x}
                                        y={bar.y}
                                        width={bar.width}
                                        height={bar.height}
                                        fill="#1E63F3"
                                        fillOpacity="0.1"
                                        rx="4"
                                    />
                                ))}

                                {/* Trend Line */}
                                <path d={pathD} fill="none" stroke="#1E63F3" strokeLinecap="round" strokeWidth="3" strokeLinejoin="round"></path>

                                {/* Pips/Points */}
                                {points.map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" stroke="#1E63F3" strokeWidth="2" />
                                ))}

                                <defs>
                                    <linearGradient id="blueGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#1E63F3', stopOpacity: 0.1 }}></stop>
                                        <stop offset="100%" style={{ stopColor: '#1E63F3', stopOpacity: 0 }}></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex justify-between px-5 pt-4 border-t border-dashed border-slate-100">
                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                                    <span key={day} className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{day}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shadow-blue-100/50 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 tracking-tight">Student Interest by Country</h3>
                                <p className="text-xs text-slate-500 font-medium">Global outreach performance</p>
                            </div>
                            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">Active Regions</span>
                        </div>

                        {/* High-Fidelity World Map (Detailed Robinson Projection) */}
                        <div className="h-72 relative flex items-center justify-center overflow-hidden">
                            <svg className="w-full h-full opacity-[0.14] absolute inset-0 transition-opacity group-hover:opacity-[0.20]" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                                <g fill="#1E63F3">
                                    {/* High-Fidelity Robinson Projection Paths */}
                                    <path d="M194.957,36.677L194.623,37.824L196.253,37.332L213.932,39.206L217.649,40.371L205.686,50.386L188.154,66.344L192.041,70.414L195.763,68.779L199.367,73.962L198.645,77.300L200.862,79.162L196.758,82.435L191.974,72.442L180.649,67.212L170.163,67.461L160.852,69.680L169.839,64.290L156.311,69.111L148.340,73.859L137.936,77.559L127.241,80.775L115.994,83.634L116.136,83.129L133.315,77.692L148.196,70.374L138.106,69.355L143.539,59.771L156.438,56.570L159.980,53.682L155.632,54.329L147.812,51.277L158.834,48.830L163.541,48.402L171.954,41.290L180.573,38.456L192.810,36.143L194.957,36.677Z" /> {/* N. America Main */}
                                    <path d="M387.585,9.492L397.692,10.381L392.353,11.686L384.585,13.599L376.745,15.738L371.282,16.597L365.769,16.846L360.861,20.152L355.931,21.755L347.951,23.511L336.452,23.468L341.388,21.828L347.315,20.991L350.181,17.604L356.278,15.088L359.780,14.409L350.181,17.604L346.185,12.383L349.627,11.393L358.627,10.337L375.003,9.369L387.585,9.492Z" /> {/* Canada/Arctic */}
                                    <path d="M346.453,348.517L355.745,338.163L353.138,330.764L351.961,328.465L349.030,324.742L342.547,322.964L334.209,299.555L325.760,293.207L314.326,285.910L310.020,288.205L299.301,283.437L295.100,277.159L300.955,267.946L307.184,258.394L307.779,250.400L311.566,248.178L321.243,243.668L330.863,239.235L334.800,241.051L342.353,247.639L354.112,245.624L364.952,254.241L375.316,258.380L389.037,262.535L403.808,276.591L401.442,283.843L391.705,310.927L386.079,325.731L369.598,342.133L363.345,353.427L346.453,348.517Z" /> {/* South America */}
                                    <path d="M523.580,238.494L495.793,181.827L515.500,191.863L532.526,179.692L578.880,184.320L600.207,184.320L605.129,196.903L603.472,208.806L616.779,214.060L632.307,228.334L618.663,240.127L610.589,241.429L585.565,242.465L582.134,257.718L583.660,275.763L575.555,291.652L563.076,288.146L548.373,278.872L534.483,271.375L531.304,246.390L523.580,238.494Z" /> {/* Africa */}
                                    <path d="M703.375,141.867L723.730,167.451L747.524,169.105L760.761,164.630L755.712,175.907L751.875,184.190L732.265,192.248L720.722,220.931L710.431,221.112L701.903,203.216L698.533,189.290L691.951,187.850L684.722,178.999L692.489,165.725L703.375,141.867Z M712.523,99.037L745.568,95.345L781.801,102.602L794.711,107.029L772.054,119.925L740.666,117.362L712.523,99.037Z M606.071,182.497L635.103,171.917L649.375,182.757L642.099,193.753L617.393,202.093L606.071,182.497Z" /> {/* Asia/Middle East */}
                                    <path d="M895.327,296.781L912.147,337.275L900.123,357.401L883.469,372.507L863.300,373.177L848.316,352.541L819.010,359.852L806.326,339.456L826.881,316.317L861.973,291.812L895.327,296.781Z" /> {/* Australia */}
                                    <path d="M493.251,71.204L501.108,88.068L503.461,93.002L486.091,96.400L489.251,86.369L493.251,71.204Z" /> {/* UK */}
                                    <path d="M859.934,114.749L865.891,117.538L852.190,110.531L859.934,114.749ZM865.622,136.617L867.042,143.000L844.405,146.944L842.916,150.955L859.462,129.302L865.622,136.617Z" /> {/* Japan */}
                                    <path d="M508.626,95.740L519.651,99.894L518.280,104.182L516.427,117.945L489.027,103.156L508.626,95.740Z" /> {/* Central Europe */}
                                    <path d="M954.874,367.243L961.826,372.145L944.438,384.649L922.303,397.566L914.235,398.736L941.160,380.996L954.874,367.243Z" /> {/* NZ */}
                                    <path d="M120.071,53.142L136.441,42.390L139.664,47.133L137.003,48.810Z" /> {/* Greenland */}
                                </g>
                            </svg>

                            {/* Dynamic Country Dots (Calibrated to Detailed Map) */}
                            {(() => {
                                const countryCoords: Record<string, { x: number, y: number, color: string }> = {
                                    'India': { x: 740, y: 195, color: '#1E63F3' },
                                    'China': { x: 775, y: 145, color: '#10b981' },
                                    'Canada': { x: 235, y: 75, color: '#ef4444' },
                                    'United States': { x: 215, y: 125, color: '#6366f1' },
                                    'United Kingdom': { x: 494, y: 88, color: '#f59e0b' },
                                    'Nigeria': { x: 524, y: 228, color: '#8b5cf6' },
                                    'Brazil': { x: 345, y: 315, color: '#ec4899' },
                                    'Australia': { x: 865, y: 345, color: '#14b8a6' }
                                };

                                const activeCountries = universityApplications.reduce((acc: Record<string, number>, app) => {
                                    const country = app.studentCountry || 'India';
                                    acc[country] = (acc[country] || 0) + 1;
                                    return acc;
                                }, {});

                                return Object.entries(activeCountries).map(([country, count]) => {
                                    const coord = countryCoords[country] || { x: Math.random() * 800 + 100, y: Math.random() * 300 + 100, color: '#64748b' };
                                    return (
                                        <div
                                            key={country}
                                            className="absolute group/dot cursor-pointer"
                                            style={{
                                                left: `${(coord.x / 1000) * 100}%`,
                                                top: `${(coord.y / 500) * 100}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <div className="relative">
                                                <div className="absolute inset-0 animate-ping rounded-full scale-[2.5] opacity-20" style={{ backgroundColor: coord.color }}></div>
                                                <div className="size-3.5 rounded-full border-[3px] border-white shadow-xl transition-all group-hover/dot:scale-150 duration-300 ring-4 ring-transparent group-hover/dot:ring-blue-100" style={{ backgroundColor: coord.color }}></div>

                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/dot:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover/dot:translate-y-0 z-50">
                                                    <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-slate-100 min-w-[150px]">
                                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1.5">{country}</div>
                                                        <div className="flex items-center justify-between gap-6">
                                                            <span className="text-xs font-bold text-slate-900">Active Apps</span>
                                                            <span className="text-xs font-black text-[#1E63F3] bg-blue-50 px-2.5 py-1 rounded-full">{count}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-lg text-slate-900 tracking-tight">Recent Activity</h3>
                            <button className="text-[10px] font-bold text-[#1E63F3] uppercase tracking-widest hover:underline">View All Notifications</button>
                        </div>
                        <div className="space-y-8">
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <div key={`${activity.type}-${activity.id}-${index}`} className="flex gap-5">
                                        <div className="flex flex-col items-center">
                                            <div className={`size-4 rounded-full ${activity.type === 'application' ? 'bg-[#1E63F3] ring-[6px] ring-[#1E63F3]/10' : 'bg-slate-200'}`}></div>
                                            {index !== recentActivities.length - 1 && <div className="w-[2px] h-full bg-slate-100 dark:bg-slate-800 mt-2"></div>}
                                        </div>
                                        <div className="pb-2">
                                            <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{activity.description}</p>
                                            <p className={`text-[9px] font-black uppercase mt-2 tracking-widest w-fit px-2 py-1 rounded ${activity.type === 'application' ? 'text-[#1E63F3] bg-[#1E63F3]/5' : 'text-slate-400 bg-slate-50'}`}>
                                                {activity.timeLabel}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                    <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
                                    <p className="text-xs font-bold uppercase tracking-widest">No recent activity</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Performing Programs & Profile Completion */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shadow-blue-100/50">
                            <h3 className="font-bold text-lg text-slate-900 tracking-tight mb-5 px-1">Top Performing Programs</h3>
                            <div className="space-y-4">
                                {displayPrograms.map((program) => (
                                    <div key={program.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{program.name}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">{program.apps} Applications</p>
                                        </div>
                                        <span className={`text-[10px] font-black ${program.apps > 0 ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400 bg-slate-50'} px-2 py-1 rounded-lg`}>{program.trend}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm shadow-blue-100/50 relative overflow-hidden group">
                            <h3 className="font-bold text-lg text-slate-900 tracking-tight mb-4 px-1">Profile Completion</h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between px-1">
                                    <div>
                                        <span className="text-[10px] font-bold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                                            Intermediate
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold inline-block text-blue-600">
                                            85%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-100/50 mx-1">
                                    <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                                </div>
                                <p className="text-[10px] text-slate-500 px-1 leading-relaxed">Add <span className="font-bold text-slate-700 underline">Scholarship Details</span> to reach 100% and gain higher visibility.</p>
                            </div>
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl text-blue-500/5 group-hover:scale-110 transition-transform duration-700 px-1">verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </UniversityLayout>
    );
};

export default UniversityDashboard;
