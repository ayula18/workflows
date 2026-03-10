const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const appDir = path.join(srcDir, 'app');

const componentMoves = {
    'home': ['Hero.tsx', 'HowItWorks.tsx', 'CallToAction.tsx', 'OutcomesGrid.tsx', 'TechStack.tsx', 'WorkflowArchitecture.tsx'],
    'experience': ['EngineeringExperience.tsx', 'ExperienceCard.tsx', 'MesaExperience.tsx'],
    'automation': ['AutomationCard.tsx', 'AutomationLibrary.tsx', 'AutomationOverview.tsx'],
    'documents': ['DocumentCard.tsx', 'GeneratedAssets.tsx'],
    'animations': ['AnimatedText.tsx', 'BeforeAfter.tsx', 'TypewriterHeading.tsx'],
    'theme': ['ThemeProvider.tsx', 'ThemeToggle.tsx'],
    'chat': ['ChatWidgetLoader.tsx'],
    'ui': ['SectionWrapper.tsx']
};

const routeMoves = [
    { src: 'page.tsx', dest: '(routes)/(home)/page.tsx' },
    { src: 'automations', dest: '(routes)/automations' },
    { src: 'case-studies', dest: '(routes)/case-studies' },
    { src: 'sector-thesis', dest: '(routes)/sector-thesis' }
];

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

// 1. Move routes
for (const move of routeMoves) {
    const srcPath = path.join(appDir, move.src);
    const destPath = path.join(appDir, move.dest);

    if (fs.existsSync(srcPath)) {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.renameSync(srcPath, destPath);
        console.log(`Moved route ${move.src} -> ${move.dest}`);
    }
}

// 2. Move components
for (const [folder, files] of Object.entries(componentMoves)) {
    const targetDir = path.join(componentsDir, folder);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    for (const file of files) {
        const srcPath = path.join(componentsDir, file);
        const destPath = path.join(targetDir, file);
        if (fs.existsSync(srcPath)) {
            fs.renameSync(srcPath, destPath);
            console.log(`Moved component ${file} -> ${folder}/${file}`);
        }
    }
}

// 3. Update all imports
const allFiles = getAllFiles(srcDir);
const importMap = {};
for (const [folder, files] of Object.entries(componentMoves)) {
    for (const file of files) {
        const componentName = file.replace('.tsx', '');
        importMap[componentName] = `@/components/${folder}/${componentName}`;
    }
}

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // First, convert any local relative imports that broke due to moving components
    // E.g. within AutomationLibrary.tsx, import "./automation/LibraryTabs" should become "@/components/automation/LibraryTabs"
    content = content.replace(/(['"`])(\.\/|\.\.\/)([\w\/]+)(['"`])/g, (match, p1, p2, p3, p4) => {
        // If the file is inside components directory and importing another component
        if (file.includes('/components/')) {
            // we won't do full generic replacement to avoid breaking other things, we specifically target known bad ones later
        }
        return match;
    });

    for (const [componentName, newImportPath] of Object.entries(importMap)) {
        // match imports of the component
        const regexStr = `(['"\`])(?:@/components/|\\./|\\.\\./|\\.\\./\\.\\./|\\.\\./components/|\\.\\./\\.\\./components/)${componentName}(['"\`])`;
        const regex = new RegExp(regexStr, 'g');
        content = content.replace(regex, `$1${newImportPath}$2`);

        const regexTsxStr = `(['"\`])(?:@/components/|\\./|\\.\\./|\\.\\./\\.\\./|\\.\\./components/|\\.\\./\\.\\./components/)${componentName}\\.tsx(['"\`])`;
        const regexTsx = new RegExp(regexTsxStr, 'g');
        content = content.replace(regexTsx, `$1${newImportPath}.tsx$2`);
    }

    // specific manual fixes
    // AutomationLibrary moved to components/automation/, so it needs to import its siblings properly
    content = content.replace(/['"`]\.\/automation\/LibraryTabs['"`]/g, '"@/components/automation/LibraryTabs"');
    content = content.replace(/['"`]\.\/automation\/CategorySidebar['"`]/g, '"@/components/automation/CategorySidebar"');
    // AutomationOverview moved to components/automation/, so its ui imports need fixing
    content = content.replace(/['"`]\.\/ui\/MetricPill['"`]/g, '"@/components/ui/MetricPill"');
    content = content.replace(/['"`]\.\/ui\/LoomEmbed['"`]/g, '"@/components/ui/LoomEmbed"');
    content = content.replace(/['"`]\.\/ui\/ProcessStep['"`]/g, '"@/components/ui/ProcessStep"');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Refactoring imports complete.');
