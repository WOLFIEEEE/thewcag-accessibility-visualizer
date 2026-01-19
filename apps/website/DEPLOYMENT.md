# GitHub Pages Deployment Guide

This document explains how to deploy the TheWCAG Accessibility Visualizer website to GitHub Pages.

## Prerequisites

1. A GitHub repository (public or private with GitHub Pro/Team)
2. GitHub Pages enabled in repository settings
3. The repository must be pushed to GitHub

## Setup Steps

### 1. Update Astro Configuration

Before deploying, you need to update `apps/website/astro.config.mjs` with your GitHub Pages URL:

```javascript
export default defineConfig({
  site: "https://YOUR_USERNAME.github.io",  // Replace YOUR_USERNAME with your GitHub username
  base: "/thewcag-accessibility-visualizer/",  // Replace with your repository name if different
  // ... rest of config
});
```

**Important**: 
- If your repository is named `thewcag-accessibility-visualizer`, the base should be `/thewcag-accessibility-visualizer/`
- If your repository is named `YOUR_USERNAME.github.io` (user/organization site), set `base: "/"` and `site: "https://YOUR_USERNAME.github.io"`

### 2. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages** (or **Settings** → **Code and automation** → **Pages**)
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - Click **Save**

### 3. (Optional) Set Environment Variables

If you want to customize the site URL or base path via environment variables:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add a new repository secret:
   - **Name**: `SITE_URL`
   - **Value**: `https://YOUR_USERNAME.github.io`
3. (Optional) Add another secret:
   - **Name**: `BASE_PATH`
   - **Value**: `/thewcag-accessibility-visualizer` (or your repo name)

### 4. Deploy

The deployment happens automatically when you:

1. Push changes to the `main` branch that affect:
   - `apps/website/**` files
   - `docs/**` files
   - The workflow file itself

2. Or manually trigger it:
   - Go to **Actions** tab
   - Select **Deploy Website to GitHub Pages**
   - Click **Run workflow**

### 5. Access Your Site

After deployment (usually takes 1-2 minutes), your site will be available at:

- **Project site**: `https://YOUR_USERNAME.github.io/thewcag-accessibility-visualizer/`
- **User/Org site**: `https://YOUR_USERNAME.github.io/` (if repo is named `YOUR_USERNAME.github.io`)

## Troubleshooting

### Site shows 404

- Check that the `base` path in `astro.config.mjs` matches your repository name
- Verify GitHub Pages is enabled and using "GitHub Actions" as the source
- Check the Actions tab for any build errors

### Assets not loading

- Ensure the `base` path is correctly set (should end with `/`)
- Check that `.nojekyll` file is being created (the workflow does this automatically)
- Verify the site URL in `astro.config.mjs` is correct

### Build fails

- Check the Actions tab for error messages
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility (workflow uses Node 20)

## Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

1. Build the site locally:
   ```bash
   pnpm --filter @a11y-visualizer/website run build
   ```

2. Copy the `apps/website/dist` folder contents to a `docs` folder in the root

3. Add `.nojekyll` file to the `docs` folder

4. Commit and push

5. In GitHub Settings → Pages, set source to `/docs` folder

## Notes

- The workflow automatically adds a `.nojekyll` file to prevent Jekyll processing
- The site is rebuilt on every push to main (if website files change)
- Build artifacts are not committed to the repository
- The workflow uses the latest stable versions of GitHub Actions
