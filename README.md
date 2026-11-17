# Social Vault 2.0

**Your Social Media. Your Files. Always Yours.**

A free, fast, privacy-first web downloader for public Instagram and Facebook Reels, videos, Watch links, photos, multi-slide carousels, and M4A audio. Every download streams directly to your device storage via native browser downloads (`chrome://downloads`, Android DownloadManager, macOS/Windows `Downloads`, and iPhone Safari `Files`).

---

## Features

- **Instagram & Facebook Downloader (`/`)** — Paste any public Instagram or Facebook Reel, video, post, photo, carousel, or short share link (`fb.watch`, `/share/r/`, `/share/reel/`), preview inline with sound, choose resolution, and save directly to your device.
- **Full HD / 2K / 4K + Audio** — Losslessly combines separate DASH high-definition video and AAC audio streams into a single faststart `.mp4` (`ffmpeg -c copy`, zero re-encoding), alongside universal H.264 `.mp4`, `.m4a` audio, and full-resolution `.jpg` images.
- **Multi-Select Carousel & Batch Downloader (`/downloader`)** — Fetch up to 15 links at once, select individual slides or videos, and save together as a folder-organized streaming `.zip` archive or as separate files.
- **Genuine Real-Time Download Status** — Live `Preparing download` -> `Downloading` -> `Download completed` / `Download failed` tracking backed by real byte-level stream telemetry, plus optional desktop `Save As` location picker.
- **Local Download History (`/history`) & Settings (`/settings`)** — Stored only in your browser (never uploaded), with one-click re-fetch, JSON history export, light/dark/system theme, and default quality preferences.
- **Security by Design** — Strict Meta CDN HTTPS allowlist, DNS private-IP SSRF protection, RFC 6266/5987 filename sanitization, automatic `/tmp` cleanup, zero passwords requested, zero trackers, and zero watermarks.

---

## Deploy to Vercel (1-Step GitHub Import)

Social Vault 2.0 is built on Next.js 15 App Router (`nodejs` runtime) and deploys to **Vercel** in a single step with **zero required configuration**.

### Environment Variables

- **Required:** **None.** The app runs out of the box with zero API keys, zero database credentials, and zero secrets.
- **Optional:**
  | Variable | Required | Default | Purpose |
  | --- | --- | --- | --- |
  | `NEXT_PUBLIC_APP_URL` | No | Auto-detected from Vercel (`VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`) | Custom canonical base URL for `/sitemap.xml` and `/robots.txt` (e.g. `https://vault.example.com`) |

### Step-by-Step Deployment

1. **Unzip the project** (if starting from `social-vault-vercel.zip`):
   ```bash
   unzip social-vault-vercel.zip -d social-vault
   cd social-vault
   ```
2. **Push to a new GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Social Vault 2.0"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
   *(Or create a repository on [github.com/new](https://github.com/new) and upload the unzipped project files directly.)*
3. **Import & Deploy on Vercel**:
   - Open [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
   - Click **Import** next to your repository.
   - Keep every default setting (Vercel auto-detects **Next.js**, `npm install`, and `next build`; no environment variables needed).
   - Click **Deploy**.
4. **Verify your live site**:
   - Open your assigned `https://<your-project>.vercel.app` URL (and optionally check `/api/status` to confirm `"hdMuxerAvailable": true`).
   - Paste a public Instagram or Facebook Reel URL, click **Get Video**, and click **Download** to confirm the file saves directly to your device's `Downloads` folder.

### Vercel Runtime Notes

- `next.config.ts` bundles `ffmpeg-static` (~77 MB Linux x64 binary, well below Vercel's 250 MB serverless bundle limit) via `outputFileTracingIncludes` and `serverExternalPackages` for lossless Full HD / 2K / 4K video+audio muxing.
- All API routes declare `runtime = "nodejs"`, `dynamic = "force-dynamic"`, and `maxDuration = 60` (compatible with both Vercel Hobby and Pro plans), stream responses chunk-by-chunk, and clean up ephemeral `/tmp` files immediately after each mux.
- *Note on platform rate limiting:* Instagram and Facebook occasionally throttle unauthenticated requests from shared cloud datacenter IP ranges. Public posts return direct HD media when accessible, and the app displays an honest retry message if Meta temporarily rate-limits a request.

---

## Local Development

**Prerequisite:** Node.js 20+ and npm.

```bash
npm install
npm run dev       # Development server at http://localhost:3000
```

### Verification Commands

```bash
npm test          # Run unit tests (URL parser, SSRF guards, headers, streaming ZIP)
npm run lint      # Strict TypeScript check (tsc --noEmit)
npm run build     # Full Next.js production build
npm run start     # Start production server on port 3000
```

---

## Project Structure

```text
src/
  app/
    page.tsx                  # Main Downloader (/)
    downloader/page.tsx       # Multi-link Batch Downloader (/downloader)
    history/page.tsx          # Local Download History (/history)
    settings/page.tsx         # Appearance & Download Preferences (/settings)
    api/
      analyze/route.ts        # Live public IG & FB URL extraction
      status/route.ts         # Service & HD muxer health check
      media/
        stream/route.ts       # SSRF-guarded chunked attachment & Range proxy
        mux/route.ts          # Lossless Full HD / 2K / 4K MP4 muxer (ffmpeg -c copy)
        zip/route.ts          # Memory-efficient streaming multi-file ZIP builder
        progress/route.ts     # Real-time byte & file transfer telemetry
  components/
    layout/                   # AppShell, footer, privacy modal, notifications
    pages/                    # HomeView, DownloaderView, HistoryView, SettingsView
    providers/                # Theme, settings & local IndexedDB history provider
    shared/                   # UrlAnalyzerBar, AnalysisResultCard, ProgressBar, badges
  lib/
    download-manager.ts       # Native browser download engine, Save Picker & Blob helper
    download-tracker.ts       # Server progress store, RFC 6266 headers & start cookie
    media-extractor.ts        # Public Instagram & Facebook media extractor + DASH parser
    media-muxer.ts            # Temp-safe lossless ffmpeg DASH video+audio combiner
    zip-stream.ts             # Zero-dependency streaming PKZIP 2.0 archive writer
    url-parser.ts             # Social URL recognizer & canonicalizer
    security.ts               # SSRF private-IP filter, CDN allowlist & filename sanitizer
tests/
  core.test.ts                # Vitest unit test suite
next.config.ts                # Next.js + Vercel ffmpeg tracing & security headers
vercel.json                   # Zero-config Vercel framework definition
```
