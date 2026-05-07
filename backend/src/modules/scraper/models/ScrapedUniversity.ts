import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse {
    degree: string;
    specialization: string;
    duration: string;
}

export interface IFees {
    tuition: string;
    hostel: string;
}

export interface IScrapedUniversity extends Document {
    university_id: string;
    name: string;
    website: string;
    country: string;
    city: string;
    courses: ICourse[];
    fees: IFees;
    scholarships: string[];
    ranking?: string;
    facilities?: string[];
    language?: string;
    admissionRequirements?: string;
    placementStatistics?: string;
    logoUrl?: string;
    scraped_at: Date;
}

const ScrapedUniversitySchema: Schema = new Schema(
    {
        university_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        website: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String },
        courses: [
            {
                degree: { type: String },
                specialization: { type: String },
                duration: { type: String }
            }
        ],
        fees: {
            tuition: { type: String },
            hostel: { type: String }
        },
        scholarships: [{ type: String }],
        ranking: { type: String },
        facilities: [{ type: String }],
        language: { type: String },
        admissionRequirements: { type: String },
        placementStatistics: { type: String },
        logoUrl: { type: String },
        scraped_at: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

ScrapedUniversitySchema.index({ country: 1 });
ScrapedUniversitySchema.index({ name: 'text' });

export const ScrapedUniversity = mongoose.model<IScrapedUniversity>('ScrapedUniversity', ScrapedUniversitySchema);
