# Northline · Executive Dashboard

A static, single-page weekly executive project tracker. Designed to be deployed via **GitHub Pages** with progressive paths to **SharePoint** as the data source and **Azure OpenAI** for the AI parsing flow.

## What's here

```
/dist/                    ← published to GitHub Pages
  index.html              ← entry point (loads everything)
  automation.html         ← Phase-3 automation roadmap page
  css/styles.css          ← all styles
  js/
    config.js             ← runtime config: data source, AI endpoint, integrations
    data.js               ← inline mock data + JSON/SharePoint loader
    components.jsx        ← Icons + ProjectCard + ListView + UpdateForm + …
    app.jsx               ← App shell, URL handling, state
  data/
    projects.json         ← project records (edit these to update the dashboard)
    summary.json          ← exec summary text + week label + history

/.github/workflows/
  pages.yml               ← auto-deploy on push to main
```

## Deploy in 3 steps

1. Push this repo to GitHub.
2. Settings → Pages → Source: **GitHub Actions**.
3. Push to `main` and watch the workflow at Actions → "Deploy to GitHub Pages".

The site publishes from `dist/`. Your URL will be `https://<org>.github.io/<repo>/`.

For internal-only access (Hearst): use a private repo on GitHub Enterprise Cloud and enable "Private Pages" in repo settings, or front the public URL with a Cloudflare Access policy / Azure App Proxy.

## Editing project data

The simplest workflow: edit `dist/data/projects.json` directly (via PR or the GitHub web editor) and switch `dataSource` in `dist/js/config.js`:

```js
window.NORTHLINE_CONFIG = {
  dataSource: 'json',
  jsonUrl: 'data/projects.json',
  // ...
};
```

By default the dashboard reads inline mock data from `data.js` so it works zero-config.

## SharePoint as the data source (Phase C)

When you're ready to back this with a SharePoint List:

1. Create a SharePoint List with columns matching `projects.json` keys (id, name, owner, team, status, prevStatus, current, next, risks, metrics, channel, …).
2. Register an Entra ID app with `Sites.Read.All` scope.
3. Add MSAL.js to `index.html` for browser-side auth.
4. Implement the SharePoint branch in `data.js` (a stub is in place — see the `dataSource === 'sharepoint'` block).

## AI parsing (the "paste an update" flow)

The form's "Parse with AI" button calls `window.claude.complete()` when running inside Claude (preview environment). For production deployment, set `aiEndpoint` in `config.js` to a serverless function that proxies to Azure OpenAI:

```js
aiEndpoint: 'https://northline-ai.azurewebsites.net/api/parse',
```

The function should accept `{ text, projects }` and return the same JSON shape the existing prompt produces. See `js/components.jsx` → `parseWithAI` for the schema. When `aiEndpoint` is null and `window.claude` is unavailable, the form falls back to manual entry with no error.

## Teams output (per-project channel routing)

Add a `webhookUrl` field to each project in `projects.json` (Teams channel → Connectors → Incoming Webhook), then set `enableTeamsWebhooks: true` in `config.js`. On submit, the dashboard POSTs an Adaptive Card to that channel.

## Local development

This is plain HTML/JS — no build step. To run locally:

```
cd dist
python3 -m http.server 8000
# open http://localhost:8000
```

Edits to `.jsx` files take effect on browser refresh (Babel transpiles in-browser).

## Roadmap

See `dist/automation.html` for the three-phase plan (central form → share links → Teams bot).
