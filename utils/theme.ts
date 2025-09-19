// Theme color utilities for Bunny Babies Kindergarten
export const theme = {
  // Primary brand colors (Green theme)
  primary: {
    light: '#ddf2c7', // primary-100
    main: '#7cbd1e',  // primary-500
    dark: '#4d7a11',  // primary-700
    gradient: 'from-primary-500 via-primary-400 to-secondary-400'
  },
  
  // Secondary accent colors (Yellow theme)
  secondary: {
    light: '#fef9c3', // secondary-100
    main: '#f1f864',  // secondary-400
    dark: '#ca8a04',  // secondary-600
    gradient: 'from-secondary-200 to-theme-warm-300'
  },
  
  // Warm comfort colors
  warm: {
    light: '#fef7ed', // theme-warm-50
    main: '#f19332',  // theme-warm-400
    dark: '#b84708',  // theme-warm-700
  },
  
  // Soft pastel colors for playfulness
  soft: {
    pink: '#fce7f3',
    purple: '#f3e8ff',
    blue: '#dbeafe',
    mint: '#d1fae5',
    peach: '#fed7aa',
  },
  
  // Neutral colors
  neutral: {
    background: '#fafcfe', // theme-neutral-50
    surface: '#f1f5f9',    // theme-neutral-100
    border: '#e2e8f0',     // theme-neutral-200
    text: '#334155',       // theme-neutral-700
    muted: '#64748b',      // theme-neutral-500
  },
  
  // Status colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
} as const;

// Kindergarten-specific color combinations
export const colorCombinations = {
  // Button variations
  buttons: {
    primary: 'bg-white text-primary-500 hover:bg-secondary-100',
    secondary: 'border-2 border-white text-white hover:bg-white hover:text-primary-500',
    accent: 'bg-secondary-400 text-primary-700 hover:bg-secondary-300',
  },
  
  // Background gradients
  backgrounds: {
    hero: 'bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-400',
    about: 'bg-gradient-to-br from-secondary-400 via-secondary-100 to-theme-warm-100',
    section: 'bg-gradient-to-r from-theme-neutral-50 to-secondary-50',
    card: 'bg-white/60 backdrop-blur-sm border border-white/40',
  },
  
  // Floating elements
  floating: {
    shapes: [
      'bg-secondary-200/30',
      'bg-theme-soft-pink/50',
      'bg-theme-soft-blue/50',
      'bg-theme-soft-purple/50',
      'bg-theme-soft-mint/50',
    ],
    hovers: [
      'from-secondary-300/50 to-theme-warm-300/50',
      'from-theme-soft-pink/70 to-theme-soft-purple/70',
      'from-theme-soft-blue/70 to-primary-300/50',
      'from-primary-300/50 to-secondary-300/50',
    ]
  }
} as const;

// Helper functions
export const getThemeColor = (path: string) => {
  return path.split('.').reduce((obj: any, key) => obj?.[key], theme);
};

export const getRandomFloatingColor = () => {
  const colors = colorCombinations.floating.shapes;
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomHoverColor = () => {
  const colors = colorCombinations.floating.hovers;
  return colors[Math.floor(Math.random() * colors.length)];
};