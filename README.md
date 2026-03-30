# Robust Kitchen Website

A professional Next.js website for Robust Kitchen, featuring therapeutic meal services with a clean, modern design.

## Development Rules

### Design & Branding
- **Color Palette**: Use only the brand colors (#ED7E6D, #26D1D6, #396409, #BBE85B, #FAE053)
- **Typography**: Cormorant Garamond for headings, Outfit for body text, JetBrains Mono for accents
- **Logo**: Square animated GIF placeholder - ensure all logo placements accommodate square format
- **Loading Screen**: Must show animated GIF logo in center, large size on initial load

### Code Quality
- Use JavaScript only (no TypeScript)
- Follow component-based architecture
- Implement smooth animations and transitions
- Ensure responsive design across all devices
- Maintain clean, readable code structure

### Features
- Theme system for easy color palette changes
- Professional animations and micro-interactions
- Loading screen with brand logo
- Responsive navigation
- SEO-optimized structure

### Performance
- Optimize images and assets
- Implement lazy loading where appropriate
- Ensure fast loading times
- Mobile-first responsive design

## Tech Stack
- Next.js 16
- Tailwind CSS v4
- JavaScript (ES6+)
- Custom fonts (Google Fonts)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
└── components/
    ├── Navbar.js
    ├── Hero.js
    ├── LoadingScreen.js
    └── ...
```

## Deployment
Build for production:
```bash
npm run build
npm start
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
