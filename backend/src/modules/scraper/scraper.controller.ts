import { FastifyRequest, FastifyReply } from 'fastify';
import { spawn } from 'child_process';
import path from 'path';
import { ScrapedUniversity } from './models/ScrapedUniversity';

const activeJobs = new Map<string, any>();

export const startScraper = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { source, config } = req.body as any;
    const jobId = `job_${Date.now()}`;

    // Adjust path to the scraper script relative to backend
    const scriptPath = path.join(__dirname, '../../../../scraper_engine/main.py');

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

    return reply.status(202).send({
      jobId,
      message: 'Scraping engine initiated successfully',
      status: 'running'
    });

  } catch (error) {
    req.log.error(error);
    return reply.status(500).send({ error: 'Failed to initiate scraper engine' });
  }
};

export const getScrapedUniversities = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { country, course, ranking } = req.query as any;
    const query: any = {};

    if (country) query.country = country;
    if (ranking) query.ranking = ranking;
    if (course) query['courses.degree'] = { $regex: course, $options: 'i' };

    const universities = await ScrapedUniversity.find(query).sort({ scraped_at: -1 });
    return reply.status(200).send({ count: universities.length, universities });
  } catch (error) {
    req.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch universities' });
  }
};

export const getJobStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { jobId } = req.params as any;
  const job = activeJobs.get(jobId);

  if (!job) {
    return reply.status(404).send({ error: 'Job not found' });
  }

  return reply.status(200).send(job);
};
