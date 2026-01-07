# Refund Management System

A full-stack application for managing refund requests with receipt file uploads. This project consists of a React frontend and an AdonisJS backend API.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Development](#development)

## 🎯 Overview

This is a refund management system that allows users to:
- Create refund requests with categories (food, hosting, transport, services, other)
- Upload receipt files (PDF) as proof
- View, search, and paginate through refund requests
- Edit existing refund requests
- Delete refund requests (soft delete)
- Download receipt files

## ✨ Features

- **Refund Management**: Create, read, update, and delete refund requests
- **File Upload**: Upload and manage receipt files (PDF)
- **Search & Filter**: Search refunds by title
- **Pagination**: Navigate through refund lists with pagination
- **Soft Delete**: Refunds are soft-deleted, preserving data integrity
- **File Storage**: Receipt files are stored securely on the server
- **Responsive UI**: Modern, clean interface built with Tailwind CSS
- **Form Validation**: Client and server-side validation using Zod and VineJS
- **Type Safety**: Full TypeScript support across frontend and backend

## 🛠 Tech Stack

### Frontend (`refund/`)
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Sonner** - Toast notifications

### Backend (`refund-api-main/`)
- **AdonisJS 6** - Node.js web framework
- **TypeScript** - Type safety
- **SQLite** - Database (via Better SQLite3)
- **Lucid ORM** - Database ORM
- **VineJS** - Validation library
- **AdonisJS Drive** - File storage abstraction
- **Luxon** - Date/time handling

## 📁 Project Structure

```
refund/
├── refund/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base UI components (buttons, inputs, etc.)
│   │   │   ├── file-preview.tsx
│   │   │   ├── icon.tsx
│   │   │   └── input-single-file.tsx
│   │   ├── context/          # Feature-based context
│   │   │   ├── main/         # Home page components (list, filter, pagination)
│   │   │   └── solicitacao/  # Refund request components
│   │   │       ├── components/  # Forms, success dialogs
│   │   │       ├── hooks/       # Custom hooks for data fetching
│   │   │       └── models/      # TypeScript types and schemas
│   │   ├── core-components/  # Layout components (header, main layout)
│   │   ├── helpers/          # Utility functions (API client)
│   │   ├── pages/            # Page components
│   │   │   ├── page-home.tsx      # Home page (refund list)
│   │   │   └── page-solicitacoes.tsx  # Refund form page
│   │   ├── App.tsx           # Main app component with routing
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   └── package.json
│
└── refund-api-main/          # Backend API
    ├── app/
    │   ├── controllers/      # HTTP controllers
    │   │   ├── refunds_controller.ts
    │   │   ├── receipts_controller.ts
    │   │   └── receipt_downloads_controller.ts
    │   ├── models/           # Database models
    │   │   ├── refund.ts
    │   │   └── receipt.ts
    │   ├── services/         # Business logic
    │   │   ├── refunds_service.ts
    │   │   └── receipts_service.ts
    │   ├── validators/       # Request validators
    │   │   ├── refund_validator.ts
    │   │   ├── receipt_validator.ts
    │   │   └── receipt_downloads_validator.ts
    │   └── middleware/       # HTTP middleware
    ├── database/
    │   └── migrations/       # Database migrations
    ├── storage/
    │   └── uploads/          # Uploaded receipt files
    ├── start/
    │   └── routes.ts         # API routes
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (or npm/yarn)
- **SQLite** (comes with Better SQLite3)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd refund
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the `refund/` directory:
```env
VITE_API_URL=http://localhost:3333
```

4. Start the development server:
```bash
pnpm dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns).

### Backend Setup

1. Navigate to the backend directory:
```bash
cd refund-api-main
```

2. Install dependencies:
```bash
pnpm install
```

3. Run database migrations:
```bash
pnpm db:prepare
```

4. Start the development server:
```bash
pnpm dev
```

The API will be available at `http://localhost:3333`.

## 🔌 API Endpoints

### Refunds

- `GET /refunds` - List all refunds (supports pagination and search)
  - Query params: `page` (number), `q` (search term)
- `POST /refunds` - Create a new refund
  - Body: `{ title: string, category: string, value: number, receipt: string }`
- `GET /refunds/:id` - Get a specific refund
- `DELETE /refunds/:id` - Soft delete a refund

### Receipts

- `POST /receipts` - Upload a receipt file
  - Form data: `file` (File)
- `GET /receipts/:id` - Get receipt metadata
- `GET /receipts/download/:id` - Download receipt file
- `DELETE /receipts/:id` - Delete a receipt

## 🗄 Database Schema

### Refunds Table

| Column | Type | Description |
|--------|------|-------------|
| id | string (UUID) | Primary key |
| title | string | Refund title/description |
| category | enum | Category: 'food', 'hosting', 'transport', 'services', 'other' |
| value | integer | Value in cents (stored as integer, returned as decimal) |
| deleted_at | timestamp | Soft delete timestamp (nullable) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### Receipts Table

| Column | Type | Description |
|--------|------|-------------|
| id | string (UUID) | Primary key |
| original_filename | string | Original filename from upload |
| filename | string | Generated slugified filename |
| path | string | Storage path |
| extname | string | File extension |
| refund_id | string (UUID) | Foreign key to refunds (nullable) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

## 🔐 Environment Variables

### Frontend (`.env` in `refund/`)

```env
VITE_API_URL=http://localhost:3333
```

### Backend

The backend uses AdonisJS configuration files. Check `config/` directory for configuration options.

## 💻 Usage

### Creating a Refund Request

1. Navigate to the home page to see all refunds
2. Click to create a new refund or navigate to `/solicitacao`
3. Fill in the form:
   - **Name/Title**: Description of the refund
   - **Category**: Select from food, hosting, transport, services, or other
   - **Value**: Enter the refund amount
   - **File**: Upload a receipt PDF file
4. Submit the form

### Viewing Refunds

- The home page displays all refunds in a paginated list
- Use the search bar to filter refunds by title
- Click on pagination controls to navigate between pages

### Editing a Refund

1. Navigate to `/solicitacao/:id` where `:id` is the refund ID
2. The form will be pre-filled with existing data
3. Make your changes and submit

### Deleting a Refund

- Click the delete button on a refund item
- Confirm the deletion
- The refund will be soft-deleted (marked with `deleted_at` timestamp)

## 🧪 Development

### Frontend Development

```bash
cd refund
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Backend Development

```bash
cd refund-api-main
pnpm dev          # Start dev server with HMR
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run tests
pnpm lint         # Run ESLint
pnpm typecheck    # Type check without emitting
```

### Database Migrations

```bash
cd refund-api-main
pnpm db:prepare   # Run migrations
```

## 📝 Notes

- **File Storage**: Receipt files are stored in `refund-api-main/storage/uploads/`
- **Value Storage**: Monetary values are stored in cents (as integers) in the database but returned as decimals
- **Soft Deletes**: When a refund is deleted, the associated receipt file is also deleted from storage
- **File Upload Flow**: 
  1. Receipt is uploaded first via `POST /receipts`
  2. Receipt ID is then used when creating the refund via `POST /refunds`
  3. The receipt file is moved to the final storage location upon refund creation

## 🤝 Contributing

This is a portfolio project. Feel free to explore the codebase and learn from it!

## 📄 License

This project is private and unlicensed.

