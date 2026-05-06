# 💎 EAOverseas Master Design System

This document defines the unified design language for EAOverseas. Adhering to these tokens ensures a premium, state-of-the-art interface across all modules (University, Super Admin, and Student portals).

---

## 🎨 Color Palette
Used curated, harmonious colors from the Google Material 3 (M3) palette.

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Primary** | `#0053cd` | Brand color, primary actions, active tabs. |
| **Primary Container** | `#dae2ff` | Backgrounds for primary icons/widgets. |
| **Background** | `#faf8ff` | Root layout background. |
| **Surface** | `#ffffff` | Cards, sidebars, modal surfaces. |
| **Text Primary** | `#191b23` | Headings, titles, high-emphasis text. |
| **Text Secondary** | `#616f89` | Subtext, labels, and descriptions. |
| **Outline** | `#e5e7eb` | Subtle borders, dividers, separators. |
| **Success** | `#1a8a3d` | Status: Active, Published, Verified. |
| **Error** | `#ba1a1a` | Status: Expired, Blocked, Action Required. |
| **Warning** | `#9b3e00` | Status: Pending, Reviewing. |

---

## 🔡 Typography System
**Font Family:** `'Public Sans', sans-serif` (Google Fonts)

| Level | Size | Weight | Case | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero)** | `1.875rem` | 900 (Black) | Sentence | `-0.02em` | Main section titles. |
| **Headline** | `1.25rem` | 800 (ExtraBold) | Sentence | `-0.01em` | Card titles, modal headers. |
| **Label (Caps)** | `0.65rem` | 900 (Black) | **UPPERCASE** | `0.15em` | Metadata tags, status labels. |
| **Body (Medium)** | `0.875rem` | 500 (Medium) | Sentence | `normal` | Descriptions, inputs. |
| **Label (Bold)** | `0.75rem` | 700 (Bold) | **UPPERCASE** | `0.1em` | Button text, form labels. |

---

## 📐 Layout & Spacing
*   **Standard Border Radius**: `1.5rem` (24px) for cards and modals.
*   **Interactive Radius**: `0.75rem` (12px) for buttons and inputs.
*   **Card Padding**: `2rem` (32px) for premium internal breathing room.
*   **Grid Gap**: `2rem` (32px) for major layout components.

---

## 🧩 Premium Component Assets
### 1. The "Bento" Card
*   **Background**: White (`#ffffff`)
*   **Border**: `1px solid #f3f4f6` (Light slate)
*   **Shadow**: `0 20px 50px rgba(0, 83, 205, 0.05)` (Subtle blue shadow)
*   **Hover**: `-5px` vertical translation with intensified shadow.

### 2. Status Badges
*   **Active**: Background `bg-green-50`, Text `text-green-600`
*   **Expired**: Background `bg-rose-50`, Text `text-rose-600`
*   **International**: Background `bg-blue-50`, Text `text-[#2b6cee]`

---

## 🛠️ Usage Implementation (CSS Variable Hook)
```css
:root {
  --primary: #0053cd;
  --bg-main: #faf8ff;
  --text-main: #191b23;
  --text-muted: #616f89;
  --font-main: 'Public Sans', sans-serif;
}

h1, h2, h3 {
  font-family: var(--font-main);
  color: var(--text-main);
  letter-spacing: -0.01em;
}

.label-caps {
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}
```
