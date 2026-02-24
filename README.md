# Nusuki_React_Redux

A modern **React + Redux Toolkit** project built with **Vite**, **TypeScript**, and **React Router**, designed for scalable state management, clean architecture, and fast development with VS Code snippets.

## 🚀 Quick Start

### Prerequisites
- Node.js 24+ or Bun 1.0+
- VS Code (recommended)

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd Nusuki_React_Redux

# Install dependencies
bun install  # or npm install / yarn install



# Start development server
bun dev

# Build for production
bun build

# Preview production build
bun preview

# Run ESLint
bun lint
```


## Project Structure
```bash

Nusuki_React_Redux/
├── node_modules/
├── public/
├── src/
│   ├── assets/           # Images, icons, styles
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices (state management)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Route-specific components
│   ├── routes/          # React Router route definitions
│   ├── store/           # Redux store configuration
│   ├── App.tsx          # Main app component
│   └── main.tsx         # App entry point
├── package.json
├── tsconfig.json
└── vite.config.ts

```

## Why TypeScript is Essential

- **Strong Typing**: Catches errors at compile-time instead of runtime.  
- **Better IntelliSense**: Provides enhanced autocompletion in VS Code.  
- **Maintainability**: Makes large-scale applications easier to manage.  
- **Type-Safe Redux**: Ensures full type safety when using Redux Toolkit.  
- **Improved Collaboration**: Clear API contracts between components, making teamwork smoother.

## TypeScript Features Used

- **Strict Mode**: All strict type-checking options enabled.  
- **Path Aliases**: Configured for cleaner and shorter imports.  
- **ES Modules**: Uses the modern JavaScript module system.  
- **JSX Support**: Full TypeScript support for React JSX.


Add to VS Code Settings (File > Preferences > Configure User Snippets > typescriptreact.json)

```bash
{
  "React Stateless Component (filename based, no import, gap)": {
    "prefix": "tsc",
    "body": [
      "",
      "const ${TM_FILENAME_BASE} = () => {",
      "    return (",
      "        <div>",
      "            $0",
      "        </div>",
      "    );",
      "};",
      "",
      "export default ${TM_FILENAME_BASE};"
    ],
    "description": "React stateless component without React import, name from file, 1-line top gap"
  }
}

```

# Important Links

hajj_umrah section theme colors :
primary : oklch(35.74% 0.086 154.39)
secondary : oklch(63.30% 0.122 84.83)

``` bash

https://nusukibd.com/
https://assunnahtravels.com/
https://sharetrip.net/

https://nusuki.downtown-bd.com/

Education part Important Links 
https://www.studies-overseas.com/
https://www.studies-overseas.com/universities
https://www.studies-overseas.com/test-preparation


```




## Managed by Tashrif Hasan Jilan Eshrak# Nusuki_React_Redux
# Nusuki_React_Redux
