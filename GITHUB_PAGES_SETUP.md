# GitHub Pages Setup Guide

This guide will help you set up GitHub Pages deployment for TheWCAG Accessibility Visualizer website.

## Quick Start

1. **Update the Astro configuration** with your GitHub username and repository name
2. **Enable GitHub Pages** in your repository settings
3. **Push to GitHub** - deployment happens automatically!

## Step-by-Step Instructions

### Step 1: Update Astro Configuration

Edit `apps/website/astro.config.mjs` and update these values:

```javascript
export default defineConfig({
  // Replace YOUR_USERNAME with your GitHub username
  site: "https://YOUR_USERNAME.github.io",
  
  // Replace thewcag-accessibility-visualizer with your repository name
  // If your repo is named differently, update this
  base: "/thewcag-accessibility-visualizer/",
  
  // ... rest of config
});
```

**Important Notes:**
- If your repository is named `thewcag-accessibility-visualizer`, use `/thewcag-accessibility-visualizer/`
- If your repository is named `YOUR_USERNAME.github.io` (user/organization site), use `base: "/"`
- The `site` URL should match your GitHub Pages URL

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (in the repository menu)
3. Scroll down to **Pages** (in the left sidebar, under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - Click **Save**

### Step 3: Update Hardcoded Paths (If Needed)

If you changed the base path from `/thewcag-accessibility-visualizer/`, you may need to update hardcoded paths in:

- `apps/website/src/components/LanguageSelector.tsx` - Update `basePath` constant
- `apps/website/src/components/HeaderLink.tsx` - Update paths
- `apps/website/src/pages/*.astro` - Update `path` props
- `apps/website/src/layouts/*.astro` - Update asset paths

**Note**: Most paths are handled automatically by Astro's base path configuration, but some components have hardcoded values that may need updating.

### Step 4: Push to GitHub

Once you've updated the configuration:

```bash
# Commit your changes
git add .
git commit -m "Configure GitHub Pages deployment"

# Push to GitHub
git push origin main
```

### Step 5: Verify Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see "Deploy Website to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, your site will be available at:
   - `https://YOUR_USERNAME.github.io/thewcag-accessibility-visualizer/`

## Troubleshooting

### Workflow Not Running

- Ensure GitHub Pages is enabled and set to "GitHub Actions" source
- Check that you've pushed changes to the `main` branch
- Verify the workflow file exists at `.github/workflows/deploy-website.yml`

### Build Fails

- Check the Actions tab for error messages
- Ensure `pnpm-lock.yaml` is committed
- Verify Node.js version compatibility (workflow uses Node 20)
- Check that all dependencies are listed in `package.json`

### Site Shows 404

- Verify the `base` path in `astro.config.mjs` matches your repository name
- Check that the site URL is correct
- Ensure GitHub Pages is enabled and using "GitHub Actions"

### Assets Not Loading

- Verify the `base` path ends with `/`
- Check that paths in components use the correct base path
- Ensure `.nojekyll` file is being created (workflow does this automatically)

## Manual Deployment (Alternative)

If you prefer not to use GitHub Actions:

1. Build locally:
   ```bash
   pnpm --filter @a11y-visualizer/website build
   ```

2. Copy `apps/website/dist` contents to a `docs` folder in repository root

3. Add `.nojekyll` file to `docs` folder

4. Commit and push

5. In GitHub Settings → Pages, set source to `/docs` folder

## Environment Variables (Optional)

You can customize the deployment using GitHub Secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `SITE_URL`: Your GitHub Pages URL (e.g., `https://YOUR_USERNAME.github.io`)
   - `BASE_PATH`: Your base path (e.g., `/thewcag-accessibility-visualizer`)

The workflow will use these if set, otherwise it uses defaults.

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `apps/website/public/` with your domain
2. Configure DNS settings for your domain
3. Enable HTTPS in GitHub Pages settings

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)
- [Detailed Deployment Guide](./apps/website/DEPLOYMENT.md)
