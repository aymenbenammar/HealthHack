# SmartDoc — German Approbation Document Checker

AI-powered document verification portal for international doctors applying for German medical licensing (Approbation).

Upload your documents, and the system automatically classifies them, checks for missing fields, compliance issues, expired dates, and name mismatches across your full submission set.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  React + TypeScript Frontend  (Vite, port 5173)         │
│  — Documents portal UI matching the Get2Germany design  │
└────────────────────┬────────────────────────────────────┘
                     │  /api/*  (proxied by Vite dev server)
┌────────────────────▼────────────────────────────────────┐
│  FastAPI Backend  (Uvicorn, port 8000)                  │
│                                                         │
│  Pass 1 — VLM (llama-4-scout)                          │
│    Reads document visually → extracts metadata,         │
│    formal_flags (signature, stamp, apostille, …)        │
│                                                         │
│  Pass 2 — Text LLM (llama-3.3-70b)                     │
│    Applies doc-class rules → fills issues,              │
│    rule_compliance, tips, bundesland_note               │
│                                                         │
│  Pass 3 — Cross-document check                         │
│    Scans all saved results → NAME_MISMATCH detection    │
└─────────────────────────────────────────────────────────┘
```

---

## Requirements

| Component | Version |
|-----------|---------|
| Python | 3.11+ |
| Node.js | 18+ |
| Groq API key | [console.groq.com/keys](https://console.groq.com/keys) |

---

## Backend Setup

### 1. Clone and enter the project

```bash
git clone <repo-url>
cd HealthHack
```

### 2. Create a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate      # macOS / Linux
.venv\Scripts\activate         # Windows
```

### 3. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key |
| `GROQ_DEFAULT_VISION_MODEL` | No | Defaults to `meta-llama/llama-4-scout-17b-16e-instruct` |
| `GROQ_DEFAULT_TEXT_MODEL` | No | Defaults to `llama-3.3-70b-versatile` |
| `ALLOWED_ORIGINS` | No | CORS origins — defaults to `localhost:3000` and `:5173` |
| `OUTPUT_DIR` | No | Folder where extraction JSONs are saved — defaults to `resources` |

### 5. Start the backend

```bash
uvicorn app.main:app --reload
```

Backend available at `http://localhost:8000`.
Interactive docs at `http://localhost:8000/docs`.

---

## Frontend Setup

### 1. Install Node dependencies

```bash
cd frontend
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Frontend available at `http://localhost:5173`.

> The Vite dev server automatically proxies all `/api/*` requests to `http://localhost:8000`, so no additional configuration is needed.

### Build for production

```bash
npm run build       # outputs to frontend/dist/
npm run preview     # preview the production build locally
```

---

## Running Both Together

Open two terminals from the project root:

```bash
# Terminal 1 — backend
.venv\Scripts\activate
uvicorn app.main:app --reload

# Terminal 2 — frontend
cd frontend
npm run dev
```

Then open `http://localhost:5173`.

---

## How It Works

### Document analysis pipeline

When you click **Check with AI** on the detail page, the frontend sends the file to:

```
POST /api/v1/llm/document/analyze
Content-Type: multipart/form-data
  file: <your document>
```

The backend runs three passes and returns a single merged JSON:

```json
{
  "doc_class": "BIRTH_CERT",
  "confidence": 0.94,
  "metadata": {
    "full_name": "Layla Hassan",
    "date_of_birth": "1990-05-14",
    "issue_date": "2023-11-01",
    "country_of_issue": "SY",
    "language": "ar"
  },
  "formal_flags": {
    "has_signature": "n/a",
    "has_apostille": false,
    "is_original": true,
    "is_certified_copy": false,
    "has_official_stamp": true,
    "age_days": 531,
    "is_valid_not_expired": true
  },
  "issues": [
    {
      "code": "MISSING_APOSTILLE",
      "severity": "critical",
      "message": "Apostille fehlt. Für Dokumente aus Nicht-EU-Ländern ist eine Apostille erforderlich.",
      "field": "formal_flags.has_apostille"
    },
    {
      "code": "MISSING_TRANSLATION",
      "severity": "critical",
      "message": "Das Dokument ist nicht auf Deutsch. Eine beglaubigte Übersetzung muss beigefügt werden.",
      "field": "metadata.language"
    }
  ],
  "rule_compliance": [
    { "rule": "MISSING_DATE",    "status": "pass", "evidence": "issue_date is present" },
    { "rule": "NOT_CERTIFIED",   "status": "pass", "evidence": "is_original is true" },
    { "rule": "MISSING_APOSTILLE","status": "fail", "evidence": "has_apostille is false; non-EU document" }
  ],
  "tips": [
    "Lassen Sie die Apostille beim zuständigen Außenministerium Ihres Heimatlandes anbringen.",
    "Beauftragen Sie einen öffentlich bestellten Übersetzer für eine beglaubigte deutsche Übersetzung."
  ],
  "bundesland_note": null,
  "cross_doc_issues": []
}
```

### Issue code catalog

| Code | Meaning |
|------|---------|
| `MISSING_SIGNATURE` | Required signature not found |
| `MISSING_DATE` | Document must be dated |
| `MISSING_APOSTILLE` | Hague apostille required but absent |
| `MISSING_STAMP` | Official stamp expected but absent |
| `NOT_CERTIFIED` | Copy lacks Beglaubigungsvermerk |
| `EXPIRED_MAX_AGE` | Document older than allowed (90 d or 2 yr) |
| `DOC_EXPIRED` | Document past its own expiry date |
| `INCOMPLETE_FIELDS` | Mandatory fields blank |
| `NAME_MISMATCH` | Name differs across submitted documents |
| `DATE_INCONSISTENT` | Dates contradict within the document |
| `UNREADABLE_SCAN` | Image quality too low for reliable analysis |
| `WRONG_DOC_CLASS` | Wrong document type uploaded for this slot |
| `MISSING_TRANSLATION` | German translation required but absent |
| `TRANSLATION_NOT_SWORN` | Translator not officially certified |
| `WRONG_LEVEL` | Language certificate below B2 or wrong provider |
| `ORIGINAL_REQUIRED` | Copy submitted where original required |
| `APPLIED_TO_WRONG_AUTHORITY` | Authority on document ≠ zuständige Stelle |
| `WRONG_BELEGART_FZ` | Führungszeugnis is not Belegart 0 |
| `CHRONOLOGICAL_GAP` | CV has unexplained gap > 1 month |

---

## Project Structure

```
HealthHack/
├── app/                              # FastAPI backend
│   ├── main.py                       # App factory, CORS, health check
│   ├── core/
│   │   └── config.py                 # Settings via pydantic-settings
│   ├── api/v1/
│   │   ├── router.py                 # Mounts all sub-routers
│   │   └── endpoints/
│   │       └── llm.py                # POST /api/v1/llm/document/analyze
│   ├── schemas/
│   │   ├── extraction.py             # DocumentExtraction schema
│   │   └── issues.py                 # IssueCode enum, Issue, CheckSetResult
│   └── services/
│       ├── llm_client.py             # GroqLLMClient — 3-pass pipeline
│       └── utils.py                  # PDF → images utility
│
├── frontend/                         # React + TypeScript frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── analyzeDocument.ts    # POST /api/v1/llm/document/analyze
│   │   ├── components/
│   │   │   ├── Header.tsx            # Top bar with search and user controls
│   │   │   ├── Sidebar.tsx           # Fixed sidebar with navigation
│   │   │   └── AIResultPanel.tsx     # Renders full AI analysis result
│   │   ├── data/
│   │   │   └── documents.ts          # All 18 document definitions (A–E)
│   │   ├── pages/
│   │   │   ├── DocumentsPage.tsx     # Overview — categories + document table
│   │   │   └── DocumentDetailPage.tsx# Detail — upload + AI check
│   │   ├── types/
│   │   │   └── index.ts              # AppDocument, AIAnalysisResult, …
│   │   ├── App.tsx                   # Router setup
│   │   └── App.css                   # Global styles and CSS variables
│   ├── index.html
│   ├── vite.config.ts                # Dev proxy /api → localhost:8000
│   └── package.json
│
├── resources/                        # Auto-created — stores page images and result JSONs
├── requirements.txt
└── .env.example
```
