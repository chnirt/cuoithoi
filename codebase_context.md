# Codebase Context & Reference

## Core Project Structure

The project follows a standard Next.js App Router structure with separate directories for logic, components, and types.

*   **`app/`**: Contains the main application routes and layouts.
    *   `[slug]/`: Dynamic route for public wedding pages (e.g., `/wedding-slug`).
    *   `editor/`: The authenticated editor interface for users to customize their wedding page.
    *   `sign-in/`: Authentication pages handled by Clerk.
    *   `layout.tsx`: The root layout definition.
*   **`components/`**: Reusable UI components.
    *   Includes complex feature components like `EditorForm`, `PreviewPanel`, and `WeddingPageView`.
    *   Likely contains Shadcn UI components (based on `package.json` scripts).
*   **`lib/`**: Backend and utility logic.
    *   `firestore/`: Contains Firebase Firestore data access functions (e.g., `weddings.ts`).
    *   `firebase.ts`: Firebase app initialization.
*   **`types/`**: TypeScript type definitions.
    *   `wedding.ts`: Defines the core data models for the application.
*   **`utils/`**: Helper functions (e.g., for slug generation).

## Languages & Frameworks

*   **Language**: TypeScript (v5)
*   **Framework**: Next.js (v16.0.0) - App Router
*   **UI Library**: React (v19.2.0)
*   **Styling**: Tailwind CSS (v4)
*   **Authentication**: Clerk (`@clerk/nextjs`)
*   **Database**: Firebase Firestore (v12.5.0)
*   **Form Handling**: React Hook Form + Zod
*   **UI Components**: Radix UI, Lucide React, Framer Motion, Sonner, Embla Carousel

## Core Data Flow

The application revolves around creating and viewing personalized wedding pages.

1.  **Authentication**: Users sign in via Clerk. Their unique User ID is used to associate data in Firestore.
2.  **Data Storage**: Data is stored in Firebase Firestore in the `weddings` collection. The document ID matches the Clerk User ID.
3.  **Editing (Write)**:
    *   The `app/editor/page.tsx` page fetches existing data using `fetchWeddingByUserId(userId)`.
    *   Users modify the form (managed by `react-hook-form`).
    *   On save, data is written to Firestore using `saveWedding`. A unique `slug` is generated if one doesn't exist.
4.  **Viewing (Read)**:
    *   Public visitors access `/[slug]`.
    *   The `app/[slug]/page.tsx` component extracts the slug from the URL.
    *   It calls `getWedding(slug)` to retrieve the wedding data.
    *   If found, the data is passed to `WeddingPageView` for rendering.

## Key Module Summary

### 1. `lib/firestore/weddings.ts`
**Purpose**: The Data Access Layer (DAL) for the application.
**Key Functions**:
*   `saveWedding(data)`: Saves wedding data to Firestore. Handles slug generation based on couple names if not present.
*   `fetchWeddingByUserId(userId)`: Retrieves the wedding data for the currently logged-in user.
*   `getWedding(slug)`: Retrieves wedding data by its public slug. Resolves the User ID from the slug (via helper) or query.

### 2. `types/wedding.ts`
**Purpose**: Defines the domain model.
**Key Interfaces**:
*   `WeddingPageProps`: The main data object containing `couple`, `event`, and `gallery`.
*   `Couple`: Information about the bride and groom.
*   `EventInfo`: Details about the wedding event (time, venue, map).
*   `GalleryImage`: Structure for images in the gallery.

### 3. `app/editor/page.tsx`
**Purpose**: The main control center for users.
**Functionality**:
*   Protects the route using Clerk's `useUser`.
*   Manages the "Editor" vs "Preview" tab state.
*   Orchestrates data fetching on load and handles the form submission flow.

### 4. `app/[slug]/page.tsx`
**Purpose**: The public landing page for a wedding.
**Functionality**:
*   Handles dynamic routing based on the slug.
*   Implements a loading state with a minimum delay (`MIN_LOADING_TIME`) for a smoother UX.
*   Renders the `WeddingPageView` or a `NotFoundPage` if data is missing.
