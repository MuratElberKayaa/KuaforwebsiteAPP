/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
        card: {
          DEFAULT: 'var(--color-card)',
          hover: 'var(--color-card-hover)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          dark: 'var(--color-border-dark)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          light: 'var(--color-muted-light)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
        },
        dark: {
          DEFAULT: '#12100E',
          surface: '#1A1715',
          card: '#221F1C',
          border: '#332E2A',
        },
        success: {
          DEFAULT: '#2E7D32',
          light: '#EBF6EC',
          foreground: '#1B4D20',
        },
        warning: {
          DEFAULT: '#C27803',
          light: '#FEF8EB',
          foreground: '#7C4D02',
        },
        error: {
          DEFAULT: '#B3261E',
          light: '#FDF2F2',
          foreground: '#601410',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5.5vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h1': ['clamp(2.25rem, 4.2vw, 3.5rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'h2': ['clamp(1.75rem, 3.2vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h3': ['clamp(1.25rem, 2.2vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h4': ['1.1875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['0.9688rem', { lineHeight: '1.6' }],
        'small': ['0.8438rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.22em' }],
      },
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4.5rem',    // 72px
        'section': 'clamp(4rem, 8vw, 7.5rem)', // Editorial section spacing
      },
      borderRadius: {
        'none': '0px',
        'sm': '3px',
        'md': '6px',
        'lg': '12px',
        'xl': '18px',
        'pill': '9999px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -1px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.02)',
        'card': '0 12px 32px -8px rgba(28, 25, 23, 0.07), 0 3px 8px -2px rgba(28, 25, 23, 0.03)',
        'card-hover': '0 20px 48px -12px rgba(28, 25, 23, 0.12), 0 6px 16px -4px rgba(28, 25, 23, 0.04)',
        'floating': '0 24px 64px -16px rgba(28, 25, 23, 0.18), 0 8px 24px -6px rgba(28, 25, 23, 0.08)',
        'glow-gold': '0 0 32px -4px rgba(197, 168, 128, 0.45)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.7)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'toast': '1070',
        'tooltip': '1080',
      },
      maxWidth: {
        'editorial': '1440px',
        'prose-editorial': '68ch',
      }
    },
  },
  plugins: [],
};

