module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: "#1A1A1A", // cinema-dark
        secondary: "#2D2D2D", // content-separator
        accent: "#D4AF37", // golden-highlights
        
        // Background Colors
        background: "#0F0F0F", // deep-canvas
        surface: "#252525", // card-backgrounds
        
        // Text Colors
        "text-primary": "#FFFFFF", // clear-readability
        "text-secondary": "#B8B8B8", // hierarchy-text
        
        // Status Colors
        success: "#4CAF50", // green-500
        warning: "#FF9800", // orange-500
        error: "#F44336", // red-500
        
        // Cinema Noir Warmth Palette Extensions
        "cinema-dark": "#1A1A1A", // primary-dark
        "content-separator": "#2D2D2D", // secondary-dark
        "golden-highlights": "#D4AF37", // accent-gold
        "deep-canvas": "#0F0F0F", // background-deep
        "card-backgrounds": "#252525", // surface-elevated
        "clear-readability": "#FFFFFF", // text-primary-white
        "hierarchy-text": "#B8B8B8", // text-secondary-gray
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Source Sans Pro', 'sans-serif'], // Default body font
        serif: ['Playfair Display', 'serif'], // Accent font
      },
      fontWeight: {
        'inter-regular': '400',
        'inter-medium': '500',
        'inter-semibold': '600',
        'inter-bold': '700',
        'source-regular': '400',
        'source-semibold': '600',
        'playfair-regular': '400',
        'playfair-bold': '700',
      },
      boxShadow: {
        'elevation': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'dramatic': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'theater-lighting': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'hero-elements': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      borderColor: {
        'subtle': 'rgba(255, 255, 255, 0.1)',
        'light-border': 'rgba(255, 255, 255, 0.1)',
      },
      transitionDuration: {
        '200': '200ms', // micro-interactions
        '300': '300ms', // standard transitions
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}