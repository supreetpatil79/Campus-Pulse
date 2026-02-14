export const tokens = {
    colors: {
        dark: '#0A0A0F',
        light: '#FFFFFF',
        red: '#D81921',
        'secondary-light': 'rgba(255, 255, 255, 0.5)',
    },
    spacing: {
        0.5: 2,
        1: 4,
        1.5: 6,
        2: 8,
        3: 12,
        4: 16,
        5: 20,
        6: 24,
        8: 32,
    } as Record<number, number>,
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        '2xl': 20,
        full: 9999,
    },
    textStyles: {
        ndotHeadlineXSmall: {
            fontWeight: '600' as const,
            letterSpacing: 1.5,
            textTransform: 'uppercase' as const,
        },
        ndotHeadlineMedium: {
            fontWeight: '700' as const,
            letterSpacing: 0.5,
        },
        bodySmall: {
            fontWeight: '400' as const,
        },
        bodyMedium: {
            fontWeight: '400' as const,
            fontSize: 14,
            lineHeight: 20,
        },
        labelUppercasedSmall: {
            fontWeight: '600' as const,
            letterSpacing: 1,
            textTransform: 'uppercase' as const,
        },
    },
};
