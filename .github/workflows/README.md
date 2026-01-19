# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated tasks.

## Workflows

### deploy-website.yml

Automatically builds and deploys the website to GitHub Pages when changes are pushed to the `main` branch.

**Prerequisites:**
1. **GitHub Pages MUST be enabled first!**
   - Go to Repository Settings → Pages
   - Set Source to "GitHub Actions"
   - Click Save

2. The repository must be public (or you need GitHub Pro/Team for private repos)

**What it does:**
- Builds the Astro website
- Creates a `.nojekyll` file
- Deploys to GitHub Pages

**Trigger:**
- Automatically on push to `main` branch (when website files change)
- Can be manually triggered from Actions tab

**Troubleshooting:**

**Error: "Get Pages site failed"**
- **Solution**: Enable GitHub Pages first (see Prerequisites above)
- Go to Settings → Pages → Set Source to "GitHub Actions"

**Error: "Pages site not found"**
- Ensure Pages is enabled in repository settings
- Wait a few minutes after enabling and try again

**Build fails:**
- Check that `pnpm-lock.yaml` is committed
- Verify all dependencies are in `package.json`
- Check the Actions tab for specific error messages

## Manual Deployment

If you prefer to deploy manually:

1. Build locally:
   ```bash
   pnpm --filter @a11y-visualizer/website build
   ```

2. Copy `apps/website/dist` to `docs` folder

3. Add `.nojekyll` file to `docs`

4. Commit and push

5. In Settings → Pages, set source to `/docs` folder
