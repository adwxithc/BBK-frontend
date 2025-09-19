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
    gradient: 'from-secondary-200 to-warm-300'
  },
  
  // Warm comfort colors
  warm: {
    light: '#fef7ed', // warm-50
    main: '#f19332',  // warm-400
    dark: '#b84708',  // warm-700
  },
  
  // Soft pastel colors for playfulness
  soft: {
    pink: '#fce7f3',    // soft-pink
    purple: '#f3e8ff',  // soft-purple
    blue: '#dbeafe',    // soft-blue
    mint: '#d1fae5',    // soft-mint
    peach: '#fed7aa',   // soft-peach
  },
  
  // Neutral colors
  neutral: {
    background: '#fafcfe', // background
    surface: '#f1f5f9',    
    border: '#e2e8f0',     
    text: '#334155',       
    muted: '#64748b',      
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
    about: 'bg-gradient-to-br from-secondary-400 via-secondary-100 to-warm-100',
    section: 'bg-gradient-to-r from-background to-secondary-50',
    card: 'bg-white/60 backdrop-blur-sm border border-white/40',
  },
  
  // Floating elements - using corrected color names
  floating: {
    shapes: [
      'bg-secondary-200/30',
      'bg-soft-pink/50',
      'bg-soft-blue/50', 
      'bg-soft-purple/50',
      'bg-soft-mint/50',
    ],
    hovers: [
      'from-secondary-300/50 to-warm-300/50',
      'from-soft-pink/70 to-soft-purple/70',
      'from-soft-blue/70 to-primary-300/50',
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