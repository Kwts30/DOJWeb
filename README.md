# Los Santos Department of Justice Website

A modern, responsive website for the Los Santos Department of Justice featuring legal documents, penal codes, staff directory, and official memorandums.

## 🏛️ Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Penal Codes**: Comprehensive legal code database with search and filtering
- **Memorandums**: Official department communications and directives
- **Staff Directory**: Department personnel and organizational structure
- **Legal Documents**: Rules, regulations, and official documentation

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Interactive functionality
- **Node.js** - Build tooling
- **GitHub Actions** - CI/CD pipeline

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DOJWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Open in browser**
   Open `index.html` in your web browser

### Development

For development with auto-rebuilding CSS:

```bash
npm run watch
```

This will watch for changes in your HTML and CSS files and automatically rebuild the styles.

## 📁 Project Structure

```
DOJWeb/
├── assets/                 # Images and static files
├── memorandums/           # Memorandum pages and data
│   ├── pages/            # Individual memorandum HTML files
│   ├── data/             # JSON data files
│   └── templates/        # Template files
├── .github/              # GitHub Actions workflows
├── index.html            # Main homepage
├── penal-codes.html      # Penal codes page
├── staff.html            # Staff directory
├── rules.html            # Rules and regulations
├── main.js               # Main JavaScript file
├── input.css             # Tailwind source CSS
├── style.css             # Generated CSS (auto-generated)
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Project dependencies
```

## 🔧 Available Scripts

- `npm run build` - Build production CSS
- `npm run watch` - Watch for changes and rebuild
- `npm run dev` - Development mode with watching
- `npm start` - Build and display success message

## 🎨 Customization

### Colors

The website uses a custom color palette defined in `tailwind.config.js`:

- **DOJ Brown**: `#2C1810` - Primary brand color
- **DOJ Tan**: `#F5E6D3` - Secondary background color  
- **DOJ Gold**: `#D4AF37` - Accent color

### Adding Content

- **Memorandums**: Add new HTML files to `memorandums/pages/` and update `memorandums/data/memorandums.json`
- **Staff**: Update the staff information in `staff.html`
- **Penal Codes**: Modify the code sections in `penal-codes.html`

## 📱 Browser Support

This website supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

The project includes GitHub Actions for automatic deployment:

1. Push changes to the `main` branch
2. GitHub Actions will automatically build the CSS
3. The site will be deployed to GitHub Pages

### Manual Deployment

1. Run `npm run build` to generate the CSS
2. Upload all files to your web server
3. Ensure `style.css` is included

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Build and test (`npm run build`)
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/new-feature`)
7. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions about this website, please contact the Los Santos Department of Justice.

---

**© 2025 Department of Justice, Los Santos. All Rights Reserved.**

```
CENTRALIZED DOJ SYSTEM/
├── index.html              # Home page
├── departments.html        # Departments page
├── input.css              # Tailwind CSS input file
├── style.css              # Generated CSS (after build)
├── main.js                # JavaScript functionality
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind configuration
├── .gitignore            # Git ignore rules
└── assets/               # Image assets
    ├── doj-seal.png
    ├── city-seal.png
    ├── doj-seal-large.png
    ├── judiciary-logo.png
    ├── da-logo.png
    ├── public-attorney-logo.png
    └── private-lawyers-logo.png
```

## Required Assets

The following images need to be added to the `assets/` directory:
- doj-seal.png - Department of Justice seal
- city-seal.png - City of Los Santos seal
- doj-seal-large.png - Large version of DOJ seal for homepage
- judiciary-logo.png - Judiciary department logo
- da-logo.png - District Attorney department logo
- public-attorney-logo.png - Public Attorney's department logo
- private-lawyers-logo.png - Private Lawyers department logo

## Setup and Development

1. Install dependencies:
```bash
npm install
```

2. Build CSS:
```bash
npm run build
```

3. For development with live reload:
```bash
npm run watch
```

## Deployment

This project is configured for GitHub Pages deployment. After pushing to GitHub:

1. Go to repository settings
2. Navigate to "Pages" section
3. Select "main" branch as source
4. Save settings

The site will be available at `https://[username].github.io/[repository-name]` #   D O J W e b 
 
 