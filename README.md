<h2 align="center">
  Portfolio Website - Vite Edition
</h2>
<div align="center">
  <img alt="Portfolio preview" src="./Images/readme-img1.png" />
</div>

<br />

## Overview

This repository contains my personal portfolio site built with React, Vite, and React-Bootstrap. It showcases my experience, skills, projects, resume, and includes an AI chatbot that answers questions about me.

Forking and customizing the site is intentionally simple: **update a single data file (`src/Portfolio.js`) with your information, rebuild, and deploy.**

## Tech Stack

- React 18 + Vite
- React-Bootstrap & custom CSS
- React Router
- Hosted chatbot endpoint ([Profile Bot](https://github.com/chandrapavan1104/Profile_bot))

## Quick Start

```bash
# clone your fork
git clone https://github.com/<your-user>/portfolio-website.git
cd portfolio-website

# install dependencies
npm install

# copy environment template and update the API endpoint if needed
cp .env.example .env

# start the dev server
npm run dev   # http://localhost:5173
```

To create a production build:

```bash
npm run build
npm run preview    # optional: serve the production build locally
```

## Personalize in Minutes

All portfolio content (name, subtitle, social links, skills, education, experience, projects, contact info) lives in **`src/Portfolio.js`**. Replace the sample values with your own:

```js
const portfolio = {
  name: "Your Name",
  title: "Role | Specialization",
  subTitle: "Short punchy intro...",
  // ...
  projects: [
    {
      name: "Project Title",
      techStack: ["React", "Node", "PostgreSQL"],
      description: "Project summary...",
      github: "https://github.com/you/project",
      demo: "https://your-demo-link.com"
    },
  ],
  // ...
};
```

Once you save the file, the site hot-reloads with your content. No additional configuration needed.

## Chatbot Integration

The chatbot section sends user questions to my hosted Profile Bot API (`https://profile-bot-api-977721269659.us-west2.run.app/ask`). If you want to run your own assistant or extend its knowledge base, follow the setup guide in the companion repo: **[chandrapavan1104/Profile_bot](https://github.com/chandrapavan1104/Profile_bot)**.

### Using your own bot

1. Deploy the Profile Bot backend (instructions in the linked repo).
2. Update `VITE_CHATBOT_API_URL` inside your local `.env` file to point to your deployment. The endpoint expects a JSON body with a `query` field, e.g. `{ "query": "Tell me about your AI projects." }`.
3. Optionally adjust the welcome message or fallback copy in `src/components/Chatbot/Chatbot.jsx`.

## Deploy

You can deploy the generated `dist/` output to any static hosting provider (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.). For Vercel:

1. Push your repository to GitHub.
2. Import the project in Vercel and choose the `npm run build` command.
3. Set the framework preset to “Vite” (Vercel detects it automatically).

## Contributing / Forking

Feel free to fork this repo, customize it, and share your version. Credit is appreciated but not required. If you spot a bug or have an improvement in mind, open an issue or pull request.

## Support

If this template helps you launch your own portfolio, drop a ⭐️ on the repo or share it with friends. Happy building!
