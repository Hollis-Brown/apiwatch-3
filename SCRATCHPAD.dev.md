🧭 Always follow this document as the single source of truth.
Do not invent features, tools, or folders not listed here unless asked.

/**
 * 🎯 GOAL: Refactor existing APIWatch app into API Schema Validation Tool (ASVT)
 * 🧠 BACKEND: Supabase instead of Prisma
 * 📦 STARTING STRUCTURE: see `src/` tree at end of this scratchpad
 */

 🧭 This Scratchpad replaces the old README.
Ignore any references to previous features or systems unless they are specifically mentioned here.

⚠️ Important: Do not modify or remove the existing registration and login logic. It already works with Supabase and took 4 days to build. Keep it intact.

🔁 “Finish step 1. Let me confirm before you continue.”

🔒 “Don’t move on to the next feature until I give the go-ahead.”

⛔ “Stop if any errors occur, and ask for correction.”

//////////////////////////
// ✅ MVP Feature List //
//////////////////////////

// Auth (already implemented using NextAuth + Supabase)
// Dashboard to list user's API definitions
// Monaco-based API Schema Editor per API
// Validate JSON/YAML schemas (OpenAPI 3.0/3.1)
// Display real-time validation output
// Threaded comments on schema lines (collaborative)
// Billing via Stripe (already partially integrated)
// Optional: API Key Management and Usage Analytics (post-MVP)

//////////////////////////
// ✅ Core Features (Start Here) //
//////////////////////////

// 1. Schema Editor
// - Use Monaco Editor (JSON mode, OpenAPI syntax highlighting if possible)
// - Each `/apis/[id]/edit` page loads schema from Supabase
// - Debounced auto-save to Supabase

// 2. Schema Validation
// - On edit or save, validate schema using `openapi-schema-validator` or `@apidevtools/swagger-parser`
// - Return structured errors with line/column data to display in sidebar/toasts

// 3. Comments System
// - Real-time collaborative comments using Supabase real-time listeners or Liveblocks
// - Attach comment to schema line or block
// - Fields: `comment_id`, `api_id`, `author_id`, `line_number`, `text`, `timestamp`, `resolved`
// - Display next to Monaco Editor with threaded replies and resolve actions

// 4. Validation Results Panel
// - Sticky sidebar or bottom panel
// - Shows grouped validation messages (Errors, Warnings, Info)
// - Clicking message scrolls to that line in editor

// 5. Billing (already partially done)
// - Stripe routes already exist — verify `/api/billing/create-checkout` and `/api/billing/create-portal`
// - Add tier logic (Free = 1 API, Pro = unlimited APIs, Team = comments + CI integration)

// 6. Optional: API Key Management (Post-MVP)
// - Generate, revoke, and list API keys (per project)
// - Store keys securely in Supabase
// - Display usage logs

// 7. Optional: CI/Webhook integration (Post-MVP)
// - Allow validation via GitHub/GitLab CI with CLI or webhook
// - On push, run schema validation and comment result into PR

//////////////////////////
// ✅ Tech Stack Recap //
//////////////////////////

// - Next.js (app router)
// - Supabase (auth, DB, real-time, storage)
// - Monaco Editor
// - Tailwind + shadcn/ui
// - Stripe (billing)
// - TypeScript

//////////////////////////
// ✅ Suggested Directory Changes //
//////////////////////////

// Rename: `/app/apis/[id]/edit/page.tsx` → Schema Editor screen
// Ensure: `/components/apis/` has <MonacoEditor />, <ValidationPanel />, <CommentThread />
// Create: `/lib/schema-validation.ts` → export validateOpenAPISchema(json: string): ValidationResult[]
// Create: `/lib/comments.ts` → fetchComments(apiId), addComment(apiId, userId, lineNumber, text)

// In Supabase DB:
// - `apis` table: id, user_id, name, schema (jsonb), created_at, updated_at
// - `comments` table: id, api_id, user_id, line_number, text, created_at, resolved

//////////////////////////
// 🔍 Folder Snapshot (existing) //
//////////////////////////

/**
📦src
 ┣ 📂app
 ┃ ┣ 📂apis
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx  ← main editor screen
 ┣ 📂components
 ┃ ┣ 📂apis
 ┃ ┃ ┗ 📜APIForm.tsx
 ┃ ┣ 📜APIDetailModal.tsx
 ┃ ┣ 📜APIHealthScore.tsx
 ┃ ┣ 📜RealTimeUpdates.tsx
 ┣ 📂lib
 ┃ ┣ 📜supabase.ts
 ┃ ┣ 📜metrics.ts
 ┃ ┣ 📜queue.ts
 ┃ ┗ 📜storage.ts
*/

//////////////////////////
// 🛠️ Tasks for Cursor //
//////////////////////////

// [x] Setup Monaco editor on `/apis/[id]/edit/page.tsx`
// [x] Load schema from Supabase → display in Monaco
// [x] Validate schema on edit/save → display errors
// [x] Build Comments panel linked to schema lines
// [x] Save + retrieve comments from Supabase
// [x] Add validation status panel (errors, warnings)
// [ ] (Optional post-MVP): Add API Key panel per API
// [ ] (Optional post-MVP): Add CI/GitHub webhook page

//////////////////////////
// ✅ Commands Cursor Can Use //
//////////////////////////

// `npx shadcn-ui@latest add dialog button textarea`
// `npm i @monaco-editor/react`
// `npm i @apidevtools/swagger-parser`
// `npm i openapi-schema-validator`
// Use `createClient()` from `/lib/supabase.ts`
// Supabase tables: `apis`, `comments`, `users`

