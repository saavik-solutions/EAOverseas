import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';

const ConsultantSchedule = () => {
    // UI State
    const [view, setView] = useState('week'); // 'week' | 'month'

    // Configuration State
    const [config, setConfig] = useState({
        recurring: true,
        autoAccept: false,
        bufferTime: '15 mins',
        monFri: true,
        satSun: false
    });

    // Date State
    const [currentDate, setCurrentDate] = useState(new Date()); // The reference date for the current view
    const [weekDates, setWeekDates] = useState([]);

    // Schedule Data State (Mock Database) - Load from LocalStorage immediately or use defaults
    const [scheduleItems, setScheduleItems] = useState(() => {
        const saved = localStorage.getItem('eao_consultant_schedule');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing schedule items", e);
            }
        }
        // Default lunch slots for Mon-Sat (13:00-14:00) - Sunday excluded
        return [
            { id: 102, dayIndex: 1, date: null, startTime: '13:00', endTime: '14:00', type: 'blocked', title: 'Lunch Break', details: 'Automatic' },
            { id: 103, dayIndex: 2, date: null, startTime: '13:00', endTime: '14:00', type: 'blocked', title: 'Lunch Break', details: 'Automatic' },
            { id: 104, dayIndex: 3, date: null, startTime: '13:00', endTime: '14:00', type: 'blocked', title: 'Lunch Break', details: 'Automatic' },
            { id: 105, dayIndex: 4, date: null, startTime: '13:00', endTime: '14:00', type: 'blocked', title: 'Lunch Break', details: 'Automatic' },
            { id: 106, dayIndex: 5, date: null, startTime: '13:00', endTime: '14:00', type: 'blocked', title: 'Lunch Break', details: 'Automatic' },
            { id: 107, dayIndex: 6, date: null, startTime: '13:00', endTime: '14:00', type: 'blocked', title: 'Lunch Break', details: 'Automatic' }
        ];
    });

    // Save schedule to LocalStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('eao_consultant_schedule', JSON.stringify(scheduleItems));
    }, [scheduleItems]);

    // Leave Management State
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [selectedLeaveDate, setSelectedLeaveDate] = useState(null);
    const [leaveStep, setLeaveStep] = useState(1); // 1: Selection, 2: Reason
    const [leaveType, setLeaveType] = useState('full'); // 'full' | 'half'
    const [isMultiDay, setIsMultiDay] = useState(false);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [leaveReason, setLeaveReason] = useState('');
    const [leaveAttachment, setLeaveAttachment] = useState(null);

    const handleDayHeaderClick = (date: Date) => {
        if (date.getDay() === 0) return; // Ignore Sunday
        setSelectedLeaveDate(date);
        setEndDate(date);
        setIsMultiDay(false);
        setLeaveStep(1);
        setLeaveType('full');
        setLeaveReason('');
        setLeaveAttachment(null);
        setIsLeaveModalOpen(true);
    };

    const handleApplyLeave = () => {
        if (!selectedLeaveDate || !leaveReason) return;

        const requests = [];
        const start = new Date(selectedLeaveDate);
        const end = isMultiDay && endDate ? new Date(endDate) : new Date(selectedLeaveDate);

        // Ensure end is not before start
        if (end < start) return;

        const current = new Date(start);
        while (current <= end) {
            if (current.getDay() !== 0) { // Skip Sundays
                requests.push({
                    id: Math.floor(Date.now() + Math.random() * 1000),
                    dayIndex: current.getDay(),
                    date: current.toLocaleDateString(),
                    startTime: leaveType === 'full' ? '09:00' : '13:00',
                    endTime: '17:00',
                    type: 'blocked',
                    status: 'pending',
                    title: leaveType === 'full' ? 'Full Day Holiday' : 'Half Day Holiday',
                    details: leaveReason,
                    attachment: leaveAttachment ? (leaveAttachment as any).name : null,
                    consultantName: 'Elena Rodriguez',
                    consultantEmail: 'elena.r@eaoverseas.com',
                    applyDate: new Date().toLocaleDateString()
                });
            }
            current.setDate(current.getDate() + 1);
        }

        setScheduleItems(prev => [...prev, ...requests]);
        setIsLeaveModalOpen(false);
        setSelectedLeaveDate(null);
        setEndDate(null);
        setIsMultiDay(false);
        setLeaveStep(1);
        setLeaveReason('');
    };



    // Update the displayed week whenever 'currentDate' changes
    useEffect(() => {
        const startOfWeek = new Date(currentDate);
        const day = startOfWeek.getDay(); // 0 (Sun) to 6 (Sat)
        // Adjust to make Monday the first day
        const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);

        const week = [];
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(startOfWeek);
            nextDay.setDate(startOfWeek.getDate() + i);
            week.push(nextDay);
        }
        setWeekDates(week);
    }, [currentDate]);

    // Ensure lunch breaks are present for Mon-Sat (Indices 1-6)
    useEffect(() => {
        const existingLunchBreaks = scheduleItems.filter(item => item.title === 'Lunch Break');

        // Check if lunch breaks exist for Mon(1) to Sat(6)
        const missingDayIndices = [];
        // Loop from 1 (Mon) to 6 (Sat). Skip 0 (Sun).
        for (let dayIndex = 1; dayIndex <= 6; dayIndex++) {
            const hasLunch = existingLunchBreaks.some(item => item.dayIndex === dayIndex);
            if (!hasLunch) {
                missingDayIndices.push(dayIndex);
            }
        }

        // Add missing lunch breaks
        if (missingDayIndices.length > 0) {
            const newLunchBreaks = missingDayIndices.map(dayIndex => ({
                id: 100 + dayIndex + 1,
                dayIndex: dayIndex,
                date: null,
                startTime: '13:00',
                endTime: '14:00',
                type: 'blocked',
                title: 'Lunch Break',
                details: 'Automatic'
            }));
            setScheduleItems(prev => [...prev, ...newLunchBreaks]);
        }
    }, [scheduleItems]); // Dependent on scheduleItems to check existence, might cause loop if not careful. 
    // Better: check once on mount or when week changes if dynamic. 
    // Current logic is fine as long as we only ADD missing ones.

    // Navigation Handlers
    const handlePrev = () => {
        const newDate = new Date(currentDate);
        if (view === 'week') {
            newDate.setDate(newDate.getDate() - 7);
        } else {
            newDate.setMonth(newDate.getMonth() - 1);
        }
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        if (view === 'week') {
            newDate.setDate(newDate.getDate() + 7);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
    };

    // Helper to format Month Year
    const getMonthYear = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (view === 'month') {
            return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        }

        if (weekDates.length === 0) return '';
        const firstDay = weekDates[0];
        const lastDay = weekDates[6];

        if (firstDay.getMonth() === lastDay.getMonth()) {
            return `${monthNames[firstDay.getMonth()]} ${firstDay.getFullYear()}`;
        } else {
            return `${monthNames[firstDay.getMonth()]} - ${monthNames[lastDay.getMonth()]} ${lastDay.getFullYear()}`;
        }
    };

    // Helper: Generate Month Grid Days
    const getMonthDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const daysInMonth = lastDayOfMonth.getDate();

        const adjustedGridDays = [];

        // Let's align Month view to Monday start.
        const startDay = firstDayOfMonth.getDay(); // 0=Sun, 1=Mon
        const shift = startDay === 0 ? 6 : startDay - 1; // Mon=0, ..., Sun=6

        // Padding for previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = 0; i < shift; i++) {
            adjustedGridDays.push({
                day: daysInPrevMonth - shift + 1 + i,
                currentMonth: false,
                date: new Date(year, month - 1, daysInPrevMonth - shift + 1 + i)
            });
        }

        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            adjustedGridDays.push({
                day: i,
                currentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next month padding to fill 42 cells (6 rows)
        const totalCells = 42;
        const remainingCells = totalCells - adjustedGridDays.length;
        for (let i = 1; i <= remainingCells; i++) {
            adjustedGridDays.push({
                day: i,
                currentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }

        return adjustedGridDays;
    };


    // Helper: Convert time string (HH:MM) to pixels (from top 09:00)
    // Grid starts at 09:00. 1 hour = 80px.
    const getPositionFromTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const startHour = 9;
        const totalMinutes = (hours - startHour) * 60 + minutes;
        // 80px per 60 mins -> 1.333 px per min
        return (totalMinutes / 60) * 80;
    };

    // Helper: Convert duration to height
    const getHeightFromDuration = (startStr, endStr) => {
        const [startH, startM] = startStr.split(':').map(Number);
        const [endH, endM] = endStr.split(':').map(Number);
        const durationMins = (endH * 60 + endM) - (startH * 60 + startM);
        return (durationMins / 60) * 80;
    };

    // Helper: Calculate daily stats
    const getDailyStats = () => {
        return weekDates.map(date => {
            const dayIndex = date.getDay();
            const isWeekend = dayIndex === 0 || dayIndex === 6;

            // Base hours driven by config (simplified for demo)
            // Mon-Fri: 8h (9-17), Sat-Sun: 0h unless configured otherwise
            let baseHours = 0;
            if (!isWeekend && config.monFri) baseHours = 8;
            if (isWeekend && config.satSun) baseHours = 8; // Assuming 8h for weekend if enabled

            // Find events for this day
            const events = scheduleItems.filter(i => i.dayIndex === dayIndex);

            // Calculate occupied hours
            const occupiedHours = events.reduce((acc, curr) => {
                const [sh, sm] = curr.startTime.split(':').map(Number);
                const [eh, em] = curr.endTime.split(':').map(Number);
                return acc + ((eh * 60 + em) - (sh * 60 + sm)) / 60;
            }, 0);

            return {
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                available: Math.max(0, baseHours - occupiedHours).toFixed(1),
                isWeekend
            };
        });
    };

    const dailyStatsRes = getDailyStats();
    const totalAvailable = dailyStatsRes.reduce((acc, curr) => acc + parseFloat(curr.available), 0).toFixed(1);

    // Helper: Calculate Monthly Stats based on recurring weekly schedule
    const getMonthlyStats = () => {
        const year = currentDate.getFullYear();
        const months = [];
        const now = new Date();

        for (let m = 0; m < 12; m++) {
            const firstDay = new Date(year, m, 1);
            const lastDay = new Date(year, m + 1, 0);
            const daysInMonth = lastDay.getDate();

            // Check if month is in the future
            const isFuture = year > now.getFullYear() || (year === now.getFullYear() && m > now.getMonth());

            let workingHours = 0;
            let bookedCount = 0;
            let blockedHours = 0;

            // Iterate every day in the month to apply recurring schedule
            for (let d = 1; d <= daysInMonth; d++) {
                const currentDayDate = new Date(year, m, d);
                const dayIndex = currentDayDate.getDay(); // 0-6
                const isWeekend = dayIndex === 0 || dayIndex === 6;

                // Base Daily Capacity (8h weekdays, 8h weekends if configured)
                let dailyCapacity = 0;
                if (!isWeekend && config.monFri) dailyCapacity = 8;
                if (isWeekend && config.satSun) dailyCapacity = 8;

                // Find events recurring on this dayIndex
                const dayEvents = scheduleItems.filter(i => i.dayIndex === dayIndex);

                let dayOccupiedHours = 0;

                dayEvents.forEach(evt => {
                    const [sh, sm] = evt.startTime.split(':').map(Number);
                    const [eh, em] = evt.endTime.split(':').map(Number);
                    const duration = ((eh * 60 + em) - (sh * 60 + sm)) / 60;

                    if (evt.type === 'booked') {
                        bookedCount++;
                        dayOccupiedHours += duration;
                    } else if (evt.type === 'blocked') {
                        blockedHours += duration;
                        dayOccupiedHours += duration;
                    }
                });

                workingHours += Math.max(0, dailyCapacity - dayOccupiedHours);
            }

            months.push({
                name: firstDay.toLocaleString('default', { month: 'long' }),
                workingHours: isFuture ? '-' : workingHours.toFixed(1),
                bookedCount: isFuture ? '-' : bookedCount,
                blockedHours: isFuture ? '-' : blockedHours.toFixed(1),
                isCurrent: m === now.getMonth() && year === now.getFullYear(),
                isPast: new Date(year, m + 1, 0) < now
            });
        }
        return months;
    };

    const monthlyStats = getMonthlyStats();

    // Interaction: Add Slot on Grid Click
    const handleGridClick = (e, dayDate) => {
        // Disabled: Clicking on grid slots no longer creates new blocked slots as per new requirement.
        // It will strictly be used for viewing or interacting with existing slots if needed.
        return;
    };

    // Interaction: Remove Slot
    const handleRemoveSlot = (e, id) => {
        e.stopPropagation(); // Prevent grid click
        setScheduleItems(scheduleItems.filter(item => item.id !== id));
    };

    // Toggle Handler
    const handleConfigChange = (key) => {
        setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleBufferChange = (e) => {
        setConfig(prev => ({ ...prev, bufferTime: e.target.value }));
    };

    const handleSave = () => {
        alert("Availability settings saved successfully!");
    };


    // Calculate position for current time indicator
    const getCurrentTimePosition = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        if (hours < 9 || hours > 17) return null;
        const pixelsPerHour = 80;
        const offsetHours = hours - 9;
        return (offsetHours * pixelsPerHour) + ((minutes / 60) * pixelsPerHour);
    };

    const timePosition = getCurrentTimePosition();

    const headerActions = null;

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-50/50">
            <PageHeader
                title="Manage My Availability"
                actions={headerActions}
            />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                <div className="w-full h-full flex flex-col gap-6">

                    {/* Main Grid Layout */}
                    <div className="flex flex-col xl:flex-row gap-6 h-full flex-1 min-h-[600px]">
                        {/* Left Column: Calendar */}
                        <div className="flex-1 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200 flex flex-col overflow-hidden">
                            {/* Calendar Toolbar */}
                            <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-white">
                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                                    <button
                                        onClick={() => setView('week')}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium shadow-sm transition-all ${view === 'week' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
                                        Week
                                    </button>
                                    <button
                                        onClick={() => setView('month')}
                                        className={`px-3 py-1.5 rounded-md text-sm font-medium shadow-sm transition-all ${view === 'month' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                                    >
                                        Month
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    {view === 'week' ? (
                                        <>
                                            <button onClick={handlePrev} className="p-1 hover:bg-gray-50 rounded-full transition-colors active:scale-90"><span className="material-symbols-outlined">chevron_left</span></button>
                                            <span className="text-lg font-bold text-gray-900 min-w-[140px] text-center">{getMonthYear()}</span>
                                            <button onClick={handleNext} className="p-1 hover:bg-gray-50 rounded-full transition-colors active:scale-90"><span className="material-symbols-outlined">chevron_right</span></button>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold text-gray-900 min-w-[140px] text-center">Year {currentDate.getFullYear()} Stats</span>
                                    )}
                                </div>
                                <div className="flex gap-4 text-sm font-medium">
                                    {view === 'week' && (
                                        <>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-500"></span>
                                                <span className="text-gray-400">Lunch</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-orange-100 border border-orange-500"></span>
                                                <span className="text-gray-400">Pending</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-400"></span>
                                                <span className="text-gray-400">Booked</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-red-50 border border-red-400"></span>
                                                <span className="text-gray-400">Blocked</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Calendar Views */}
                            {view === 'week' ? (
                                <div className="flex-1 overflow-y-auto relative bg-white">
                                    {/* Header Row (Days) */}
                                    <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 bg-white z-30 shadow-sm">
                                        <div className="p-3 text-xs font-semibold text-gray-500 text-center border-r border-gray-200 flex items-center justify-center">Time</div>

                                        {weekDates.map((date, index) => {
                                            const today = new Date();
                                            const isToday = date.getDate() === today.getDate() &&
                                                date.getMonth() === today.getMonth() &&
                                                date.getFullYear() === today.getFullYear();
                                            const isSunday = date.getDay() === 0;

                                            const daysMap = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                                            const dayName = daysMap[date.getDay()];

                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => handleDayHeaderClick(date)}
                                                    className={`p-3 text-center border-r border-gray-200 transition-colors ${!isSunday ? 'cursor-pointer hover:bg-gray-50' : ''} ${isToday ? 'bg-blue-600/5' : ''} ${isSunday ? 'bg-green-50/50' : ''}`}
                                                    title={!isSunday ? "Click to set Leave" : "Holiday"}
                                                >
                                                    <div className={`text-xs font-medium ${isToday ? 'text-blue-600' : isSunday ? 'text-green-600' : 'text-gray-500'}`}>{dayName}</div>
                                                    <div className={`text-sm font-bold ${isToday ? 'text-blue-600 bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mt-1' : isSunday ? 'text-green-600 mt-1' : 'text-gray-900 mt-1'}`}>
                                                        {date.getDate()}
                                                    </div>
                                                    {isSunday && (
                                                        <div className="mt-1">
                                                            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full border border-green-200">
                                                                Holiday
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>


                                    {/* Time Slots Grid */}
                                    <div className="grid grid-cols-8 relative h-[800px]">
                                        {/* Time Labels */}
                                        <div className="col-span-1 border-r border-gray-200">
                                            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                                                <div key={time} className="h-20 border-b border-gray-100 relative">
                                                    <span className="absolute top-2 right-2 text-xs text-gray-400 bg-white px-1">{time}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Columns container */}
                                        <div className="col-span-7 grid grid-cols-7 relative">
                                            {/* Background Lines */}
                                            <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
                                                {[...Array(8)].map((_, i) => <div key={i} className="h-20 border-b border-gray-100 w-full border-dashed"></div>)}
                                            </div>

                                            {/* Day Columns */}
                                            {weekDates.map((date, colIndex) => (
                                                <div
                                                    key={colIndex}
                                                    className="border-r border-gray-100 h-full relative group/col"
                                                    onClick={(e) => handleGridClick(e, date)}
                                                >
                                                    {/* Hover effect for adding slot */}
                                                    <div className="absolute inset-0 bg-blue-50/0 group-hover/col:bg-blue-50/10 transition-colors pointer-events-none"></div>

                                                    {/* Events for this day */}
                                                    {scheduleItems
                                                        .filter(item => item.dayIndex === date.getDay())
                                                        .map(item => {
                                                            const top = getPositionFromTime(item.startTime);
                                                            const height = getHeightFromDuration(item.startTime, item.endTime);

                                                            let bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
                                                            let iconName = "";

                                                             if (item.type === 'booked') {
                                                                bgClass = "bg-gray-100 border-gray-500 text-gray-700";
                                                                iconName = "lock";
                                                            } else if (item.type === 'blocked') {
                                                                // Check if it's a lunch break
                                                                if (item.title === 'Lunch Break') {
                                                                    bgClass = "bg-yellow-50 border-yellow-500 text-yellow-700 opacity-90";
                                                                    iconName = "restaurant";
                                                                } else {
                                                                    // Check status: pending, approved, rejected
                                                                    if (item.status === 'pending') {
                                                                        bgClass = "bg-orange-50 border-double border-orange-400 text-orange-700 opacity-90 ring-4 ring-orange-50/50";
                                                                        iconName = "schedule";
                                                                    } else if (item.status === 'approved') {
                                                                        bgClass = "bg-emerald-50 border-emerald-500 text-emerald-700 opacity-100 shadow-sm border-l-[6px]";
                                                                        iconName = "verified";
                                                                    } else if (item.status === 'rejected') {
                                                                        bgClass = "bg-rose-50 border-rose-500 text-rose-700 opacity-80 striped-background border-l-[6px]";
                                                                        iconName = "cancel";
                                                                    } else {
                                                                        bgClass = "bg-gray-50 border-gray-300 text-gray-500";
                                                                        iconName = "block";
                                                                    }
                                                                }
                                                            }

                                                                    return (
                                                                <div
                                                                    key={item.id}
                                                                    className={`absolute w-[95%] left-[2.5%] border-l-4 rounded px-2 py-1 cursor-pointer hover:shadow-md transition-all z-10 flex flex-col justify-between group/event ${bgClass}`}
                                                                    style={{ top: `${top}px`, height: `${height}px` }}
                                                                >
                                                                    <div>
                                                                        <div className="flex items-center justify-between gap-1 w-full">
                                                                            <div className="flex items-center gap-1 min-w-0">
                                                                                {iconName && <span className="material-symbols-outlined text-[14px] shrink-0">{iconName}</span>}
                                                                                <span className="text-xs font-black truncate leading-tight uppercase tracking-tight">{item.title}</span>
                                                                            </div>
                                                                            {item.status === 'pending' && (
                                                                                <span className="text-[8px] font-black bg-orange-600 text-white px-1.5 py-0.5 rounded-full animate-pulse tracking-widest shrink-0">PENDING</span>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-[10px] font-bold opacity-70 mt-0.5">{item.startTime} - {item.endTime}</div>
                                                                        {item.details && (
                                                                            <div className="text-[10px] mt-2 font-bold bg-white/40 p-1.5 rounded-lg border border-current/10 italic leading-snug truncate">
                                                                                "{item.details}"
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            ))}

                                            {/* Current Time Indicator logic could go here attached to correct column */}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto bg-white p-6">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 px-4 font-bold text-gray-500 text-sm">Month ({currentDate.getFullYear()})</th>
                                                <th className="py-3 px-4 font-bold text-gray-500 text-sm text-right">Working Hours</th>
                                                <th className="py-3 px-4 font-bold text-gray-500 text-sm text-right">Meetings Joined</th>
                                                <th className="py-3 px-4 font-bold text-gray-500 text-sm text-right">Time Blocked</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthlyStats.map((month, idx) => (
                                                <tr
                                                    key={idx}
                                                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors
                                                        ${month.isCurrent ? 'bg-blue-50/50' : ''}
                                                        ${month.isPast ? 'opacity-60 grayscale' : ''}
                                                    `}
                                                >
                                                    <td className="py-3 px-4 font-semibold text-gray-800 flex items-center gap-2">
                                                        {month.name}
                                                        {month.isCurrent && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">CURRENT</span>}
                                                    </td>
                                                    <td className="py-3 px-4 text-right font-medium text-emerald-600">{month.workingHours}h</td>
                                                    <td className="py-3 px-4 text-right font-medium text-gray-700">{month.bookedCount}</td>
                                                    <td className="py-3 px-4 text-right font-medium text-red-500">{month.blockedHours}h</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        {/* Right Column: Settings & Summary */}
                        <div className="w-full xl:w-[320px] flex flex-col gap-6 shrink-0 md:hidden xl:flex">
                            {/* Dynamic Stats Card */}
                            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200 p-5">
                                {view === 'week' ? (
                                    <>
                                        <h3 className="text-gray-900 font-bold text-lg mb-4">Weekly Availability</h3>
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                            <span className="text-gray-500 text-sm">Total Hours</span>
                                            <span className="text-2xl font-bold text-blue-600">{totalAvailable}h</span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {dailyStatsRes.map((stat, idx) => (
                                                <div key={idx} className={`flex items-center justify-between text-sm p-2 rounded-lg ${stat.date === new Date().getDate() ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-8">{stat.dayName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(stat.available / 8) * 100}%` }}></div>
                                                        </div>
                                                        <span className="w-8 text-right font-medium">{stat.available}h</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-gray-900 font-bold text-lg mb-4">Current Month Availability</h3>
                                        {(() => {
                                            const currentMonthStat = monthlyStats.find(m => m.isCurrent) || { workingHours: 0, bookedCount: 0, blockedHours: 0 };
                                            return (
                                                <>
                                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                                                        <div className="flex flex-col">
                                                            <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Working Hours</span>
                                                            <span className="text-3xl font-bold text-emerald-600 mt-1">{currentMonthStat.workingHours}h</span>
                                                        </div>
                                                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                                                            <span className="material-symbols-outlined text-emerald-600 text-xl">schedule</span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                                                            <span className="text-gray-500 text-xs block mb-1">Meetings</span>
                                                            <span className="text-xl font-bold text-gray-900">{currentMonthStat.bookedCount}</span>
                                                        </div>
                                                        <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                                                            <span className="text-red-600/80 text-xs block mb-1">Blocked</span>
                                                            <span className="text-xl font-bold text-red-700">{currentMonthStat.blockedHours}h</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </>
                                )}
                            </div>

                            {/* Lunch Break Notice */}
                            <div className="bg-amber-50 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-amber-200 p-5 flex gap-3">
                                <span className="material-symbols-outlined text-amber-600 mt-0.5">restaurant</span>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-gray-900">Automatic Lunch Break</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">1 hour lunch break (13:00 - 14:00) is automatically assigned to all days.</p>
                                </div>
                            </div>

                            {/* Help/Tip */}
                            <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
                                <span className="material-symbols-outlined text-blue-600 mt-0.5">info</span>
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-gray-900">Need a break?</p>
                                    <p className="text-xs text-gray-400 leading-relaxed">You can block out entire days by clicking the day header in the calendar.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            {/* Leave Management Modal */}
            {isLeaveModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div className="flex flex-col">
                                <h3 className="font-black text-gray-900 tracking-tight">Request Holiday</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{selectedLeaveDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <button onClick={() => setIsLeaveModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 p-1.5 rounded-full">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <div className="p-6">
                            {leaveStep === 1 ? (
                                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Multi-day Leave?</span>
                                        <button 
                                            onClick={() => setIsMultiDay(!isMultiDay)}
                                            className={`w-10 h-5 rounded-full transition-all relative ${isMultiDay ? 'bg-blue-600' : 'bg-slate-200'}`}
                                        >
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isMultiDay ? 'left-6' : 'left-1'}`}></div>
                                        </button>
                                    </div>

                                    {isMultiDay && (
                                        <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 animate-in slide-in-from-top-2 duration-300">
                                            <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest block mb-2">End Date</label>
                                            <input 
                                                type="date" 
                                                min={selectedLeaveDate ? new Date(selectedLeaveDate.getTime() + 86400000).toISOString().split('T')[0] : ''}
                                                onChange={(e) => setEndDate(new Date(e.target.value))}
                                                className="w-full p-2.5 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-700 focus:ring-2 focus:ring-blue-100 outline-none"
                                            />
                                            <p className="text-[9px] text-blue-400 font-bold mt-2 italic">* Sundays will be automatically skipped</p>
                                        </div>
                                    )}

                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Duration</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button
                                            onClick={() => { setLeaveType('full'); setLeaveStep(2); }}
                                            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="size-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                                    <span className="material-symbols-outlined">event_available</span>
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 group-hover:text-blue-900 leading-none">Full Day Holiday</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">09:00 AM - 05:00 PM</div>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-600">chevron_right</span>
                                        </button>

                                        {!isMultiDay && (
                                            <button
                                                onClick={() => { setLeaveType('half'); setLeaveStep(2); }}
                                                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:bg-amber-50 hover:border-amber-200 transition-all flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="size-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                                                        <span className="material-symbols-outlined">partly_cloudy_day</span>
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-gray-900 group-hover:text-amber-900 leading-none">Half Day Holiday</div>
                                                        <div className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">09:00 AM - 01:00 PM</div>
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-gray-200 group-hover:text-amber-300">chevron_right</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Reason for holiday</p>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${leaveType === 'full' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {leaveType === 'full' ? 'FULL DAY' : 'HALF DAY'}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <textarea 
                                            autoFocus
                                            value={leaveReason}
                                            onChange={(e) => setLeaveReason(e.target.value)}
                                            placeholder="Please write your excuse here..."
                                            className="w-full h-32 p-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none text-sm font-medium resize-none transition-all placeholder:text-gray-300"
                                        />
                                        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400">
                                            {leaveReason.length} characters
                                        </div>
                                    </div>

                                    {/* Attachment Section */}
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Supporting Document (Optional)</p>
                                        {!leaveAttachment ? (
                                            <label className="w-full h-12 flex items-center justify-center gap-2 border-2 border-dashed border-gray-100 rounded-xl cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all text-xs font-bold text-gray-400 hover:text-blue-600">
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    onChange={(e) => setLeaveAttachment(e.target.files?.[0] || null)}
                                                />
                                                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                                                Upload Attachment
                                            </label>
                                        ) : (
                                            <div className="w-full p-2.5 rounded-xl border-2 border-blue-100 bg-blue-50/50 flex items-center justify-between">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="material-symbols-outlined text-blue-600 text-[20px]">description</span>
                                                    <span className="text-[11px] font-bold text-blue-900 truncate">{leaveAttachment.name}</span>
                                                </div>
                                                <button onClick={() => setLeaveAttachment(null)} className="p-1 hover:bg-blue-100 rounded-lg text-blue-400 hover:text-blue-600 transition-colors">
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setLeaveStep(1)}
                                            className="flex-1 py-3 text-xs font-black text-gray-400 hover:bg-gray-50 rounded-xl transition-all uppercase tracking-widest"
                                        >
                                            Back
                                        </button>
                                        <button 
                                            onClick={handleApplyLeave}
                                            disabled={!leaveReason.trim()}
                                            className={`flex-[2] py-3 text-xs font-black rounded-xl transition-all uppercase tracking-widest shadow-lg ${leaveReason.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultantSchedule;
