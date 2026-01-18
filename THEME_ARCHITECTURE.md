# Theme System Architecture

## File Structure

```
germents-frontend/
├── src/
│   ├── theme.scss                    ← CENTRAL THEME FILE
│   ├── styles.scss                   ← Global styles (imports theme)
│   ├── main.ts
│   ├── index.html
│   ├── app/
│   │   ├── app.ts
│   │   ├── layout/
│   │   │   ├── layout.html
│   │   │   ├── layout.scss           ← Uses theme
│   │   │   ├── layout.ts
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.html
│   │   │   │   ├── sidebar.scss      ← Uses theme
│   │   │   │   └── sidebar.ts
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   ├── modules/
│   │   │   ├── cpo-form/
│   │   │   ├── cpo-list/
│   │   │   │   ├── cpo-list.html
│   │   │   │   ├── cpo-list.scss    ← Uses theme
│   │   │   │   └── cpo-list.ts
│   │   │   ├── process-form/
│   │   │   ├── process-list/
│   │   │   └── ...
│   │   └── shared/
│   └── public/
├── THEME_DOCUMENTATION.md             ← Full documentation
├── THEME_SUMMARY.md                   ← Implementation summary
├── THEME_QUICK_REFERENCE.md           ← Quick reference guide
└── angular.json
```

---

## How Theme System Works

```
┌─────────────────────────────────────────────┐
│          theme.scss (CENTRAL)               │
│  • Color variables                          │
│  • Spacing system                           │
│  • Typography scale                         │
│  • SCSS Mixins                              │
│  • Design tokens                            │
└────────────┬────────────────────────────────┘
             │
             │ @import "../../theme.scss"
             │
             ├──────────────────────────┬──────────────┬────────────────┐
             │                          │              │                │
             ▼                          ▼              ▼                ▼
        ┌─────────┐          ┌──────────────┐    ┌─────────────┐  ┌──────────┐
        │ styles  │          │ layout.scss  │    │sidebar.scss │  │cpo-list  │
        │ .scss   │          │              │    │             │  │.scss     │
        └─────────┘          └──────────────┘    └─────────────┘  └──────────┘
             │                     │                    │              │
             ▼                     ▼                    ▼              ▼
        Global                 Main Layout        Sidebar         CPO List
        Styles                 Styles             Styles          Styles
```

---

## Theme Variables by Category

### Colors (4 Categories)

**Primary & Secondary**
```scss
$primary-gradient-start, $primary-gradient-end
$primary-color, $primary-dark
$secondary-color, $secondary-light
```

**Backgrounds**
```scss
$bg-primary, $bg-secondary, $bg-dark, $bg-lighter, $bg-overlay
```

**Text**
```scss
$text-primary, $text-secondary, $text-light, $text-white
```

**Borders**
```scss
$border-light, $border-dark, $border-primary
```

**Sidebar**
```scss
$sidebar-bg, $sidebar-border, $sidebar-text, $sidebar-hover, $sidebar-active
```

**Status** (5 statuses with color sets)
```scss
$status-draft, $status-draft-text, $status-draft-border
$status-success, $status-success-text, $status-success-border
... (and others)
```

### Spacing System

```scss
$spacing-xs    (4px)
$spacing-sm    (8px)
$spacing-md    (12px)
$spacing-lg    (16px)
$spacing-xl    (20px)
$spacing-2xl   (25px)
```

### Typography

```scss
$font-size-xs   (0.75rem)
$font-size-sm   (0.85rem)
$font-size-base (0.95rem)
$font-size-lg   (1.1rem)
$font-size-xl   (1.3rem)
```

### Effects

```scss
$shadow-sm, $shadow-md, $shadow-lg, $shadow-hover
$transition-default, $transition-fast
$border-radius-sm, $border-radius-md, $border-radius-lg
```

---

## Mixins by Purpose

### Styling Mixins

| Mixin | Purpose | Output |
|-------|---------|--------|
| `gradient-primary` | Apply gradient | Linear gradient bg |
| `button-primary` | Full button | Gradient + hover + text |
| `button-sm-primary` | Small primary | Small gradient button |
| `button-sm-danger` | Small danger | Small red button |
| `scrollbar-custom` | Custom scroll | Themed scrollbar |
| `card-style` | Card wrapper | White box with shadow |
| `badge-style` | Badge display | Colored badge with border |

---

## Consistency Across Components

### Sidebar Consistency
```
Background:  $sidebar-bg (#1a1a1a)
Text:        $sidebar-text (#b8bcc4)
Icons:       $primary-color (#667eea)
Active:      Gradient primary
Hover:       $sidebar-hover (#2a2a2a)
Scrollbar:   $primary-color
```

### Content Area Consistency
```
Background:  $bg-primary (#f5f6f8)
Padding:     $spacing-xl (20px)
Scrollbar:   $primary-color
Text:        $text-primary (#1a1a1a)
```

### Table Consistency
```
Header BG:   Gradient primary
Header Text: $text-white
Border:      $border-light (#e9ecef)
Hover:       $bg-lighter (#f8f9fa)
Scrollbar:   $primary-color
Badges:      Themed by status
```

### Button Consistency
```
Primary:     Gradient with hover effect
Danger:      Red (#ef5350) with hover
Small:       $spacing-md padding
Text:        Always white
Hover:       Transform + shadow
```

---

## Implementation Workflow

### For New Component

```
1. Create component files (component.scss, component.html, component.ts)
   
2. At top of component.scss:
   @import "../../theme.scss";
   
3. Replace hardcoded values:
   ❌ color: #667eea;
   ✅ color: $primary-color;
   
4. Use mixins for complex patterns:
   ✅ @include button-primary;
   ✅ @include card-style;
   
5. Use spacing system:
   ✅ padding: $spacing-md;
   ✅ margin: $spacing-lg;
   
6. Test consistency:
   ✅ Colors match theme
   ✅ Spacing is proportional
   ✅ Typography scales correctly
```

---

## Benefits Summary

| Benefit | Impact |
|---------|--------|
| **Single Source of Truth** | One file to update for global changes |
| **Consistency** | All components look unified |
| **Maintainability** | Easy to understand, modify, scale |
| **Reusability** | Mixins prevent code duplication |
| **Professional** | Coherent, polished appearance |
| **Performance** | No redundant style definitions |
| **Scalability** | Simple to add new components |
| **Documentation** | Clear guidelines for future devs |

---

## Quick Stats

- **Total Variables**: 40+
- **Total Mixins**: 7
- **Files Using Theme**: 5+
- **Components Styled**: All major components
- **Color Palette**: Carefully curated 10+ colors
- **Spacing Levels**: 6 (xs to 2xl)
- **Font Sizes**: 5 predefined sizes

---

## Future Enhancements

- [ ] Dark mode theme variant
- [ ] Additional color palettes
- [ ] Animation library mixins
- [ ] Responsive breakpoint variables
- [ ] Component-specific theme variations
- [ ] CSS custom properties export
- [ ] Theme switcher component
