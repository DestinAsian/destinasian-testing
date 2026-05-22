# DestinAsian Headless Worpress Front-End Source Code

## Local Build And Static Serve

- Install: `npm install`
- Build: `npm run build`
- Build output folder: `.next`
- Local static serve on port `3001`: `npx serve .next -l 3001`
- Optional helper: `npm run serve:local`

## Production PM2 Command (Port 3001)

- From deployed project root:
  `pm2 delete destinasian-testing || true`
  `pm2 start "npx serve .next -l 3001" --name destinasian-testing`
  `pm2 save`

## Deploy Workflow Note

- `.github/workflows/deploy.yml` builds in GitHub Actions, rsyncs the repository to `${{ secrets.TARGET_DIRECTORY }}`, then restarts PM2 with `npx serve` on port `3001`.
