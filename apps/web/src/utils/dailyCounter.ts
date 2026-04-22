// Daily Active Student Counter Utility
// Tracks students visiting the platform with automatic midnight reset

interface DailyCountData {
    count: number;
    date: string;
}

const STORAGE_KEY = 'daily_active_count';

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Reset counter if it's a new day
 */
function resetIfNewDay(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayDate();

    if (stored) {
        const data: DailyCountData = JSON.parse(stored);
        if (data.date !== today) {
            // New day detected, reset counter
            const newData: DailyCountData = {
                count: 0,
                date: today
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        }
    } else {
        // Initialize if not exists
        const newData: DailyCountData = {
            count: 0,
            date: today
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }
}

/**
 * Get current daily active count
 */
export function getDailyCount(): number {
    resetIfNewDay();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        const data: DailyCountData = JSON.parse(stored);
        return data.count;
    }
    return 0;
}

/**
 * Increment the daily active count
 */
export function incrementCount(): number {
    resetIfNewDay();
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayDate();

    if (stored) {
        const data: DailyCountData = JSON.parse(stored);
        data.count += 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data.count;
    } else {
        const newData: DailyCountData = {
            count: 1,
            date: today
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        return 1;
    }
}

/**
 * Decrement the daily active count (minimum 0)
 */
export function decrementCount(): number {
    resetIfNewDay();
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayDate();

    if (stored) {
        const data: DailyCountData = JSON.parse(stored);
        data.count = Math.max(0, data.count - 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data.count;
    }
    return 0;
}

/**
 * Manually reset the counter (for testing purposes)
 */
export function resetCount(): void {
    const today = getTodayDate();
    const newData: DailyCountData = {
        count: 0,
        date: today
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
}
