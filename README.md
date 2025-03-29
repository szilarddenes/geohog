# GeoHog: Earth's Knowledge, Unearthed

![GeoHog](https://github.com/szilarddenes/geohog/assets/57998732/logo.png)

## Project Overview

GeoHog is a dual-purpose platform for geoscientists combining:

1. **Newsletter System**: A TLDR-style digest that provides concise, curated summaries of the latest research, industry news, and developments in earth sciences.
2. **AI Research Assistant**: A subscription-based AI tool for deep geological research, report creation, data transformation, and visualization.

## Simplified Setup Guide

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Firebase account

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/szilarddenes/geohog.git
cd geohog
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Firebase**

- Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Authentication, Firestore, and Storage
- Create a `.env.local` file based on `.env.example`
- Add your Firebase credentials to `.env.local`

4. **Start development server**

```bash
npm run dev
```

5. **Run Firebase emulators (optional, for local development)**

```bash
npm run firebase:emulate
```

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── context/      # React context providers
│   ├── lib/          # Utility functions and Firebase config
│   ├── pages/        # Next.js pages and API routes
│   └── styles/       # Global styles
└── scripts/         # Deployment and utility scripts
```

## Key Features

### Newsletter System

- Content curation from various geoscience sources
- AI-powered summarization
- Categorized content by subject area
- Email delivery with tracking
- Custom subscription preferences

### Admin Dashboard

- Subscriber management
- Content management
- Newsletter creation and scheduling
- Performance metrics

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run export       # Export static site
npm run test         # Run tests
```

## Deployment

The project is configured for Firebase Hosting deployment via GitHub Actions:

1. Set up GitHub repository secrets:
   - `FIREBASE_SERVICE_ACCOUNT_GEOHOG`

2. Deploy by pushing to the master branch or using the deploy script:

```bash
./git-deploy.sh
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

All rights reserved.
