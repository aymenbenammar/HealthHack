# HealthHack API

FastAPI backend with a Groq-powered LLM client that supports text, images, and PDFs.

---

## Requirements

- Python 3.11+
- A [Groq API key](https://console.groq.com/keys)

---

## Setup

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

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values:

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key |
| `SECRET_KEY` | Yes | Secret used for token signing — change in production |
| `DATABASE_URL` | No | Defaults to a local SQLite file |
| `ALLOWED_ORIGINS` | No | CORS origins, defaults to localhost:3000 and :5173 |
| `GROQ_DEFAULT_TEXT_MODEL` | No | Defaults to `llama-3.3-70b-versatile` |
| `GROQ_DEFAULT_VISION_MODEL` | No | Defaults to `meta-llama/llama-4-scout-17b-16e-instruct` |

### 5. Run the server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

---

## Interactive Docs

| URL | Description |
|-----|-------------|
| `http://localhost:8000/docs` | Swagger UI |
| `http://localhost:8000/redoc` | ReDoc |
| `http://localhost:8000/health` | Health check |

---

## Project Structure

```
HealthHack/
├── app/
│   ├── main.py                          # App factory, CORS, health check
│   ├── core/
│   │   └── config.py                    # All settings via pydantic-settings
│   ├── api/
│   │   └── v1/
│   │       ├── router.py                # Mounts all sub-routers under /api/v1
│   │       └── endpoints/
│   │           ├── users.py             # CRUD /api/v1/users
│   │           ├── health_records.py    # CRUD /api/v1/health-records
│   │           └── llm.py              # LLM chat /api/v1/llm
│   ├── schemas/
│   │   ├── user.py
│   │   ├── health_record.py
│   │   └── llm.py
│   └── services/
│       └── llm_client.py               # GroqLLMClient (text + images + PDFs)
├── requirements.txt
├── .env.example
└── .gitignore
```

---

## API Endpoints

### Health

```
GET /health
```

### Users

```
GET    /api/v1/users/          List all users
POST   /api/v1/users/          Create a user
GET    /api/v1/users/{id}      Get a user
PATCH  /api/v1/users/{id}      Update a user
DELETE /api/v1/users/{id}      Delete a user
```

### Health Records

```
GET    /api/v1/health-records/          List records (optional ?user_id= filter)
POST   /api/v1/health-records/          Create a record
GET    /api/v1/health-records/{id}      Get a record
PATCH  /api/v1/health-records/{id}      Update a record
DELETE /api/v1/health-records/{id}      Delete a record
```

### LLM Chat

#### JSON (text only)

```
POST /api/v1/llm/chat
Content-Type: application/json

{
  "prompt": "What is the best diet for heart health?",
  "system_prompt": "You are a medical assistant.",
  "history": [],
  "model": "llama-3.3-70b-versatile"   // optional override
}
```

#### Multipart (with images and/or PDFs)

```
POST /api/v1/llm/chat/multipart
Content-Type: multipart/form-data

Fields:
  prompt         (required)  The user's message
  system_prompt  (optional)  System instruction
  model          (optional)  Model override
  images         (optional)  Image files — JPEG, PNG, WEBP, GIF
  pdfs           (optional)  PDF files
```

Example with curl:

```bash
# PDF summary
curl -X POST http://localhost:8000/api/v1/llm/chat/multipart \
  -F "prompt=Summarise this report" \
  -F "pdfs=@report.pdf"

# Image analysis
curl -X POST http://localhost:8000/api/v1/llm/chat/multipart \
  -F "prompt=What does this chart show?" \
  -F "images=@chart.png"

# PDF + image together
curl -X POST http://localhost:8000/api/v1/llm/chat/multipart \
  -F "prompt=Compare the chart with the report findings" \
  -F "pdfs=@report.pdf" \
  -F "images=@chart.png"
```

**Response (all endpoints):**

```json
{
  "content": "...",
  "model": "meta-llama/llama-4-scout-17b-16e-instruct",
  "prompt_tokens": 120,
  "completion_tokens": 85,
  "total_tokens": 205
}
```

#### How PDFs are processed

1. **Text extraction** — `pypdf` pulls all selectable text from every page.
2. **Page rendering** — `pymupdf` renders every page to a PNG image (150 DPI).  
   Both the text and the page images are sent to the vision model, so scanned / image-heavy PDFs are fully understood.

#### Model selection

| Input | Default model used |
|-------|--------------------|
| Text only | `llama-3.3-70b-versatile` |
| Images or PDFs present | `meta-llama/llama-4-scout-17b-16e-instruct` |
| `model` field provided | Whatever you specify |
