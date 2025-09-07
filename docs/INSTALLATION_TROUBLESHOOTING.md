# React on Rails Installation Troubleshooting Guide

This guide addresses common installation issues and provides solutions for React on Rails setup problems.

## Critical Installation Sequence Issue

### Problem: "package.json not found" Error

**Error Message:**
```bash
ERROR: package.json not found
```

**Root Cause:** Installing React on Rails before running `rails shakapacker:install` which creates the required `package.json` file.

**❌ Incorrect Sequence (causes error):**
```bash
rails new my_app --skip-javascript
cd my_app
bundle add shakapacker
bundle add react-on-rails  # ← TOO EARLY!
rails shakapacker:install   # Creates package.json but React on Rails already failed
rails generate react_on_rails:install  # ← FAILS!
```

**✅ Correct Sequence (works):**
```bash
rails new my_app --skip-javascript
cd my_app
bundle add shakapacker
rails shakapacker:install   # ← Creates package.json FIRST
bundle add react-on-rails   # Now package.json exists
rails generate react_on_rails:install  # ← SUCCESS!
```

### Why This Happens

The React on Rails generator (`rails generate react_on_rails:install`) expects `package.json` to exist because it needs to:
1. Add React dependencies to the existing `package.json`
2. Verify the JavaScript build pipeline is configured
3. Install additional npm packages

The `rails shakapacker:install` command creates the initial `package.json` file, so it must run before adding React on Rails.

## Additional Installation Issues

### Issue: Yarn vs NPM Conflicts

**Problem:** Mixing package managers can cause dependency resolution issues.

**Solution:** Stick to one package manager consistently:
```bash
# If using Yarn (recommended with Shakapacker):
yarn install

# If using NPM:
npm install
```

**Check for conflicts:**
```bash
# Remove conflicting lock files
rm -f package-lock.json  # If using Yarn
rm -f yarn.lock         # If using NPM
```

### Issue: Node.js Version Compatibility

**Problem:** React on Rails requires Node.js 18+ for modern React features.

**Solution:** Check and upgrade Node.js:
```bash
node --version  # Should be 18.0.0 or higher
```

Use a Node version manager:
```bash
# With nvm:
nvm install 18
nvm use 18

# With fnm:
fnm install 18
fnm use 18
```

### Issue: Ruby Version Compatibility  

**Problem:** React on Rails v15 requires Ruby 3.0+.

**Solution:** Check and upgrade Ruby:
```bash
ruby --version  # Should be 3.0.0 or higher
```

Update your `.ruby-version` file:
```
3.2.0
```

## Auto-Registration Setup Issues

### Issue: Components Not Auto-Registering

**Problem:** Components placed in directories but not being detected.

**Checklist:**
1. **Correct directory structure:**
   ```
   app/javascript/src/ComponentName/ror_components/Component.jsx
   ```

2. **Configuration in `config/initializers/react_on_rails.rb`:**
   ```ruby
   config.components_subdirectory = "ror_components"
   config.auto_load_bundle = true
   ```

3. **Generate webpack entries:**
   ```bash
   bundle exec rake react_on_rails:generate_packs
   ```

4. **Check generated files:**
   ```bash
   ls app/javascript/generated/
   # Should show ComponentName.js files
   ```

### Issue: Shakapacker Configuration

**Problem:** Auto-registration requires specific Shakapacker settings.

**Solution:** Verify `config/shakapacker.yml`:
```yml
default:
  nested_entries: true  # Required for auto-registration
  source_path: app/javascript
```

## Development Server Issues

### Issue: HMR Not Working

**Problem:** Hot Module Replacement not reloading components.

**Solutions:**
1. **Use the correct development command:**
   ```bash
   ./bin/dev  # Not just 'rails server'
   ```

2. **Check Procfile.dev exists:**
   ```
   web: bin/rails server -p 3000
   js: bin/shakapacker-dev-server
   ```

3. **Verify webpack-dev-server is running:**
   ```bash
   # Should see both Rails and webpack processes
   ps aux | grep -E "(rails|webpack)"
   ```

### Issue: FOUC (Flash of Unstyled Content)

**Problem:** Components appear unstyled briefly during development.

**Understanding:** This is normal with HMR in development mode.

**Solutions:**
- **For development without FOUC:** Use `./bin/dev static`
- **For production testing:** Use `./bin/dev prod`
- **Normal development:** Accept FOUC as part of HMR

## Bundle Generation Issues

### Issue: Generated Files Not Created

**Problem:** Running `rake react_on_rails:generate_packs` produces no files.

**Debugging Steps:**
1. **Check component directory structure:**
   ```bash
   find app/javascript/src -name "ror_components" -type d
   ```

2. **Verify component files exist:**
   ```bash
   find app/javascript/src -name "*.jsx" -o -name "*.tsx"
   ```

3. **Run with verbose output:**
   ```bash
   VERBOSE=true bundle exec rake react_on_rails:generate_packs
   ```

4. **Check for syntax errors:**
   ```bash
   npx eslint app/javascript/src/**/*.{js,jsx,ts,tsx}
   ```

## Performance and Build Issues

### Issue: Slow Initial Build

**Problem:** First webpack compilation takes too long.

**Solutions:**
1. **Clear caches:**
   ```bash
   rm -rf tmp/shakapacker
   rm -rf public/packs
   rm -rf node_modules/.cache
   ```

2. **Update dependencies:**
   ```bash
   bundle update react-on-rails
   yarn upgrade
   ```

### Issue: CSS Not Loading

**Problem:** Component styles not appearing.

**Solutions:**
1. **Verify CSS modules import:**
   ```jsx
   import * as style from './Component.module.css';
   // Use: className={style.containerName}
   ```

2. **Check generated CSS files:**
   ```bash
   ls public/packs/css/
   ```

3. **Verify layout includes pack tags:**
   ```erb
   <%= stylesheet_pack_tag %>
   <%= javascript_pack_tag %>
   ```

## Getting Help

If you encounter issues not covered here:

1. **Check the demo app:** [test-react-on-rails-v15-hello-world](https://github.com/shakacode/react_on_rails/tree/master/spec/dummy)
2. **Review commit history** for step-by-step implementation
3. **Compare your setup** with the working example
4. **Open an issue** with specific error messages and environment details

## Environment Information Template

When reporting issues, include this information:

```bash
# System Information
ruby --version
node --version
yarn --version

# Gem versions
bundle list | grep -E "(react-on-rails|shakapacker|rails)"

# Package versions
cat package.json | grep -E "(react|@types)"

# Configuration
cat config/initializers/react_on_rails.rb
cat config/shakapacker.yml
```

This helps maintainers diagnose issues quickly and provide accurate solutions.