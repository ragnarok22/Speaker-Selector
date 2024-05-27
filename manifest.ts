import pkg from "./package.json"

const manifiest = {
  short_name: "Speaker list",
  name: pkg.name,
  version: pkg.version,
  manifest_version: 3,
  description: "Check how spoke in the scrum meeting",
  action: {
    default_icon: "icon.png",
    default_popup: "popup.html",
  },
  icons: {
    "16": "icon.png",
    "32": "icon.png",
    "48": "icon.png",
    "128": "icon.png",
  },
  content_scripts: [
    {
      matches: [
        "https://meet.google.com/*",
      ],
      js: [
        "scripts/meet-content.ts",
      ]
    }
  ],
  host_permissions: [
    "https://meet.google.com/*",
  ],
  background: {
    "service_worker": "src/background.ts",
  },
  permissions: [
    "storage",
    "scripting",
  ],
}

export default manifiest
