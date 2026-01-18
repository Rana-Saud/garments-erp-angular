# Theme System - Quick Reference Guide

## 🎨 Color Variables

### Primary Gradient
```
$primary-gradient-start: #667eea (Indigo)
$primary-gradient-end: #764ba2 (Purple)
```

### Background Colors
```
$bg-primary: #f5f6f8 (Main page background)
$bg-secondary: #ffffff (Cards, modals)
$bg-dark: #1a1a1a (Sidebar)
$bg-lighter: #f8f9fa (Hover states)
```

### Text Colors
```
$text-primary: #1a1a1a (Dark - Main text)
$text-secondary: #6c757d (Gray - Secondary text)
$text-light: #b8bcc4 (Light gray - Sidebar text)
$text-white: #ffffff (White - On dark backgrounds)
```

---

## 📏 Spacing Scale

| Variable | Value | Use Case |
|----------|-------|----------|
| `$spacing-xs` | 4px | Tiny gaps |
| `$spacing-sm` | 8px | Small gaps, icon margins |
| `$spacing-md` | 12px | Padding, margins |
| `$spacing-lg` | 16px | Standard padding |
| `$spacing-xl` | 20px | Section padding |
| `$spacing-2xl` | 25px | Card body padding |

---

## 🔤 Font Sizes

| Variable | Value | Use Case |
|----------|-------|----------|
| `$font-size-xs` | 0.75rem | Extra small text |
| `$font-size-sm` | 0.85rem | Labels, badges |
| `$font-size-base` | 0.95rem | Body text |
| `$font-size-lg` | 1.1rem | Section headings |
| `$font-size-xl` | 1.3rem | Large icons |

---

## 🎯 Status Badge Colors

### Draft (Info Blue)
```scss
Background: $status-draft (#e3f2fd)
Text: $status-draft-text (#1976d2)
Border: $status-draft-border (#90caf9)
```

### Active (Success Green)
```scss
Background: $status-success (#e8f5e9)
Text: $status-success-text (#388e3c)
Border: $status-success-border (#81c784)
```

### Pending (Warning Orange)
```scss
Background: $status-warning (#fff3e0)
Text: $status-warning-text (#f57c00)
Border: $status-warning-border (#ffb74d)
```

### Completed (Secondary Gray)
```scss
Background: $status-secondary (#eeeeee)
Text: $status-secondary-text (#616161)
Border: $status-secondary-border (#bdbdbd)
```

### Cancelled (Danger Red)
```scss
Background: $status-danger (#ffebee)
Text: $status-danger-text (#c62828)
Border: $status-danger-border (#ef5350)
```

---

## 🔨 Mixins - Quick Examples

### Gradient Button
```scss
.myButton {
  @include gradient-primary;
}
// Output: Indigo to Purple gradient background
```

### Primary Button Full
```scss
.myButton {
  @include button-primary;
}
// Output: Gradient bg + hover effect + text color
```

### Small Primary Button
```scss
.myButton {
  @include button-sm-primary;
}
// Output: Small gradient button with scale hover
```

### Danger Button (Red)
```scss
.myButton {
  @include button-sm-danger;
}
// Output: Small red button with scale hover
```

### Custom Scrollbar
```scss
.myDiv {
  @include scrollbar-custom;
}
// Default: Primary color thumb
```

```scss
.myDiv {
  @include scrollbar-custom($primary-dark);
}
// Custom: Dark purple thumb
```

### Card Style
```scss
.myCard {
  @include card-style;
}
// Output: White bg + border-radius + shadow
```

### Badge Style
```scss
.myBadge {
  @include badge-style(#e3f2fd, #1976d2, #90caf9);
}
// Output: Badge with custom colors and border
```

---

## 🎯 Shadow System

| Variable | Value | Use Case |
|----------|-------|----------|
| `$shadow-sm` | 0 2px 8px... | Cards, small elements |
| `$shadow-md` | 0 4px 12px... | Default shadow |
| `$shadow-lg` | 0 8px 24px... | Modal shadows |
| `$shadow-hover` | 0 4px 12px rgba... | Button hovers |

---

## ⚡ Transitions

| Variable | Value | Use Case |
|----------|-------|----------|
| `$transition-default` | all 0.3s ease | General animations |
| `$transition-fast` | all 0.2s ease | Quick interactions |

---

## 🔲 Border Radius

| Variable | Value | Use Case |
|----------|-------|----------|
| `$border-radius-sm` | 4px | Buttons, badges |
| `$border-radius-md` | 8px | Cards, inputs |
| `$border-radius-lg` | 12px | Large cards, modals |

---

## 📝 Import Template for New Components

```scss
@import "../../theme.scss";

.myComponent {
  // Colors
  background-color: $bg-secondary;
  color: $text-primary;
  border: 1px solid $border-light;
  
  // Spacing
  padding: $spacing-lg;
  margin-bottom: $spacing-md;
  gap: $spacing-sm;
  
  // Typography
  font-size: $font-size-base;
  
  // Styling
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;
  transition: $transition-default;
  
  &:hover {
    box-shadow: $shadow-md;
  }
}

.myButton {
  @include button-primary;
}
```

---

## ✅ Components Currently Using Theme

- ✅ Global Styles
- ✅ Layout
- ✅ Sidebar
- ✅ CPO List

## 🚀 Next Steps

When creating new components:
1. Import `@import "../../theme.scss"` (adjust path based on location)
2. Replace all hardcoded colors with `$variable-names`
3. Use mixins for buttons, cards, and badges
4. Follow spacing scale for consistency
5. Use predefined font sizes

---

## 💡 Pro Tips

1. **Always use variables** - Don't hardcode colors
2. **Use mixins** - They encapsulate best practices
3. **Keep it DRY** - Reuse variables across components
4. **Check existing colors** - Before adding new ones
5. **Update theme.scss** - Not individual component files
6. **Use meaningful names** - Variables describe their purpose
