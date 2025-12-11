🔗 URL Shortener – Scalable TinyURL-Like System

A highly scalable URL shortener inspired by TinyURL, designed to handle billions of URLs and very high redirect traffic.
The system converts long URLs into short, shareable links and efficiently redirects users using HTTP 301 redirects.

This project focuses on system design, scalability, caching, and distributed ID generation.

🌐 Live Deployment

Frontend (Live App):
👉 https://url-shortener-java-fullstack.vercel.app

📌 Key Features

Shortens long URLs into compact Base62 links

Fast redirection using HTTP 301

Collision-free short code generation

Horizontally scalable architecture

Optimized for read-heavy traffic

Redis-based caching for low-latency redirects

Designed to support billions of URLs

🧠 System Overview

The system exposes two core functionalities:

URL Shortening – Generate a short URL from a long URL

Redirection – Redirect users from short URL to original URL

The design prioritizes scalability, performance, and availability.

🔌 API Design
➤ Create Short URL
POST /shorten


Request Body

{
  "longUrl": "https://example.com/very/long/url"
}


Response

{
  "shortUrl": "https://mydomain.com/aZ9xY10"
}

➤ Redirect to Original URL
GET /{shortCode}


Response

HTTP 301 Redirect

Browser automatically navigates to the original URL

🔢 Short Code Design

Length: 7 characters

Encoding: Base62

a–z, A–Z, 0–9

Total combinations:

62⁷ ≈ 3.5 trillion


This ensures:

Short and readable URLs

Extremely low collision probability

Enough capacity for billions of entries

✅ The short code is not encrypted.
It is a unique identifier generated from an integer ID and encoded using Base62.

⚙️ High-Level Architecture

Load Balancer
Distributes traffic across multiple servers

Stateless Application Servers
Handle URL creation and redirects

Distributed Database (Cassandra)
Stores short URL → long URL mappings

Redis Cache
Serves frequent redirect requests at very low latency

ZooKeeper (or equivalent)
Assigns non-overlapping ID ranges to servers

📈 Collision-Free & Scalable ID Generation

To safely generate short URLs at scale:

Each application server receives a unique numeric ID range

Example:

Server 1 → 0 – 1,000,000

Server 2 → 1,000,001 – 2,000,000

Each server:

Increments a local counter

Converts the number to Base62

Stores the mapping in the database

✅ Since ranges never overlap, collisions are impossible.

🚀 URL Creation Flow

Client sends POST /shorten

Load balancer routes request to an app server

Server:

Generates Base62 short code

Stores mapping in Cassandra

Short URL is returned to the client

⚡ Redirect Flow (Read-Optimized)

Redirects occur far more often than URL creation.

User opens GET /{shortCode}

App server checks Redis

Cache hit → instant redirect

Cache miss → fetch from Cassandra, store in Redis

Server responds with HTTP 301 redirect

This ensures fast redirects and reduced database load.

🗄️ Data Storage
Cassandra (Database)

Horizontally scalable

High availability

Optimized for large-scale writes

Redis (Cache)

Stores frequently accessed links

Reduces latency dramatically

Protects database from heavy read traffic

✅ Why This Design Works

Handles billions of URLs

Optimized for heavy redirect traffic

Stateless services → easy scaling

Collision-free short code generation

Industry-standard system design patterns

🏫 Academic & Placement Relevance (VIT)

This project demonstrates:

Distributed systems fundamentals

Scalable backend design

Caching strategies

Real-world system design (TinyURL / Bitly style)

Suitable for:

VIT academic project submissions

Placement interviews

Resume & GitHub portfolio

👨‍💻 Author

Built as a hands-on backend & system design project with real-world scalability considerations.
