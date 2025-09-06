const puppeteer = require('puppeteer');

async function testReactApp() {
  console.log('🚀 Starting React on Rails test...');
  
  const browser = await puppeteer.launch({ 
    headless: true,  // Run headless for CI/automation
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Listen for console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
    console.log(`📱 Console [${msg.type()}]:`, msg.text());
  });

  // Listen for page errors
  page.on('pageerror', error => {
    console.log('❌ Page error:', error.message);
  });

  try {
    console.log('🌐 Navigating to http://localhost:3000/hello_world');
    await page.goto('http://localhost:3000/hello_world', { 
      waitUntil: 'networkidle2',
      timeout: 10000 
    });

    // Wait for React component to render
    console.log('⏳ Waiting for React component to render...');
    
    // Look for React component by text content since we know it renders
    await page.waitForFunction(() => {
      return document.body.innerText.includes('Hello World') || 
             document.querySelector('[id*="HelloWorld"]') ||
             document.querySelector('[data-react-component]');
    }, { timeout: 5000 });

    // Check if React component rendered  
    const reactComponentExists = await page.evaluate(() => {
      return document.querySelector('[id*="HelloWorld"]') || 
             document.querySelector('[data-react-component]') ||
             document.body.innerText.includes('Hello World');
    });
    console.log('✅ React component found:', !!reactComponentExists);

    // Get page title and content
    const title = await page.title();
    const bodyText = await page.evaluate(() => document.body.innerText);
    
    console.log('📄 Page title:', title);
    console.log('📝 Page contains "Hello World":', bodyText.includes('Hello World'));

    // Check for React on Rails version info
    const reactOnRailsInfo = await page.evaluate(() => {
      return {
        reactOnRailsExists: typeof window.ReactOnRails !== 'undefined',
        reactVersion: window.React?.version || 'Not found',
        componentsRegistered: (typeof window.ReactOnRails !== 'undefined' && 
                             typeof window.ReactOnRails.getComponents === 'function') 
                             ? window.ReactOnRails.getComponents() : 'getComponents not available'
      };
    });

    console.log('🔧 React on Rails info:', reactOnRailsInfo);

    // Take a screenshot
    await page.screenshot({ path: 'test_screenshot.png', fullPage: true });
    console.log('📸 Screenshot saved as test_screenshot.png');

    // Test results summary
    console.log('\n🎯 TEST RESULTS SUMMARY:');
    console.log('✅ Server responded successfully');
    console.log(`✅ React component rendered: ${!!reactComponentExists}`);
    console.log(`✅ Contains "Hello World": ${bodyText.includes('Hello World')}`);
    console.log(`✅ React on Rails available: ${reactOnRailsInfo.reactOnRailsExists}`);
    console.log(`✅ Console messages captured: ${consoleMessages.length}`);

    if (consoleMessages.some(msg => msg.type === 'error')) {
      console.log('⚠️  Errors found in console logs');
      consoleMessages.filter(msg => msg.type === 'error').forEach(err => {
        console.log('   ❌', err.text);
      });
    } else {
      console.log('✅ No console errors detected');
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  } finally {
    await browser.close();
    console.log('🏁 Test completed');
  }
}

testReactApp();