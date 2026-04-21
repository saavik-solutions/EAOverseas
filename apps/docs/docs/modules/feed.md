# Global Feed Module

The Global Feed module serves as the primary information hub for students, featuring curated news, admission alerts, and scholarship updates.

## Features

- **Curated Content**: Admin-published posts targeting specific categories (Admissions, Scholarships, Exams, News).
- **Post Types**: Support for text, images, and external links.
- **Dynamic Alerts**: Special deadline alert cards for time-sensitive admission or scholarship dates.
- **Engagement**: Like and Bookmark functionality to help students track relevant news.

## Post Categories

- **Admission Alerts**: Updates on opening/closing dates for universities.
- **Scholarships**: New funding opportunities for international students.
- **Exam Notifications**: Dates and tips for IELTS, TOEFL, SAT, GRE, etc.
- **Education News**: Policy changes, visa updates, and university rankings.

## Endpoints

| Method | Path | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/v1/feed` | Paginated list of published posts | Public |
| `GET` | `/api/v1/feed/:slug` | Get post detail | Public |
| `POST` | `/api/v1/feed/:slug/like` | Toggle like status | Authenticated |
| `POST` | `/api/v1/feed/:slug/bookmark` | Toggle bookmark status | Authenticated |

## Admin Capabilities

Admin users manage all feed content:
- Create, edit, and delete posts.
- Pin important announcements to the top of the feed.
- Schedule publish dates for time-sensitive news.
