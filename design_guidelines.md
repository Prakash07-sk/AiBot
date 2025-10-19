# Embeddable Chatbot Widget - Design Guidelines

## Design Approach: Material Design System

**Rationale**: This chatbot widget requires universal compatibility, functional clarity, and scalability across diverse parent websites. Material Design provides robust elevation principles, clear interaction patterns, and established chat UI conventions that ensure the widget remains functional and unobtrusive regardless of host environment.

**Core Principle**: Design for invisibility until needed, then deliver focused utility without overwhelming the user or conflicting with parent site aesthetics.

---

## Color Palette

### Light Mode
- **Primary**: 210 100% 45% (configurable via env)
- **Surface**: 0 0% 100% (widget background)
- **Text Primary**: 220 15% 20%
- **Text Secondary**: 220 10% 50%
- **User Message Bubble**: 210 100% 45% (matches primary)
- **Bot Message**: No background, text only in 220 15% 20%
- **Dividers/Borders**: 220 10% 92%
- **Branding Text**: 220 8% 65% (subtle gray for "Powered by")

### Dark Mode
- **Primary**: 210 100% 55%
- **Surface**: 220 15% 12%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 220 10% 70%
- **User Message Bubble**: 210 100% 55%
- **Bot Message**: Text only in 0 0% 95%
- **Dividers/Borders**: 220 10% 22%
- **Branding Text**: 220 8% 55%

---

## Typography

**Font Stack**: System fonts for zero load impact
```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, sans-serif
```

**Hierarchy**:
- Widget Title: 18px, font-weight 600, letter-spacing -0.02em
- Chat Messages: 15px, font-weight 400, line-height 1.5
- Timestamps: 12px, font-weight 400, opacity 0.7
- Suggestion Buttons: 14px, font-weight 500
- Branding Footer: 11px, font-weight 400
- Input Placeholder: 14px, font-weight 400, opacity 0.6

---

## Layout System

**Spacing Units**: Use Tailwind scale with consistent rhythm
- Base unit: 4px
- Common spacing: `gap-2` (8px), `p-4` (16px), `gap-6` (24px)
- Modal padding: `p-6` desktop, `p-4` mobile
- Message spacing: `gap-3` (12px) between messages

**Container Structure**:
- Minimized bubble: 56x56px circle, bottom-right anchored with 24px margins
- Expanded modal: 90vw × 90vh max, centered with backdrop
- Chat area: Full height minus header (60px) and input (72px)
- Mobile: Full screen (100vw × 100vh) when expanded

---

## Component Specifications

### 1. Minimized Chat Bubble
- **Shape**: Perfect circle, 56px diameter
- **Shadow**: Material elevation 6 (0 10px 20px rgba(0,0,0,0.15))
- **Icon**: Chat bubble icon, 24px, white on primary color background
- **Notification Badge**: 20px circle, absolute top-right, red with white count
- **Hover State**: Scale 1.05, shadow elevation 8
- **Animation**: Gentle pulse on initial load (once only)

### 2. Expanded Modal Dialog
- **Backdrop**: rgba(0,0,0,0.4), blocks parent interaction
- **Panel**: Rounded corners 16px, material elevation 24
- **Header**: 60px height, primary color background, white text, includes title and close button
- **Close Button**: X icon, 40x40px touch target, top-right 12px margin
- **Entry Animation**: Slide up from bottom-right with fade, 300ms ease-out
- **Exit Animation**: Slide down to bottom-right with fade, 250ms ease-in

### 3. Welcome State (First Open)
- **Suggestion Grid**: 2 columns on desktop, 1 column mobile, gap-3
- **Suggestion Buttons**: Full-width, outlined style, 44px min-height, rounded-lg (12px)
- **Button Hover**: Filled with primary color, white text
- **Spacing**: 24px top margin from welcome message

### 4. Chat Messages
- **User Messages**: 
  - Right-aligned, max-width 75%, rounded-2xl (16px)
  - Primary color background, white text
  - Padding: 12px 16px
  - Tail: Small triangle bottom-right
  
- **Bot Messages**:
  - Left-aligned, 100% width, NO background, NO border
  - Text color matches theme text primary
  - Padding: 8px 0
  - Avatar: Optional 32px circle at left with bot icon

- **Timestamps**: Below message, 8px spacing, 12px font, opacity 0.6

### 5. Loading Indicator
- **Type**: Three animated dots (pulsing)
- **Container**: Left-aligned bubble matching bot message position
- **Size**: 40px width × 32px height, light gray background
- **Animation**: Sequential pulse, 600ms cycle

### 6. Input Area
- **Height**: 72px fixed
- **Layout**: Horizontal flex, input + send button
- **Input Field**: Borderless, background 220 10% 96% (light) / 220 10% 18% (dark)
- **Rounded**: Left side 24px, integrated with send button
- **Placeholder**: "Type your message..."
- **Send Button**: 48px square, primary color, paper plane icon, rounded-r-xl

### 7. Branding Footer
- **Position**: Absolute bottom, center-aligned
- **Text**: "Powered by wizzcomAi.com" in subtle gray
- **Size**: 11px, padding 8px
- **Link**: Hover underline, same color
- **Isolation**: Outside scrollable chat area

---

## Interaction Patterns

- **Click States**: Material ripple effect on all interactive elements
- **Focus States**: 2px primary color outline, 4px offset
- **Scroll Behavior**: Smooth scroll, auto-scroll to latest message
- **Keyboard Navigation**: Tab order: suggestions → input → send → close
- **Touch Targets**: Minimum 44×44px for mobile compliance
- **Disabled States**: 40% opacity, no pointer events

---

## Responsive Adaptations

**Desktop (≥1024px)**:
- Bottom-right anchored bubble: 24px from edges
- Modal: 600px max-width, 80vh max-height

**Tablet (768px-1023px)**:
- Bottom-right bubble: 20px from edges  
- Modal: 90% viewport both dimensions

**Mobile (<768px)**:
- Bubble: Bottom-center or bottom-right, 16px margins
- Modal: Full screen takeover (100vw × 100vh)
- Suggestion buttons: Single column, full width
- Input: Increased touch target to 56px height

---

## Accessibility & Isolation

- **Color Contrast**: WCAG AA minimum (4.5:1 for text)
- **ARIA Labels**: All interactive elements properly labeled
- **Focus Management**: Trap focus within modal when open
- **CSS Isolation**: All styles prefixed or scoped to prevent parent conflicts
- **Z-Index Strategy**: Widget at 999999, modal at 1000000
- **No Animations**: Respect prefers-reduced-motion

---

## Visual Enhancements

- **Micro-interactions**: Subtle scale on button hover (1.02), button press (0.98)
- **Message Entry**: Fade + slide up animation, 200ms
- **Typing Indicator**: Organic pulse animation for bot thinking state
- **Smooth Transitions**: All state changes use 200-300ms ease timing
- **Empty State**: Friendly illustration or icon when no conversation history