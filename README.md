# 🔗 URL Shortener — Scalable TinyURL-Like System

> A production-grade, distributed URL shortener built to handle **billions of URLs** and massive redirect traffic — inspired by TinyURL and Bitly.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge)](https://url-shortener-java-fullstack.vercel.app)
![Architecture](https://img.shields.io/badge/Architecture-Distributed-blue?style=for-the-badge)
![Cache](https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Cassandra-1287B1?style=for-the-badge)

---

## 🌐 Live Deployment

**Frontend (Live App):** 👉 [https://url-shortener-java-fullstack.vercel.app](https://url-shortener-java-fullstack.vercel.app)

---

## ✨ Key Features

- 🔢 Converts long URLs into compact **7-character Base62** short codes
- ⚡ Fast redirection via **HTTP 301**
- 💥 **Collision-free** short code generation using distributed ID ranges
- 📦 **Horizontally scalable** stateless architecture
- 🚀 Optimized for **read-heavy traffic**
- 🧠 **Redis caching** for sub-millisecond redirects
- 🌍 Designed to support **billions of URLs** (62⁷ ≈ 3.5 trillion combinations)

---

## 🧠 System Overview

The system exposes two core operations:

| Operation | Description |
|-----------|-------------|
| **URL Shortening** | Generate a short code from a long URL |
| **Redirection** | Redirect users from a short code to the original URL |

The design prioritizes **scalability**, **performance**, and **availability** at every layer.

---

## 🔌 API Design

### ➤ Create Short URL

```http
POST /shorten
Content-Type: application/json
```

**Request Body:**
```json
{
  "longUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "https://mydomain.com/aZ9xY10"
}
```

---

### ➤ Redirect to Original URL

```http
GET /{shortCode}
```

**Response:** `HTTP 301 Redirect` — browser automatically navigates to the original URL.

---

## 🔢 Short Code Design

| Property | Value |
|----------|-------|
| Length | 7 characters |
| Encoding | Base62 (`a–z`, `A–Z`, `0–9`) |
| Total Combinations | **62⁷ ≈ 3.5 trillion** |
| Encrypted? | ❌ No — it's a unique identifier encoded from an integer ID |

This ensures short, readable URLs with extremely low collision probability and enough capacity for billions of entries.

---

## ⚙️ High-Level Architecture

```
                        ┌─────────────────┐
                        │  Load Balancer  │
                        └────────┬────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
      │  App Server  │  │  App Server  │  │  App Server  │
      │  (Stateless) │  │  (Stateless) │  │  (Stateless) │
      └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
             │                 │                  │
     ┌───────▼─────────────────▼──────────────────▼───────┐
     │                   Redis Cache                       │
     └───────────────────────┬─────────────────────────────┘
                             │ (cache miss)
     ┌───────────────────────▼─────────────────────────────┐
     │              Cassandra (Distributed DB)              │
     └─────────────────────────────────────────────────────┘
                             ▲
     ┌───────────────────────┴─────────────────────────────┐
     │             ZooKeeper (ID Range Coordinator)         │
     └─────────────────────────────────────────────────────┘
```

| Component | Role |
|-----------|------|
| **Load Balancer** | Distributes traffic across app servers |
| **App Servers** | Stateless — handle shortening and redirects |
| **Cassandra** | Stores short → long URL mappings at scale |
| **Redis** | Caches hot links for ultra-low latency redirects |
| **ZooKeeper** | Assigns non-overlapping ID ranges to servers |

---

## 📈 Collision-Free ID Generation

Each app server gets a **unique, non-overlapping numeric range** from ZooKeeper:

```
Server 1  →  IDs  0         to  1,000,000
Server 2  →  IDs  1,000,001 to  2,000,000
Server 3  →  IDs  2,000,001 to  3,000,000
```

Each server:
1. Increments its **local counter**
2. Encodes the integer to **Base62**
3. Stores the mapping in **Cassandra**

✅ Since ranges never overlap, **collisions are mathematically impossible**.

---

## 🚀 URL Creation Flow

```
Client → POST /shorten
           │
           ▼
     Load Balancer
           │
           ▼
     App Server
      ├── Generate Base62 short code
      ├── Store mapping in Cassandra
      └── Return short URL to client ✅
```

---

## ⚡ Redirect Flow (Read-Optimized)

Redirects happen **far more frequently** than URL creation — the entire system is optimized for this path.

```
User → GET /{shortCode}
            │
            ▼
       App Server
            │
            ▼
       Check Redis Cache
       ┌────┴────┐
       │         │
    ✅ Hit     ❌ Miss
       │         │
       │    Fetch from Cassandra
       │    Store in Redis
       │         │
       └────┬────┘
            ▼
     HTTP 301 Redirect ✅
```

---

## 🗄️ Data Storage

### Cassandra (Primary Database)
- Horizontally scalable with no single point of failure
- High availability via replication
- Optimized for large-scale writes and key-value lookups

### Redis (Cache Layer)
- Stores frequently accessed short → long URL mappings
- Dramatically reduces latency on hot links
- Shields Cassandra from heavy read traffic

---

## ✅ Why This Design Works

| Challenge | Solution |
|-----------|----------|
| Billions of URLs | Cassandra's horizontal scaling |
| High redirect traffic | Redis caching + stateless servers |
| ID collisions at scale | ZooKeeper-assigned non-overlapping ranges |
| Scaling bottlenecks | Stateless app servers — add more anytime |
| Database overload | Redis absorbs the majority of reads |

---

## 🏫 Academic & Placement Relevance

This project demonstrates real-world knowledge of:

- **Distributed systems** fundamentals
- **Scalable backend** design patterns
- **Caching strategies** (write-through, cache-aside)
- **System design interviews** (TinyURL / Bitly style problems)

Suitable for:
- ✅ VIT academic project submissions
- ✅ Placement & SDE interviews
- ✅ Resume and GitHub portfolio

---

## 👨‍💻 Author

Built as a hands-on backend & system design project with real-world scalability considerations.

> ⭐ Star this repo if you find it useful!
