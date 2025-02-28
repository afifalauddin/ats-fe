# ATS FE

<!--toc:start-->

ATS built with Next.js, TypeScript, and React.

- [ATS FE](#ats-fe)
  - [Architecture Overview](#architecture-overview)
    - [Tech Stack](#tech-stack)
    - [Authentication System](#authentication-system)
    - [Folder Structure](#folder-structure)
  - [Features](#features)
    - [Implemented](#implemented)
    - [Planned](#planned)
  - [Challenges and Solutions](#challenges-and-solutions)
    - [Authentication Flow](#authentication-flow)
    - [State Management](#state-management)
    - [API Integration](#api-integration)
    - [Routing and Navigation](#routing-and-navigation)
  - [Getting Started](#getting-started)
  <!--toc:end-->

## Architecture Overview

### Tech Stack

- **Next.js**: Server-side rendering, API routes, and app router
- **TypeScript**: Type safety across the codebase
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API communication
- **React Hook Form**: Form handling and validation

### Authentication System

The application uses a token-based authentication system with both access and refresh tokens:

- `useAuth` hook manages token storage and retrieval
- `useUser` hook provides authentication state and user profile management
- Axios interceptors automatically attach tokens to outgoing requests

### Folder Structure

- `/app`: Next.js app directory with route components
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks for business logic
- `/types`: TypeScript type definitions
- `/utils`: Utility functions

## Features

### Implemented

- **Authentication**

  - Login/logout functionality
  - Token management
  - Protected routes

- **Job Postings**

  - View list of job postings
  - View detailed job information
  - Create new job postings (recruiter role)

- **Applications**

  - Submit job applications
  - Track application status

- **Recruiter Dashboard**

  - Manage job postings
  - Review applications

- **Responsive UI**
  - Desktop and mobile navigation
  - Responsive layout across device sizes

### Planned

- **Advanced filtering** for job listings
- **Application tracking** for candidates
- **Analytics dashboard** for recruiters
- **Email notifications** for application updates
- **Resume parsing** and candidate scoring
- **Interview scheduling** integration

## Challenges and Solutions

### Authentication Flow

**Challenge**: Managing access tokens, refresh tokens, and redirects while maintaining a smooth user experience.

**Solution**: Implemented a custom hook (`useUser`) that handles token management, provides authentication state, and includes axios interceptors for automatic token inclusion in requests.

### State Management

**Challenge**: Sharing state between components without prop drilling or excessive boilerplate.

**Solution**: Created specialized hooks for different features (e.g., `useJobPosting`, `useApplication`, `useActiveJobList`) that encapsulate data fetching, state management, and business logic.

### API Integration

**Challenge**: Consistent error handling and data typing across multiple API endpoints.

**Solution**: Defined type interfaces for all API responses and used axios interceptors for global error handling. Created reusable patterns for API calls.

### Routing and Navigation

**Challenge**: Implementing proper navigation for both authenticated and unauthenticated users.

**Solution**: Utilized Next.js app router with layout-based authentication patterns, separate layouts for different user roles, and middleware for route protection.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env.example` to `.env.local`)
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser
