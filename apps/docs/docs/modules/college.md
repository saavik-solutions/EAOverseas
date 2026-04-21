# College Feed Module

The College Feed module is the discovery engine for universities and courses.

## Features

- **University Discovery**: Search and filter universities by country, ranking, and type.
- **Course Discovery**: Search courses by degree type, field, and budget.
- **Caching**: Aggressive Redis caching for university listings to ensure fast load times.
- **Save/Bookmark**: Students can save colleges to their watchlist.

## Search & Filters

Students can filter universities based on:
- **Location**: Country-based filtering.
- **Degree Type**: Bachelors, Masters, PhD.
- **Field of Study**: Computer Science, MBA, etc.
- **Rankings**: QS and THE ranking ranges.
- **Budget**: Maximum annual tuition fee.

## Endpoints

| Method | Path | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/v1/colleges` | Search universities with filters | Public |
| `GET` | `/api/v1/colleges/:slug` | Get college detail and courses | Public |
| `GET` | `/api/v1/colleges/saved` | Get user's saved colleges | Authenticated |
| `POST` | `/api/v1/colleges/:slug/save` | Toggle save status | Authenticated |

## Admin Capabilities

Admin users can manage the university database:
- Create and edit university profiles.
- Manage course listings and requirements.
- Update fees and intake dates.
