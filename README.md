# Node.js with PostgreSQL Setup

## Setup Instructions

1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure your PostgreSQL credentials in the `.env` file:
   - `PGHOST=localhost`
   - `PGUSER=your_username`
   - `PGPASSWORD=your_password`
   - `PGDATABASE=your_database`
   - `PGPORT=5432`
3. Test the connection:
   ```sh
   node index.js
   ```

## Files
- `db.js`: PostgreSQL connection setup
- `index.js`: Test connection script
- `.env`: Environment variables for DB credentials
