# Web3 Authentication System

This project is a backend system for secure Web3 authentication via EVM-compatible crypto wallets.  
Users authenticate by signing a unique message with their wallet (e.g., MetaMask), and persistent sessions are established using enhanced security mechanisms.

The system includes measures to detect bots and block malicious users.

Each session is associated with:

- 🔐 A signed message from the user’s wallet
- 🌐 IP address
- 🧬 Browser/device fingerprint
- 🕵️‍♂️ User-agent string

---

## ⚙️ Project Setup

**1. Clone the repository and prepare environment variables:**

```bash
cp .env.example .env
```

**2. Start Docker Desktop.**

**3. Set the appropriate values in your new .env file.**

**4. Create the database. Open pgAdmin or use psql, then create a database named:**

```sql
CREATE DATABASE web3_auth_system_db;
```

**5. Run the project:**

```bash
$ docker compose up --build
```

**6. Open API documentation. Navigate to:**

http://localhost:{PORT}/documentation

## Enjoy!
