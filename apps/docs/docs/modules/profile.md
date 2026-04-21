# Profile Module

The Profile module handles student educational identities, document management, and profile strength calculations.

## Features

- **Multi-section Profile**: Basic Info, Academic History, Test Scores, Goals, Budget, and Extras.
- **Document Management**: S3/R2-based document uploads for transcripts and certificates.
- **Profile Strength Meter**: Dynamic calculation of profile completeness to drive user engagement.
- **Public Profiles**: Shareable profile URLs (e.g., `/u/johndoe`) for students to showcase their academic history.

## Profile Sections

| Section | Description | Weight |
| --- | --- | --- |
| Basic Info | Name, location, bio | 20% |
| Academics | 10th, 12th, and UG history | 25% |
| Test Scores | IELTS, TOEFL, SAT, etc. | 15% |
| Goals | Target degree and countries | 15% |
| Documents | Uploaded transcripts/SOP | 10% |
| Budget | Financial range | 10% |
| Extras | Work exp, achievements | 5% |

## Endpoints

| Method | Path | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/v1/profile` | Get current user's profile | Authenticated |
| `PUT` | `/api/v1/profile/basic` | Update basic information | Authenticated |
| `POST` | `/api/v1/profile/documents` | Get presigned upload URL | Authenticated |
| `GET` | `/api/v1/users/:username` | View public profile | Public |

## Document Upload Flow

1. Client requests a presigned URL from `/profile/documents`.
2. Backend generates a Cloudflare R2 presigned URL and returns a `documentId`.
3. Client uploads the file directly to R2.
4. Backend tracks the document metadata in the database.
