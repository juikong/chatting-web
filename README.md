# Chat-ing Admin Dashboard

Admin Dashboard for Chat-ing App

## Deployment

Installation

```bash
npm install
```

Edit .env file

```bash
VITE_SERVER_URL=https://domainname:3001
```

Build the app

```bash
npm run build
```

Copy dist folder to web server, sample Nginx config

```bash
server_name admin.domainname;

root /var/www/admin;
index index.html;
```

## Run the app

Open Chat-ing Admin Dashboard website to setup admin account and start using it
