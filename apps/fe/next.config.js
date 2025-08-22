import path from 'path';
import { fileURLToPath } from 'url';

// These two lines are the fix.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        // Now this line will work correctly.
        root: path.join(__dirname, '../../'),
    },
};

export default nextConfig;
