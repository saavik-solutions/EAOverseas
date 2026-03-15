import { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { University } from '../models/University';

// Simple in-memory job tracking
const activeJobs = new Map<string, any>();

export const startScraper = async (req: Request, res: Response) => {
    try {
        const { source, config } = req.body;
        const jobId = `job_${Date.now()}`;

        // Path to the scraper script
        const scriptPath = path.join(__dirname, '../../scraper_engine/main.py');

        // In a real scenario, we'd use a worker queue like BullMQ
        // For now, we spawn a child process
        const pythonProcess = spawn('python', [
            scriptPath,
            '--source', source,
            '--jobId', jobId,
            '--config', JSON.stringify(config)
        ]);

        activeJobs.set(jobId, {
            status: 'running',
            progress: 0,
            logs: [],
            startTime: new Date()
        });

        pythonProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log(`[Scraper ${jobId}] ${output}`);
            // Parse progress or logs from output if needed
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`[Scraper ${jobId} Error] ${data}`);
        });

        pythonProcess.on('close', (code) => {
            const job = activeJobs.get(jobId);
            if (job) {
                job.status = code === 0 ? 'completed' : 'failed';
            }
            console.log(`Scraper child process exited with code ${code}`);
        });

        res.status(202).json({
            jobId,
            message: 'Scraping engine initiated successfully',
            status: 'running'
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate scraper engine' });
    }
};

export const getScrapedUniversities = async (req: Request, res: Response) => {
    try {
        const { country, course, ranking } = req.query;
        const query: any = {};

        if (country) query.country = country;
        if (ranking) query.ranking = ranking;
        if (course) query['courses.degree'] = { $regex: course, $options: 'i' };

        const universities = await University.find(query).sort({ scraped_at: -1 });
        res.status(200).json({ count: universities.length, universities });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch universities' });
    }
};

export const getJobStatus = async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const job = activeJobs.get(jobId);

    if (!job) {
        return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(job);
};
