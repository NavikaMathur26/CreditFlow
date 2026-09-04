# CreditFlow — Digital Payments Without A Bank Account

CreditFlow is a modern, mobile-first fintech web application that empowers users to send, receive, and manage digital credits and payments using only their mobile number — eliminating the requirement of a traditional bank account.

## Features

- **Mobile-First Identity**: Every phone number acts as a cryptographically bound digital payment identity.
- **Seamless Onboarding & Verification Portal**: A guided 7-step verification workflow featuring:
  - Mobile OTP confirmation
  - Basic details with automated minor age detection
  - Multi-document identity verification (Aadhaar, PAN, Driving License, Student ID)
  - Duplicate account checking
  - Mandatory Guardian verification for minors (ages 13–17)
  - Device and SIM binding simulation
  - Secure Payment PIN configuration
- **User Dashboard**:
  - Full-screen fintech portal interface
  - Send Money with recipient lookup and transfer receipts
  - Receive Money with dedicated high-contrast QR code and payment handle
  - Real-time transaction history with categorization and search filters
  - Security center with two-step verification, PIN management, and trusted devices
  - Personal profile with custom avatar upload, contact information, and KYC verification status
  - 24/7 Help & Support with live ticketing and interactive FAQs

## Tech Stack

- **Framework**: React 19, Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
