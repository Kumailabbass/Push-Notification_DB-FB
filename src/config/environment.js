const dotenv = require('dotenv');
const { z } = require('zod');

// Load environment variables (even though you removed .env, this is good practice)
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  HOST: z.string().default('localhost'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('.kumailskar.'),
  DB_DATABASE: z.string().default('crud-app2'),
  FIREBASE_PROJECT_ID: z.string().default('office-backend-eea40'),
  FIREBASE_PRIVATE_KEY: z.string().default(`-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDQ1s5iuUuWQgK3\nga5xGWA9Am3qPAoH22PXzX03vkbe4lNtAOyVtX/BkmdyTukYjyo2oAgQEJzGltp6\nc800wXeUkdKW1s0dLx0i987KRZeYaWdP8B0CkmSoPEe86iaC33X2ImC7FlecHb6X\n0p/zm80IbOEsKP4WFa8oRo0TIc+ZWGMokfImoMAXhBxdypdk928iePjBXxTBGUKX\nOKp1W8wC96XW8I86vbJXcDAi1KKXIOQQgmIOu21K7MxLryAM/bLYycLoXfSti9dD\n9V6pU457BDAOHbm85fYuXvDe9p3GVER8mgedmB8HqQyoo034s7DpjI1mot8kHJhP\nPAosbnW9AgMBAAECggEADVd5G5fV4Iq6t17VYParjh+TxmVBM3ZMdHLKyfRh0lxo\nKFcTm47a/hKsgYImucHFAx9fKdOTMyFbt3tNbqOLewDZO3dhPDjl0MrpuZoPkMDv\nGjgZ9QTwNvU+6gPqzkKYu87qGhmtItVITKpmkJQcBFVHCgtbttfPdwW8KS7oSdYH\npg5lpVIRt0uRJkDx5YCMtDlNXvrJEBgeZKpraz81DHu551Ek048fSjUSCF4EgKXP\nklGEEyuMy0QFXZ4ilYilZxPtK6QMPCd1mbhvHlcqQsolvM1WzL5raghgNkxrB4pS\noBDDVK7dCNQMwJR6LnYgCjJMZqMvDI/+4mdcX9aVEQKBgQDx/N6CJ6oWc0LbUtDD\nSa3PhIXrRYgADZqiJwfefNDMudKvo7PVU+4Z3kwBSl8oQvAMwJJi5KrKCwaizbQ8\nd/cqmzfMrAWMQ+nu3ukcFAmknmHY8nhVD+Nq8iIsiYxfuaS6U4j3U3sRsO8sDKma\ncMksUSDFFbYjlBx7zkdTyaDIRQKBgQDc7o3Xh7WSlAYz1ibfUc+eSSHNPBPlbxgJ\ntf99NQbwQ2FJiW/vjaVIb5Sxmx4+UOkdqSllq9C0HcLsxH/db+BpqjvODL3VRGyy\nZ1lPu5QA9On4CDUwC8zmk8cmy6ZEC1GpyfbB9QJrto3WqlnAuK4bh70T5387jXM1\nRfJ0F/c7GQKBgQC0iRGATRNKWIeilXCGoet4jMhUtLU4RO3+19u5E6m7c09KFnnO\nSCW1SvGtbMz9fqMVAH62JR9+SSeUQp+bFW1jbhX9LsGc2fYnbkq/1fszw64AazV3\nULk8SpVQYPZHXHsXP8dJrhB9LGHjnTbTsB2GYKhwITiX5qIxg74XNrAreQKBgQCj\novliIv0klQjHCh3+mFzb0zT7Cz19WTyHrMqQVV9PQ8jiK67B0rsSHLsYlVjgNROE\nyY+E466QSd7feWdvfvbLrK/hHOTZ+nU76npnKPslfkFxWbrzXDomqlv+ayY6Ddwt\nkw52eF+TokIKNmCF8wPaFj7AaF1/oXQsiCNdQ4b1uQKBgQCArJbNN0l+pfPCsv9v\nJ0VRnjgk8I66kQDa/F+SuZNBVzppY5cNO3nv/Lt7oN/MCjTTSqFB6kzqWDS3iUiY\nS7hb4h0DFbXjRSwJJOptiuML641PKg3HgC/bLuY3u1rs9sPpa3uzph71JIWPPPkI\nDN22QRUSYXJzVodGQfENypDNvw==\n-----END PRIVATE KEY-----\n`),
  FIREBASE_CLIENT_EMAIL: z.string().default('firebase-adminsdk-fbsvc@office-backend-eea40.iam.gserviceaccount.com'),
});

const parseEnv = () => {
  try {
    // Process the private key - remove indentation and extra spaces
    const processedEnv = { ...process.env };
    if (processedEnv.FIREBASE_PRIVATE_KEY) {
      processedEnv.FIREBASE_PRIVATE_KEY = processedEnv.FIREBASE_PRIVATE_KEY
        .replace(/\\n/g, '\n')
        .replace(/^\s+/gm, '');
    }
    
    const parsed = envSchema.parse(processedEnv);
    
    // Additional processing for the private key
    parsed.FIREBASE_PRIVATE_KEY = parsed.FIREBASE_PRIVATE_KEY
      .replace(/\\n/g, '\n')
      .trim();
    
    return parsed;
  } catch (error) {
    console.error('Invalid environment variables:', error.errors);
    process.exit(1);
  }
};

const env = parseEnv();

module.exports = { env };