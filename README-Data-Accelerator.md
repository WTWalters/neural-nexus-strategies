# AI Data Accelerator Framework

The AI Data Accelerator is a comprehensive framework for assessing and improving an organization's readiness for AI implementation. This document provides instructions for setting up and running the AI Data Accelerator components.

## Setup Instructions

### 1. Database Setup

Run the following commands to initialize the database:

```bash
# Navigate to the project root
cd /Users/whitneywalters/AIProgramming/NNS_Home

# Make the setup script executable
chmod +x setup_data_accelerator.sh

# Run the setup script
./setup_data_accelerator.sh
```

This will:
- Create migrations for the data_accelerator app
- Apply the migrations to the database
- Seed initial data (dimensions, levels, questions, recommendations)

### 2. Running the Application

Start both the backend and frontend servers:

```bash
# Start the backend
cd neural-nexus-backend
source .venv/bin/activate  # or source venv/bin/activate
python manage.py runserver

# In a new terminal, start the frontend
cd neural_nexus_frontend
npm run dev
```

## Framework Components

### Backend

The backend implementation includes:

1. **Models**
   - `AcceleratorDimension` - The 7 dimensions of the framework (Data Trust Engine, Data Rulebook, etc.)
   - `AcceleratorMaturityLevel` - Baseline, Intermediate, Advanced maturity levels
   - `AssessmentQuestion` - Questions for each dimension
   - `Assessment` - User assessment instances
   - `AssessmentAnswer` - User answers to questions
   - `Recommendation` - Default recommendations for each dimension and maturity level
   - `AssessmentRecommendation` - Specific recommendations for assessment results
   - `DataUpload` - For tracking progress with data uploads

2. **API Endpoints**
   - `/api/data-accelerator/dimensions/` - Framework dimensions
   - `/api/data-accelerator/maturity-levels/` - Maturity levels
   - `/api/data-accelerator/questions/` - Assessment questions
   - `/api/data-accelerator/assessments/` - User assessments
   - `/api/data-accelerator/data-uploads/` - Data uploads

### Frontend

The frontend implementation includes:

1. **Assessment Wizard Component**
   - Located at: `/components/assessment/AssessmentWizard.tsx`
   - Multi-step assessment form
   - API integration for loading questions and submitting answers
   - User information collection for lead generation

2. **Results Dashboard Component**
   - Located at: `/components/assessment/ResultsDashboard.tsx`
   - Radar chart visualization
   - Dimension scores
   - Recommendations display
   - CTA for services

3. **Routes**
   - `/assessment/quick` - Quick diagnostic assessment
   - `/assessment/results/[id]` - Assessment results
   - `/services/accelerator` - AI Data Accelerator service page

## Key Features

1. **7-Dimension Framework**
   - Data Trust Engine
   - Data Rulebook
   - AI Power Grid
   - Data Flow Superhighway
   - AI Fuel Factory
   - AI Mindset Shift
   - AI Deployment Machine

2. **Maturity Levels**
   - Baseline (1.0-2.5)
   - Intermediate (2.5-4.0)
   - Advanced (4.0-5.0)

3. **Assessment Types**
   - Quick Diagnostic (5-minute assessment)
   - Comprehensive Assessment
   - Strategic Roadmap

4. **Personalized Recommendations**
   - Prioritized by impact and effort
   - Specific to dimension and maturity level
   - Actionable next steps
