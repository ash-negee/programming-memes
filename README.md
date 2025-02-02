# Programming Memes App

A React application that fetches and displays programming-related memes using the Programming Memes API. The app includes features like timed loading, error handling, and infinite scrolling capabilities.

## Features

- Fetch and display programming memes from an external API
- Automatic loading of new memes every 65 seconds
- Responsive image display
- Error handling and loading states
- Bootstrap-based UI components
- TypeScript support for better type safety

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- A RapidAPI key for the Programming Memes API

## Installation

1. Clone the repository:
```bash
git clone git@github.com:ash-negee/programming-memes.git
cd programming-memes
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your RapidAPI key and host:
```env
VITE_API_KEY = 'your_api_key'
VITE_API_HOST = 'your_api_host_rul'
```

## Dependencies

- React
- TypeScript
- axios
- react-bootstrap
- @types/react
- @types/react-dom

## Project Structure

```
src/
  ├── App.tsx          # Main application component
  ├── index.css        # TypeScript interfaces and types
  ├── main.tsx        # TypeScript interfaces and types
  ├── vite-env.d.ts/          # CSS/SCSS files
```

## Usage

To start the development server:

```bash
npm run dev
# or
yarn run dev
```

The application will be available at `http://localhost:port`

## API Integration

The app uses the Programming Memes API from RapidAPI. The API configuration is set up in the `App.tsx` file:

```typescript
const options = {
  method: 'GET',
  url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_YOUR_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_YOUR_API_HOST
  }
};
```

## Features Explanation

### Timer System
- The app implements a 65-second timer between meme loads
- The timer automatically resets when new memes are loaded
- Users can manually load more memes once the timer reaches zero

### Error Handling
- Comprehensive error handling for API failures
- User-friendly error messages
- Loading state indicators

### UI Components
- Responsive image display
- Bootstrap-based styling
- Loading and error state buttons
- Clean and minimal interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Created with 🤍 by Ash

## Troubleshooting

If you encounter any issues:

1. Ensure your RapidAPI key is valid and properly configured
2. Check your Node.js version is compatible
3. Clear your browser cache and node_modules folder
4. Reinstall dependencies
5. Check the console for any error messages

## Additional Notes

- The app uses TypeScript for better type safety and development experience
- Bootstrap is used for responsive design and UI components
- The app implements infinite scrolling pattern for better user experience
