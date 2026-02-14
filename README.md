# Campus Pulse

A React Native widget-style app for college students who are always running between classes, losing track of time, and forgetting what the professor said five minutes ago.

Built with Expo. Runs on both iOS and Android.

## What it does

Campus Pulse sits on your phone and does a few things really well:

- **Class mode** — shows how many minutes before you need to leave, pulls live lecture summaries, and keeps you focused with a glyph-based pulse indicator
- **Away mode** — flips to show your next class, time, and room number so you're not scrambling to check your schedule between buildings
- **Rain alerts** — if it's raining and you need to leave soon, the app pulses a warning with haptic feedback so you don't get caught without an umbrella
- **Magic Summarize** — one tap to get a quick bullet-point breakdown of what's being covered in class right now
- **Battery saver** — auto-kicks in when you're on campus and running low, because your phone always dies at 2pm
- **Mute toggle** — quick silence everything when you walk into a lecture hall

## Tech stack

- React Native + Expo
- TypeScript
- `expo-blur` for the glassmorphic overlay
- Custom design tokens (`src/styles/tokens`) for consistent theming
- Animated API for transitions and pulse effects
- Vibration API for weather alerts

## Getting started

```bash
# clone it
git clone https://github.com/supreetpatil79/Campus-Pulse.git
cd Campus-Pulse

# install deps
npm install

# run it
npx expo start
```

Scan the QR code with Expo Go on your phone, or press `i` for iOS simulator / `a` for Android emulator.

## Project structure

```
├── App.tsx              # main entry — class mode, away mode, all the core logic
├── src/
│   └── styles/
│       └── tokens.ts    # design tokens — colors, spacing, typography
├── package.json
└── app.json
```

## How it works

The app has two modes that you can switch between with a tap:

**Class Mode** is where you'll spend most of your time. it tracks a countdown for when to leave, shows a live recording indicator (glyph pulse), and renders a scrollable summary feed of lecture highlights. The rain alert system uses `Animated.loop` to create a pulsing opacity effect paired with haptic vibration patterns.

**Away Mode** is dead simple — just shows your next class info at a glance. Time, building, room number. That's it.

Battery management runs as a side effect — if you're on campus and below 20%, it flips on automatically. No manual intervention needed.

## Screenshots

_coming soon — still iterating on the UI_

## Why I built this

I kept showing up late to class, forgetting what was said in the last lecture, and letting my phone die mid-day. So I built the thing I wished I had. Nothing fancy, just useful.

## Contributing

Open an issue or PR if you want to help out. The codebase is pretty small right now so it's easy to jump in.

## License

MIT
