import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:true,use:{baseURL:'http://localhost:3000',headless:true,channel:process.env.PLAYWRIGHT_CHANNEL || undefined},webServer:{command:'npm run dev',url:'http://localhost:3000/en',reuseExistingServer:!process.env.CI,timeout:120000}});
