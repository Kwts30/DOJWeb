# Los Santos Department of Justice Informative Website

A hobby project inspired by GTA V’s Department of Justice. This website is built entirely with static HTML, Tailwind CSS (my first time using it!), and JavaScript. No EJS or server-side rendering—just modern, simple web technology! The site is fully responsive and deployed via GitHub Pages.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Learning Goals](#learning-goals)
- [Project Structure](#project-structure)
- [Setup & Development](#setup--development)
- [Deployment](#deployment)
- [Credits](#credits)

---

## About

This website is a personal, hobbyist project that recreates the Department of Justice from GTA V’s Los Santos. My objectives are to learn and experiment with Tailwind CSS for the first time, improve my front-end skills, and build something fun and informative. All content is rendered using only static HTML, CSS, and JavaScript—no frameworks or EJS templating are used. The website is easy to deploy and share with others, thanks to its static nature and GitHub Pages hosting.

---

## Features

- **100% Static**: No backend, no frameworks, no EJS—just HTML, CSS, and JS.
- **First-Time Tailwind CSS**: All layouts and styles are made using Tailwind's utility classes.
- **Responsive Design**: Works great on both desktop and mobile devices.
- **Vanilla JavaScript**: Handles all interactivity and dynamic UI updates.
- **Custom DOJ Assets**: Includes unique banners, seals, and logos for added authenticity.
- **Organized Project Structure**: Assets and code are neatly arranged for easy navigation.
- **Live Deployment**: Viewable online via GitHub Pages.

---

## Learning Goals

- Get hands-on experience with Tailwind CSS for building modern web layouts.
- Practice building and maintaining static web projects without frameworks.
- Improve JavaScript skills for UI logic and DOM manipulation.
- Learn about deploying static sites using GitHub Pages.
- Explore project organization and asset management best practices.

---

## Project Structure

```
DOJWeb/
├── index.html                # Home page
├── departments.html          # DOJ departments overview
├── input.css                 # Tailwind CSS source
├── style.css                 # Generated styles after Tailwind build
├── main.js                   # JavaScript functionality
├── package.json              # Project dependencies
├── tailwind.config.js        # Tailwind configuration
├── assets/                   # Images and logos
│   ├── doj-seal.png
│   ├── city-seal.png
│   ├── doj-seal-large.png
│   ├── judiciary-logo.png
│   ├── da-logo.png
│   ├── public-attorney-logo.png
│   └── private-lawyers-logo.png
└── ...
```

---

## Setup & Development

1. **Install dependencies** (for Tailwind CSS build):
   ```bash
   npm install
   ```

2. **Build the CSS**:
   ```bash
   npm run build
   ```

3. **Start live reload for development** (optional):
   ```bash
   npm run watch
   ```

4. **Open the HTML files** in your browser to view the site locally.

---

## Deployment

This project is automatically deployed via GitHub Pages.

**How to deploy:**
1. Push your changes to the `main` branch.
2. In your repository settings, go to the **Pages** section.
3. Set the source to the `main` branch.
4. Your site will be available at:  
   ```
   https://Kwts30.github.io/DOJWeb
   ```

---

## Credits

Created and maintained by [Kwts30](https://github.com/Kwts30).  
Inspired by Grand Theft Auto V’s Department of Justice.

---

_This project is for educational and hobbyist purposes only and is not affiliated with Rockstar Games or GTA V._
_This Project is for educational and hobbyist purposes only and is not affilated with the US Department of Justice or any Department or Ministry of justice on other country_
