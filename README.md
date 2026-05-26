# DestinAsian Headless Worpress Front-End Source Code

## Local Build And Static Serve

- Install: `npm install`
- Build: `npm run build`
- Local static serve on port `3001`: `npm run start`

## Production PM2 Command (Port 3001)

- From deployed project root:
  `pm2 start npm --name destinasian-testing -- start`
  `pm2 save`

## Deploy Workflow Note

- `.github/workflows/deploy.yml` builds in GitHub Actions, rsyncs the repository to `${{ secrets.TARGET_DIRECTORY }}`, then restarts PM2 with `npm run start` on port `3001`.
