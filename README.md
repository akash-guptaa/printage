# PRINTAGE — Premium Signage & CNC Manufacturing

Official website for **PRINTAGE**, Mumbai's premium signage manufacturing company based in Bhayandar West.

## Tech Stack
- **React 19** + **Vite 8**
- **Tailwind CSS 3**
- **Lucide React** icons
- **localStorage** for admin data persistence

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Publish to Netlify from GitHub

Netlify settings are already in `netlify.toml`: `npm run build`, publish `dist`, and Node.js 22. The GitHub repository is `https://github.com/akash-guptaa/printage.git` and its deployment branch is `main`.

1. From the parent folder that contains this project, clone the repository beside it:

	```powershell
	git clone https://github.com/akash-guptaa/printage.git printage-deploy
	```

2. Copy this site's files into the clone. Replace the source path below with this project's folder path:

	```powershell
	robocopy "C:\path\to\apex-signage-mumbai" ".\printage-deploy" /E /XD .git node_modules dist
	```

3. Commit and push the site:

	```powershell
	Set-Location .\printage-deploy
	git add -A
	git commit -m "Add PRINTAGE website"
	git push origin main
	```

	If GitHub requests authentication, sign in with Git Credential Manager or run `gh auth login` and follow its prompts. Do not put a GitHub token in the repository or command history.

4. In Netlify, select **Add new site** > **Import an existing project** > **GitHub**, authorize Netlify, and choose `akash-guptaa/printage` on the `main` branch. Deploy using the detected settings.
5. In Netlify's domain settings, choose an available site name, for example `printage-mumbai.netlify.app`.

Netlify automatically rebuilds on later pushes to `main`. SPA routing and asset/security headers are configured in `netlify.toml`.

## Contact
- **Phone:** 098192 21376 / 7400422742
- **Email:** printage01@gmail.com
- **Address:** Shop No. 8, Raghuleela Building, 150 Feet Rd, Bhayandar West, Maharashtra 401101
