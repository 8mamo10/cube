# Stamp Card Web Service

A digital stamp card system allowing customers to accumulate stamps based on in-store purchases. Staff can award stamps via QR code scanning.

## Features

- Customer accounts with digital stamp cards
- QR code generation for customers (5-minute expiration)
- Staff QR scanning to award stamps
- Automatic card completion detection
- JWT authentication with refresh tokens
- Role-based access control (Customer/Staff/Admin)

## Technology Stack

- **Backend:** NestJS, TypeORM, PostgreSQL
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Authentication:** JWT with httpOnly cookies
- **QR Codes:** qrcode (backend), html5-qrcode (frontend)
- **Architecture:** Monorepo with npm workspaces

## Project Structure

```
cube/
├── packages/
│   ├── backend/          # NestJS API
│   ├── frontend/         # React SPA
│   └── shared/           # Shared TypeScript types
├── docker/               # Docker Compose for PostgreSQL
└── package.json          # Root workspace config
```

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker and Docker Compose

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create environment files from examples:

```bash
# Backend
cp packages/backend/.env.example packages/backend/.env

# Frontend
cp packages/frontend/.env.example packages/frontend/.env
```

Edit `packages/backend/.env` and update the secrets:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
QR_SECRET=your-super-secret-qr-signing-key-change-this
```

### 3. Start PostgreSQL

```bash
npm run db:up
```

This starts a PostgreSQL container on port 5432.

### 4. Start the Backend

```bash
npm run backend
```

The API will be available at http://localhost:3000/api

On first run, TypeORM will automatically create the database schema.

### 5. Start the Frontend

In a new terminal:

```bash
npm run frontend
```

The frontend will be available at http://localhost:5173

## Development Commands

```bash
# Start both backend and frontend concurrently
npm run dev

# Build all packages
npm run build

# Lint all packages
npm run lint

# Format code
npm run format

# Database commands
npm run db:up        # Start PostgreSQL
npm run db:down      # Stop PostgreSQL
npm run db:logs      # View PostgreSQL logs
```

## Backend Commands

```bash
cd packages/backend

# Development mode with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod

# Run tests
npm test
npm run test:watch
npm run test:cov

# TypeORM migrations
npm run migration:generate -- src/migrations/MigrationName
npm run migration:run
npm run migration:revert
```

## Frontend Commands

```bash
cd packages/frontend

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Customer
- `GET /api/customer/cards` - Get user's stamp cards
- `GET /api/customer/cards/:id` - Get specific card
- `GET /api/customer/qr-code` - Generate QR code

### Staff
- `POST /api/staff/award-stamp` - Award stamp via QR code
- `GET /api/staff/history` - Get stamping history

## User Flow

### Customer Flow

1. Register as a customer at `/register`
2. Login and view dashboard
3. Generate QR code (valid for 5 minutes)
4. Show QR code to staff
5. View updated stamp card

### Staff Flow

1. Register as staff at `/register`
2. Login to staff dashboard
3. Click "Start Scanning"
4. Scan customer's QR code
5. View confirmation and history

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT access tokens (15 min expiration)
- JWT refresh tokens (7 days, httpOnly cookies)
- QR code HMAC-SHA256 signatures
- QR code expiration (5 minutes)
- Role-based access control
- Input validation with class-validator
- SQL injection protection (TypeORM parameterized queries)
- CORS protection
- Helmet security headers
- Rate limiting (10 requests per minute)

## Database Schema

### Users
- Stores customer and staff accounts
- Password hashing via bcrypt
- Role-based access (customer/staff/admin)

### Stamp Cards
- One active card per customer
- Tracks stamps_count (0-5)
- Automatic completion at max stamps

### Stamps
- Audit trail of awarded stamps
- Links to card and staff member

### QR Codes
- Signed payloads with expiration
- One-time use enforcement

## Deployment

### Backend Deployment

1. Build the backend:
   ```bash
   cd packages/backend
   npm run build
   ```

2. Set environment variables for production

3. Run migrations:
   ```bash
   npm run migration:run
   ```

4. Start the server:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd packages/frontend
   npm run build
   ```

2. Serve the `dist` folder using any static file server

## Testing

### Backend Tests

```bash
cd packages/backend
npm test
```

### Manual Testing Checklist

- [ ] User registration (customer and staff)
- [ ] User login
- [ ] Customer can view stamp cards
- [ ] Customer can generate QR code
- [ ] QR code expires after 5 minutes
- [ ] Staff can scan QR code
- [ ] Stamp is awarded successfully
- [ ] Card completes at 5 stamps
- [ ] Cannot award stamp to completed card
- [ ] JWT token refresh works
- [ ] Role-based access control works

## Future Enhancements

- Reward redemption system
- Multiple card types
- Admin dashboard with analytics
- Push notifications
- Mobile app (React Native)
- Multi-location support
- Loyalty tiers

## License

MIT

## Support

For issues and questions, please create an issue in the repository.
