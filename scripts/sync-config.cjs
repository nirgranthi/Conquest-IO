const fs = require('fs');
const path = require('path');

// Easily update this version variable to sync it across the app
const VERSION = "1.0.2";
//v1.0.2 fixed "Double click sends all troops" issue

console.log(`Syncing version ${VERSION} across all config files...`);

const rootDir = path.resolve(__dirname, '..');
const packageJsonPath = path.join(rootDir, 'package.json');
const tauriConfPath = path.join(rootDir, 'src-tauri', 'tauri.conf.json');
const cargoTomlPath = path.join(rootDir, 'src-tauri', 'Cargo.toml');

// Update package.json
if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (pkg.version !== VERSION) {
        pkg.version = VERSION;
        fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
        console.log(`Updated package.json to version ${VERSION}`);
    } else {
        console.log('package.json already up-to-date');
    }
}

// Update tauri.conf.json
if (fs.existsSync(tauriConfPath)) {
    const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
    if (tauriConf.version !== VERSION) {
        tauriConf.version = VERSION;
        fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n');
        console.log(`Updated tauri.conf.json to version ${VERSION}`);
    } else {
        console.log('tauri.conf.json already up-to-date');
    }
}

// Update Cargo.toml
if (fs.existsSync(cargoTomlPath)) {
    const cargoToml = fs.readFileSync(cargoTomlPath, 'utf8');
    const updatedCargoToml = cargoToml.replace(/^version\s*=\s*".*?"/m, `version = "${VERSION}"`);
    if (cargoToml !== updatedCargoToml) {
        fs.writeFileSync(cargoTomlPath, updatedCargoToml);
        console.log(`Updated Cargo.toml to version ${VERSION}`);
    } else {
        console.log('Cargo.toml already up-to-date');
    }
}

console.log('Sync complete!');
