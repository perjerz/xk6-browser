import { chromium } from 'k6/x/browser'

export const options = {
  scenarios: {
    messages: {
      executor: 'constant-vus',
      exec: 'messages',
      vus: 2,
      duration: '2s',
    },
    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 2,
      iterations: 4,
      maxDuration: '5s',
    },
  },
  thresholds: {
    browser_dom_content_loaded: ['p(90) < 1000'],
    browser_first_contentful_paint: ['max < 1000']
  }
}

export function messages() {
  const browser = chromium.launch({
    headless: __ENV.XK6_HEADLESS ? true : false,
  });
  const page = browser.newPage();

  page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' })

  page.close();
  browser.close();
}

export function news() {
  const browser = chromium.launch({
    headless: __ENV.XK6_HEADLESS ? true : false,
  });
  const page = browser.newPage();

  page.goto('https://test.k6.io/news.php', { waitUntil: 'networkidle' })

  page.close();
  browser.close();
}
