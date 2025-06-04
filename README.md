# Ayushi.dev - Modern Portfolio Website

A modern, responsive portfolio website built with Next.js (App Router) and Tailwind CSS, optimized for performance.

## Features

- **Responsive Design**: Mobile-first approach ensuring the site looks great on all devices
- **Dark Mode**: Toggle between light and dark themes with Tailwind's dark mode class strategy
- **Smooth Animations**: Subtle animations using Framer Motion (fadeIn, slideIn, staggered effects)
- **Form Validation**: Contact form with validation using React Hook Form
- **Clean Component Structure**: Each section is organized as a separate component
- **Performance Optimized**: Built with Next.js for optimal loading speed and SEO

## Sections

- **Home**: Hero section with animated headline and call-to-action buttons
- **About**: Responsive layout with image and text content
- **Skills**: Grid layout with icons and hover animations
- **Projects**: Responsive cards with hover and entrance animations
- **Contact**: Form with validation and success feedback
- **Navbar**: Sticky, scroll-linked navigation with mobile responsive menu
- **Footer**: Social icons and site links

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Navigate to the project directory:

```bash
cd ayushi.dev
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Content

- Update personal information in each component
- Replace placeholder images in the `/public` directory with your own
- Modify project details in the `Projects.tsx` component

### Styling

- Customize colors in the `tailwind.config.js` file
- Adjust animations in the Framer Motion configurations within components
- Modify component layouts as needed

## Deployment

This project can be easily deployed to platforms like Vercel or Netlify:

```bash
npm run build
# or
yarn build
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with App Router
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## License

This project is licensed under the MIT License - see the LICENSE file for details.
