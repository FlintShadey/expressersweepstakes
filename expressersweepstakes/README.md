# Express ER Sweepstakes

A Progressive Web App (PWA) built with Vue.js, Vite, and Vuetify for entering the Express ER Sweepstakes contest.

## Features

- 📱 Mobile-first design optimized for iPhone usage
- 🌙 Dark mode theme
- ⚡ Progressive Web App (PWA) capabilities
- 📝 Simple form with validation for contest entries
- 🗄️ Supabase database integration
- 🚀 GitHub Pages deployment ready

## Technology Stack

- **Frontend**: Vue.js 3 with TypeScript
- **UI Framework**: Vuetify 3 (Material Design)
- **Build Tool**: Vite
- **Database**: Supabase
- **Deployment**: GitHub Pages
- **PWA**: Manifest and service worker ready

## Database Schema

The application expects a Supabase table named `sweepstakes_entries` with the following structure:

```sql
CREATE TABLE sweepstakes_entries (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Configuration

The app is configured to use the following Supabase instance:
- Project URL: `https://ceyopueguqklwwdjkvcf.supabase.co`
- API Key: Included in the source code

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment

The project is configured for automatic deployment to GitHub Pages using GitHub Actions. The workflow will:

1. Build the project
2. Deploy to GitHub Pages at: `https://flintshadey.github.io/expressersweepstakes/`

## Form Features

- **First Name**: Required field with minimum 2 characters
- **Last Name**: Required field with minimum 2 characters  
- **Phone Number**: Required field with automatic formatting to (XXX) XXX-XXXX
- **Validation**: Real-time form validation
- **Success/Error Handling**: User feedback for submission results

## PWA Features

- Installable on mobile devices
- Offline-ready manifest
- Optimized for mobile viewport
- Material Design Icons included

## Mobile Optimization

- Responsive design for iPhone usage
- Touch-friendly interface
- Proper viewport configuration
- Dark theme for better mobile experience
