// Northline dashboard configuration
// Edit these values to point at your real data sources / AI endpoints.
window.NORTHLINE_CONFIG = {
  // ---- Data source -----------------------------------------------------
  // 'inline'    — read window.PROJECTS from data.js (default, ships with mock data)
  // 'json'      — fetch from a JSON file in the repo (e.g. 'data/projects.json')
  // 'sharepoint'— fetch from a SharePoint List via Microsoft Graph (requires MSAL setup)
  dataSource: 'json',
  jsonUrl: 'data/projects.json',
  sharePoint: {
    // tenantId: '...',
    // clientId: '...',
    // siteId: '...',
    // listId: '...',
  },

  // ---- AI parsing endpoint --------------------------------------------
  // When running on Claude (artifact preview), window.claude.complete is used.
  // For GitHub Pages / SharePoint deployment, point this at an Azure Function
  // or Cloudflare Worker that proxies to Azure OpenAI / Anthropic.
  aiEndpoint: null, // e.g. 'https://northline-ai.azurewebsites.net/api/parse'

  // ---- Output integrations --------------------------------------------
  // Per-project Teams Incoming Webhook URLs go in projects.json under `webhookUrl`.
  // When set, "Submit update" also POSTs a card to that channel.
  enableTeamsWebhooks: false,
};
