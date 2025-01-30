# Welcome to Musayer 🎵

Musayer is a mobile platform for music enthusiasts to **discover, share, and discuss music**. Designed as a **social music diary**, it allows users to write and share thoughts, experiences, and opinions about songs they listen to.

Built with **React Native** and **Expo**, Musayer bridges the gap between social networking and music discovery, fostering a community of listeners, musicians, and critics.

> **Note:** This project is a college requirement for the course _DCIT 26: Application Development and Emerging Technologies_ at Cavite State University.

---

## Features 🚀

- **User Authentication**: Secure signup and login.
- **Profiles**: Personal pages with user details and posts.
- **Timeline & Feed**: Discover posts from other music lovers.
- **Music Search**: Find songs and albums to add notes.
- **Compose Notes**: Share reviews, thoughts, and recommendations.

## Get Started 💻

### Prerequisites

Make sure you have the following installed:

- [Node.js (v18.x or above)](https://nodejs.org/)
- [npm (v9.x or above)](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/musayer.git
   cd musayer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npx expo start
   ```
4. Open the app in:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go)

### Environment Variables Setup 🌍

Musayer requires environment variables for **Spotify Web API** and **Supabase** configuration.

Create a `.env.local` file in the root directory and add:

```env
# Spotify Web API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Reset the Project

If you need a fresh start, run:

```bash
npm run reset-project
```

This will move the starter code to `app-example/` and create a blank `app/` directory.

---

## Future Improvements 🛠️

- **Follow System**: Follow users and personalize your feed.
- **Likes & Comments**: Engage with posts through reactions.
- **Music Recommendations**: AI-driven suggestions based on listening habits.
- **Dark Mode**: Theme switching based on device settings.

---

## Learn More 📖

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)

## Join the Community 🌎

- [GitHub](https://github.com/your-repo/musayer)
- [Expo Discord](https://chat.expo.dev)

🎧 Happy Music Sharing! 🚀
