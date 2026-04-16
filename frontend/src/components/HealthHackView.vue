<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)
const uploadStatus = ref('')
const aiResponse   = ref(null)
const busy         = ref(false)

function onFileChange(e){
  selectedFile.value = e.target.files[0] || null
  uploadStatus.value = ''
  aiResponse.value   = null
}

async function uploadFile(){
  if(!selectedFile.value) return
  busy.value = true
  uploadStatus.value = 'Lade hoch …'
  try{
    const fd = new FormData()
    fd.append('file', selectedFile.value)
    const r = await fetch('/api/v1/upload', { method:'POST', body:fd })
    if(!r.ok) throw new Error('Upload fehlgeschlagen')
    uploadStatus.value = 'Upload erfolgreich ✓'
  }catch(err){
    uploadStatus.value = 'Fehler: '+err.message
  }finally{ busy.value = false }
}

async function checkWithAI(){
  busy.value = true
  aiResponse.value = null
  try{
    const r = await fetch('/api/v1/llm', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({prompt:'Bitte prüfe das hochgeladene PDF'})
    })
    if(!r.ok) throw new Error('AI-Call fehlgeschlagen')
    aiResponse.value = await r.json()
  }catch(err){
    aiResponse.value = { error: err.message }
  }finally{ busy.value = false }
}
</script>

<template>
  <div class="wrapper">
    <div class="card">

      <!-- Logo / Titel --------------------------------------------------- -->
      <p class="logo">
        <span class="get2">get2</span><span class="germany">Germany</span>
      </p>
      <h2 style="text-align:center;margin-top:-.5rem;color:var(--col-muted)">
        HealthHack Demo
      </h2>

      <!-- Deine Infotexte ------------------------------------------------- -->
      <section style="margin-top:2rem">
        <h2>Wie PDFs verarbeitet werden</h2>
        <ul>
          <li><strong>pypdf</strong> extrahiert allen Text</li>
          <li><strong>pymupdf</strong> rendert jede Seite als PNG (150 DPI)</li>
          <li>Beides geht an das Vision-Modell – Scans werden erkannt</li>
        </ul>

        <h2 style="margin-top:2rem">Model-Auswahl</h2>
        <table>
          <tr><th>Input</th><th>Verwendetes Modell</th></tr>
          <tr><td>Nur Text</td><td>llama-3.3-70b-versatile</td></tr>
          <tr><td>Bilder / PDF</td><td>meta-llama/llama-4-scout-17b-16e-instruct</td></tr>
          <tr><td><code>model</code>-Feld</td><td>benutzer­definiert</td></tr>
        </table>
      </section>

      <!-- Upload-Zeile ---------------------------------------------------- -->
      <section style="margin-top:2.5rem;display:flex;flex-wrap:wrap;gap:1rem;align-items:center">
        <input type="file" accept=".pdf" @change="onFileChange" />
        <button class="btn" @click="uploadFile" :disabled="!selectedFile || busy">
          Upload
        </button>
        <span style="font-size:.9rem;color:var(--col-muted)">{{ uploadStatus }}</span>
      </section>

      <!-- AI-Button + Link ----------------------------------------------- -->
      <section style="display:flex;justify-content:space-between;align-items:center;margin-top:3rem">
        <a href="#">Hast du Feedback oder einen Kommentar?</a>
        <button class="btn btn-primary" @click="checkWithAI" :disabled="busy">
          Check mit AI
        </button>
      </section>

      <!-- Antwort-Box ----------------------------------------------------- -->
      <section v-if="aiResponse" style="background:#f0f6ff;padding:1rem;border-radius:12px;margin-top:2rem;white-space:pre-wrap">
        <pre style="margin:0">{{ JSON.stringify(aiResponse, null, 2) }}</pre>
      </section>
    </div>
  </div>
</template>
