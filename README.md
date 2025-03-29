# GeoHog: Earth's Knowledge, Unearthed

![GeoHog](https://github.com/szilarddenes/geohog/assets/57998732/logo.png)

## Project Overview

GeoHog is a dual-purpose platform for geoscientists combining:

1. **Newsletter System**: A TLDR-style digest that provides concise, curated summaries of the latest research, industry news, and developments in earth sciences.
2. **AI Research Assistant**: A subscription-based AI tool for deep geological research, report creation, data transformation, and visualization.

## Architecture & Technical Specifications

### Technology Stack

- **Frontend**: React with Next.js (Static Site Generation where possible)
- **Backend**: Firebase (Firestore, Cloud Functions, Authentication, Hosting)
- **AI Provider**: OpenRouter API initially, with planned migration to custom models
- **Email Delivery**: SendGrid (starting with free tier)
- **Testing**: Jest for unit tests, Cypress for E2E testing
- **CI/CD**: GitHub Actions with Firebase deployment
- **Monitoring**: Firebase Performance Monitoring

### Project Structure Guidelines

- Maximum 3 levels of nesting in directory structure
- Reusable components in `src/components`
- Utility functions in `src/utils`
- API routes in `src/pages/api` (Next.js API routes)
- Admin interface in `src/pages/admin`

## Newsletter System Specifications

### Content Collection Sources

#### Hydrocarbon & Energy Focus
- Oil & gas journals (AAPG, Oil and Gas Journal, Rigzone)
- Energy intelligence platforms (SPGlobal, EnergyIntel)
- Natural gas resources (NaturalGasIntel)

#### Mining Resources
- Mining.com, Mining Journal, MiningWeekly
- Resource World, Engineering & Mining Journal

#### Geopolitical & Regional Sources
- Stratfor, Geopolitical Futures
- Resource Governance Institute
- Regional sources from Americas, Europe, Russia, Asia, Middle East

#### Academic & Research
- Nature Earth, Science, AGU
- USGS, NOAA, NASA Earth sciences
- Society of Petroleum Engineers, Society of Exploration Geophysicists

### Content Processing Rules

- Summarization limited to 100 words maximum
- Technical accuracy and attribution preserved
- Focus on research findings, methodology, applications, and conclusions

### Content Categorization

- Maximum 3 categories per content item
- Geographic tagging
- Content type classification (academic, industry, government, educational)

### Newsletter Assembly

- High-impact research prioritized at the top
- Industry developments in the middle
- Events and conferences at the bottom
- 10 items per digest with at least 1 item per category
- Maximum 2 industry items
- Mandatory "upcoming events" section

### Newsletter Format

- Each item includes: headline, summary paragraph, source link
- Maximum 1 image per digest (prefer satellite imagery or data visualizations)
- Earth-tone color scheme
- Standard footer with unsubscribe option

### Subscription Options

- Email field only required
- Optional fields: specialization, professional role, geographic region
- Default delivery: Weekly on Wednesdays at 09:00 UTC
- Category filtering available
- HTML and plain text format options
- Weekly and daily frequency options

### Monetization Strategy

- 1 sponsored content item per digest (middle placement)
- Clear labeling of sponsored content
- Maximum 3 job listings per digest (placed after main content)
- Affiliate links only when relevant to category
- Disclosure for all affiliate content

## AI Research Assistant Specifications

### Key Functions

1. **Deep Research Reports**: Generate comprehensive analysis with proper academic citations
2. **Data Visualization**: Create plots, charts, and cross-sections from geological data
3. **Coordinate Transformation**: Convert between different coordinate systems and projections
4. **Vector Graphics**: Generate technical diagrams and geological illustrations
5. **Large Dataset Processing**: Handle and analyze massive geological datasets

### Technical Requirements

- **API Integration**: OpenRouter initially, with potential for custom fine-tuned models
- **Vector Database**: For geological information retrieval and citation
- **Data Processing Pipeline**: For handling large datasets efficiently
- **Authentication System**: For subscription management and API rate limiting
- **Output Formats**: PDF, SVG, CSV, and specialized geoscience formats

## Implementation Phases

### Phase 1: MVP Launch (1-3 months)
- Weekly newsletter with manually curated, AI-summarized content
- Basic website with subscription form
- 5-10 high-quality geoscience sources
- Minimal infrastructure costs ($6-11/month)

### Phase 2: Growth Phase (3-6 months)
- Increased source coverage and content volume
- First monetization through affiliates and sponsored content
- Improved AI processing for better summaries
- Semi-weekly delivery option
- Alpha version of AI research assistant for internal testing

### Phase 3: Full Implementation (6-12 months)
- Daily newsletter option (premium)
- Complete automation of content pipeline
- Multiple monetization channels
- Community features
- Public beta of AI research assistant
- Subscription tiers for different access levels

## Development Guidelines

### Code Standards
- Comprehensive test coverage (unit and E2E)
- Clean, documented code with TypeScript
- Atomic git commits with meaningful messages
- Code reviews for all pull requests
- Performance optimization for all user-facing features

### Admin Interface
- Content management dashboard
- Subscriber analytics
- Newsletter preview and scheduling
- Monetization tracking
- AI assistant usage metrics

### Testing Strategy
- Unit tests for all business logic
- Integration tests for Firebase interactions
- E2E tests for critical user journeys
- Performance testing for AI operations
- Security testing for authentication and data access

## Important Notes

- This project fills a market gap with no equivalent to TLDR.tech in the geoscience community
- Focus on quality of content and accuracy of AI outputs
- Balance between automation and expert curation
- Testing is a priority to ensure reliable operation
- Black and white design with elegant, futuristic, and serious aesthetic

