# HabitFire 🔥
### Build habits. Maintain streaks. Become consistent.

HabitFire is a habit-tracking web application designed to help users build healthy routines, track daily activities, and stay consistent with their personal goals. It provides a central dashboard for managing habits and monitoring progress over time.

## About the Project

Building a habit takes consistency, and keeping track of progress can be difficult without a structured system. HabitFire helps users organise their daily habits, monitor streaks, and review their activity through a clean, interactive interface.

The application brings habit management, progress tracking, and visual summaries together in one place.

## Features

- **Habit Management:** View and manage daily habits through a dedicated interface.
- **Streak Tracking:** Monitor consistency and follow progress across habit streaks.
- **Daily Activity Log:** Review habit activity through a daily logging interface.
- **Weekly Overview:** Examine habit progress across the week.
- **Monthly History:** Review activity over a monthly calendar.
- **Statistics Dashboard:** View summaries of habit progress and performance.
- **Authentication:** Support for user authentication using the configured authentication service.
- **Theme Customisation:** Switch between supported interface themes.
- **Responsive Interface:** Access the application across supported screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Application framework and routing |
| React | Component-based user interface |
| TypeScript | Type-safe application development |
| Tailwind CSS | Styling and responsive layouts |
| shadcn/ui | Reusable interface components |
| Firebase | Backend services, as configured |
| npm | Package management |

## Application Structure

```text
HabitFire_Next/
├── app/
│   ├── daily-log/
│   ├── habits/
│   ├── login/
│   ├── monthly/
│   ├── stats/
│   ├── weekly/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── hooks/
├── lib/
├── public/
├── styles/
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/leemataniea09/HabitFire_Next.git
```

**2. Open the project directory**

```bash
cd HabitFire_Next
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Use the provided `.env.example` file to identify the environment variables required by the application. Create your local `.env.local` file and configure the necessary values.

Never commit real credentials or private keys.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

The project contains the following application pages:

| Route | Purpose |
|---|---|
| `/` | Main dashboard |
| `/habits` | Habit management |
| `/daily-log` | Daily activity logging |
| `/weekly` | Weekly progress |
| `/monthly` | Monthly history |
| `/stats` | Habit statistics |
| `/login` | Authentication interface |

## Environment Configuration

The application may require Firebase configuration and authentication-related environment variables.

Check `.env.example` for the exact variable names and configure them locally before running the application.

Do not upload populated environment files containing private credentials.

## Future Improvements

Potential improvements include:

- Habit reminders and notifications.
- Customisable habit goals and schedules.
- Advanced progress charts and analytics.
- Data export and backup.
- Improved accessibility and keyboard navigation.
- Additional personalisation options.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Implement and test your changes.
4. Submit a pull request describing your improvements.

## License

No license has been specified for this project yet.

## Author

**Taniea**

GitHub: [@leemataniea09](https://github.com/leemataniea09)

---

*HabitFire helps you keep track of the small, consistent actions that support your goals.*
