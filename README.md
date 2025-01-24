# Crypto Calculator Frontend

Crypto Calculator is a desktop-only React + TypeScript application designed for cryptocurrency enthusiasts. The tool allows users to create wallets, add crypto assets, track profits/losses, analyze price charts, and view detailed market data.

## Features

### Screenshots of app:

![Zrzut ekranu 2025-01-22 110013](https://github.com/user-attachments/assets/8419f70a-bfbe-4e1c-86b4-189985bdad4c)
![Zrzut ekranu 2025-01-22 110019](https://github.com/user-attachments/assets/d99b9a78-b367-487d-b0d6-6a5a45668159)
![Zrzut ekranu 2025-01-24 105055](https://github.com/user-attachments/assets/a2a231db-b804-4771-a4fa-831f06e0c653)

### Core Functionality

- **Wallet Management**

  - Create up to 3 wallets.
  - Add crypto assets by specifying buy price, amount, and market (e.g., Binance).
  - Remove wallets.

- **Asset Tracking**

  - Track individual crypto assets' profit/loss.
  - Analyze total spending on specific cryptos and across all assets.
  - View buy history for each asset.

- **Chart Analysis**

  - Display price trends for assets in three intervals: **day**, **week**, and **month**.
  - Carousel showing trending crypto charts.

- **Market Data**
  - Table of top 10 cryptocurrencies with detailed stats.

### Technical Choices

- **Desktop-Only Design**: The use case focuses on desktop users for better data analysis.
- **React + TypeScript**: Enables a robust and scalable architecture.
- **State Management**: Context API to avoid prop drilling for wallet data.
- **Axios**: Simplifies API requests to the backend.
- **Charting**: Used `react-charts` to create interactive and visually appealing charts.
- **Forms and Tables**: Utilized `tanstack/form` and `tanstack/table` to learn and leverage their capabilities.
- **Styling**: Vanilla CSS with color variables for clean and maintainable styles.

## Tech Stack

- **Frontend**: React + TypeScript
- **Libraries**:
  - `react-charts` for chart rendering.
  - `tanstack/form` for asset form handling.
  - `tanstack/table` for the top 10 cryptocurrencies table.
  - `react-slick` for the carousel displaying trending crypto charts.
  - `axios` for backend API interactions.
- **Styling**: Vanilla CSS with CSS variables.

## Backend Integration

The backend for this application is located in the [crypto-calculator-backend](#) repository. It performs the following tasks:

- Calculating profit/loss for individual and total assets.
- Fetching asset details from markets like Binance.
- Providing historical data for charts and buy history.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/your-username/crypto-calculator.git
```

2. Navigate to the project directory:

```bash
    cd crypto-calculator
```

3. Install dependencies:

```bash
    npm install
```

4. Create .env file with variable:

```json
VITE_BACKEND_ADDRESS = http://localhost:3000
```

4. Run app:

```bash
    npm run dev
```

## Backend Setup

Refer to the crypto-calculator-backend repository for instructions.

## Future Improvements

- Add support for multiple tabs and additional navigation features.
- Expand mobile responsiveness for broader usability.
- Integrate additional markets and APIs for enhanced data coverage.
- Implement user authentication for secure wallet access.

## Enjoy
