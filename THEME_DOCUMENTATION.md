# Garments ERP Theme System

## Overview
This application uses a consistent, centralized theme system to maintain uniform styling across all components. All colors, spacing, typography, and styling is defined in a single `theme.scss` file.

## Theme File Location
`src/theme.scss` - Main theme configuration file

## How to Use Theme Variables

### 1. Import in SCSS Files
```scss
@import "../../theme.scss";
```

### 2. Using Variables

#### Colors
```scss
.myClass {
  color: $text-primary;              // Dark text
  background-color: $bg-primary;     // Light background
  border: 1px solid $border-light;   // Light border
}
```

#### Spacing
```scss
.myClass {
  padding: $spacing-md;              // 12px
  margin: $spacing-lg;               // 16px
  gap: $spacing-sm;                  // 8px
}
```

#### Font Sizes
```scss
.myClass {
  font-size: $font-size-sm;          // 0.85rem
  font-size: $font-size-base;        // 0.95rem
  font-size: $font-size-lg;          // 1.1rem
}
```

### 3. Using Mixins

#### Gradient Primary
```scss
.myButton {
  @include gradient-primary;
}
```

#### Button Styles
```scss
.myButton {
  @include button-primary;           // Full button with gradient
  @include button-sm-primary;        // Small button
  @include button-sm-danger;         // Small danger button
}
```

#### Scrollbar
```scss
.myScrollableDiv {
  @include scrollbar-custom;         // Uses primary color
  @include scrollbar-custom($primary-dark);  // Custom color
}
```

#### Card Style
```scss
.myCard {
  @include card-style;
}
```

#### Badge Style
```scss
.myBadge {
  @include badge-style($bg-color, $text-color, $border-color);
}
```

## Color Palette

### Primary Colors
- `$primary-gradient-start`: #667eea (Indigo)
- `$primary-gradient-end`: #764ba2 (Purple)
- `$primary-color`: #667eea
- `$primary-dark`: #764ba2

### Background Colors
- `$bg-primary`: #f5f6f8 (Light gray)
- `$bg-secondary`: #ffffff (White)
- `$bg-dark`: #1a1a1a (Very dark)
- `$bg-lighter`: #f8f9fa (Very light)

### Text Colors
- `$text-primary`: #1a1a1a (Dark)
- `$text-secondary`: #6c757d (Gray)
- `$text-light`: #b8bcc4 (Light gray)
- `$text-white`: #ffffff (White)

### Status Colors
- **Draft**: Info Blue (#e3f2fd background)
- **Active**: Success Green (#e8f5e9 background)
- **Pending**: Warning Orange (#fff3e0 background)
- **Completed**: Secondary Gray (#eeeeee background)
- **Cancelled**: Danger Red (#ffebee background)

## Spacing System
- `$spacing-xs`: 4px
- `$spacing-sm`: 8px
- `$spacing-md`: 12px
- `$spacing-lg`: 16px
- `$spacing-xl`: 20px
- `$spacing-2xl`: 25px

## Typography
- `$font-size-xs`: 0.75rem
- `$font-size-sm`: 0.85rem (Labels, badges)
- `$font-size-base`: 0.95rem (Body text)
- `$font-size-lg`: 1.1rem (Headings)
- `$font-size-xl`: 1.3rem (Large icons)

## Component Examples

### Sidebar
Uses theme variables for:
- `$sidebar-bg`: Dark background
- `$sidebar-text`: Light text
- `$sidebar-active`: Primary color for active state
- Gradient header with primary colors

### CPO List Table
- Gradient header using primary colors
- Custom scrollbar with primary color
- Status badges with themed colors
- Buttons with theme colors and mixins

### Buttons
- Primary buttons with gradient
- Danger buttons with red theme
- Consistent spacing and sizing

## Modifying Theme
To change the theme globally:
1. Edit `/src/theme.scss`
2. Modify any color, spacing, or typography variable
3. Changes apply automatically to all components

## Best Practices
1. Always use theme variables instead of hardcoded colors
2. Use mixins for common patterns (buttons, cards, scrollbars)
3. Import theme at the top of component SCSS files
4. Use meaningful variable names
5. Keep spacing consistent using the spacing system

## Current Application Structure Using Theme

### Files Using Theme
- `src/styles.scss` - Global styles
- `src/app/layout/layout.scss` - Main layout
- `src/app/layout/sidebar/sidebar.scss` - Sidebar navigation
- `src/app/modules/cpo-list/cpo-list.scss` - CPO list table

### Consistent Elements
- ✅ Sidebar with fixed positioning and gradient header
- ✅ Content area with custom scrollbar
- ✅ Table with gradient header and themed scrollbar
- ✅ Buttons with primary/danger theme colors
- ✅ Badges with status-specific colors
- ✅ Consistent spacing and typography

## Future Components
When creating new components, remember to:
1. Import `@import "../../theme.scss"` (adjust path)
2. Use theme variables for all styling
3. Use mixins for common patterns
4. Follow the established color and spacing system
