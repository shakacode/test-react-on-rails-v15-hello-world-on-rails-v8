// import statement added by react_on_rails:generate_packs rake task
import "./../generated/server-bundle-generated.js"
// Server-side rendering bundle for React on Rails
// This file is required by the webpack configuration

// todo: check next line is correct
import ReactOnRails from 'react-on-rails/client';

// Import server-side components if using SSR
// For now, this is a minimal bundle to satisfy webpack config

console.log('Server bundle loaded for SSR');
