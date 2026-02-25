# Quick Setup Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment files:**
   ```bash
   cp packages/backend/.env.example packages/backend/.env
   cp packages/frontend/.env.example packages/frontend/.env
   ```

3. **Update secrets in `packages/backend/.env`:**
   - Change `JWT_SECRET` to a random string
   - Change `JWT_REFRESH_SECRET` to a different random string
   - Change `QR_SECRET` to another random string

4. **Start PostgreSQL:**
   ```bash
   npm run db:up
   ```

5. **Start backend (in one terminal):**
   ```bash
   npm run backend
   ```

6. **Start frontend (in another terminal):**
   ```bash
   npm run frontend
   ```

7. **Open browser:**
   - Frontend: http://localhost:5173
   - API Docs: http://localhost:3000/api

## Test the Application

### Create a Customer Account

1. Go to http://localhost:5173/register
2. Fill in the form:
   - Select "Customer" as role
   - Enter your details
   - Password must be at least 8 characters
3. Click "Sign up"

### Create a Staff Account

1. Open a new incognito/private window
2. Go to http://localhost:5173/register
3. Fill in the form:
   - Select "Staff Member" as role
   - Enter your details
4. Click "Sign up"

### Award a Stamp

1. In the customer window:
   - Click "Generate QR Code"
   - A QR code will appear

2. In the staff window:
   - Click "Start Scanning"
   - Allow camera permissions
   - Point camera at the QR code on the customer screen
   - You should see "Stamp Awarded!" message

3. Back in customer window:
   - You should see 1/5 stamps filled

### Complete a Card

Repeat the process 4 more times to complete the card (5 total stamps).

## Troubleshooting

### Database Connection Failed

```bash
# Check if PostgreSQL is running
docker ps

# If not running, start it
npm run db:up

# View logs
npm run db:logs
```

### Port Already in Use

If port 3000 or 5173 is already in use:

**Backend (3000):**
Edit `packages/backend/.env` and change `PORT=3000` to another port.

**Frontend (5173):**
Edit `packages/frontend/vite.config.ts` and change the port in server config.

### TypeScript Errors

```bash
# Clean and rebuild
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules
npm install
```

### Camera Not Working

- Make sure you're using HTTPS or localhost
- Check browser permissions for camera access
- Try a different browser (Chrome recommended)

## Stopping the Application

```bash
# Stop backend and frontend (Ctrl+C in each terminal)

# Stop PostgreSQL
npm run db:down
```

## Resetting the Database

```bash
# Stop PostgreSQL
npm run db:down

# Remove database volume
docker volume rm cube_postgres_data

# Start fresh
npm run db:up
npm run backend
```
