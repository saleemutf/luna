/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here if needed
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'], // Example: match default Vite font
      },
      boxShadow: {
        'top': '0 -2px 5px -1px rgba(0, 0, 0, 0.06), 0 -2px 4px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'), // Example: if you want to use Tailwind Forms plugin
    function ({ addUtilities }) { // For custom scrollbar utilities if not using a plugin
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-gray-300::WebkitScrollbarThumb': {
          'background-color': '#D1D5DB', /* gray-300 */
          'border-radius': '4px',
        },
        '.scrollbar-thumb-gray-300:hover::WebkitScrollbarThumb': {
          'background-color': '#9CA3AF', /* gray-400 on hover */
        },
        '.scrollbar-track-gray-100::WebkitScrollbarTrack': {
          'background-color': '#F3F4F6', /* gray-100 */
        },
        // Dark mode scrollbars (example for .bg-gray-800 equivalent backgrounds)
        '.scrollbar-thumb-gray-600::WebkitScrollbarThumb': {
            'background-color': '#4B5563', /* gray-600 */
            'border-radius': '4px',
        },
        '.scrollbar-thumb-gray-600:hover::WebkitScrollbarThumb': {
            'background-color': '#374151', /* gray-700 on hover */
        },
        '.scrollbar-track-gray-800::WebkitScrollbarTrack': {
            'background-color': '#1F2937', /* gray-800 */
        },
      })
    }
  ],
} 