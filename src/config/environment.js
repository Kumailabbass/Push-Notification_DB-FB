const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

// const envSchema = z.object({
//   NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
//   PORT: z.coerce.number().default(3000),
//   HOST: z.string().default('localhost'),
//   DB_HOST: z.string(),
//   DB_PORT: z.coerce.number().default(5432),
//   DB_USERNAME: z.string(),
//   DB_PASSWORD: z.string(),
//   DB_DATABASE: z.string(),
//   FIREBASE_PROJECT_ID: z.string(),
//   FIREBASE_PRIVATE_KEY: z.string(),
//   FIREBASE_CLIENT_EMAIL: z.string(),
// });
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  HOST: z.string().default('localhost'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_USERNAME: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('.kumailskar.'),
  DB_DATABASE: z.string().default('crud-app2'),
  FIREBASE_PROJECT_ID: z.string().default('attendance-8f8b4'),
  FIREBASE_PRIVATE_KEY: z.string().default(`-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCnNtJ3GrIZbqL+\nqALB/xlXKkKQ8ZMGrInST7E25b6JKKoib7eVb4g66Gu61dREyspw0NGESgelenFR\nLGIAeHFFGI8lzmQdsQQn1B7kGKbgTYBQ/F8PoaND4168KD0Jgup9D5cW3KlIo2My\n3hjkNkBrf4DXa9+sGI//YGgi0ssO6Scee+x0aCmYbofbGwwol/LsKxOJWn8jPj8n\nFy4q3o/FjX2Crk8Sj4Kc6Du8jIprfvkxIlOcl8kY8CkYMrfVTWlWtXcBMpW/amzo\nmcLvooS7ehT99TqPTVZzhrtEp19SoWsOOaC4T5l52Ljgc7gtn1zr7fVT2zj326t5\nqvosrMh3AgMBAAECggEADtu8vO+m1sKxgh5szE8+MbQkIRwOPAAV6RXCwgWNNkPi\nRlgWAJXeDZn8hKgeihRZA8hSbcZkQoyMSDHA7ZjGO+UQR0Q9OjQyEdXz/sHABlts\npQWf7tQmnVA1aVPMBK3Y50781n+6HSXDmVAJ9zFo7QRx7vJ7eB/gn8kxx7Jib8sb\n/9xDzE0sz0MJLGT6fVd0+ouQ3adU5kb6TN3mOjpcy1KfqE5POu0nbqWCcQPkEVLe\noBx7Bjkuz53Sf+iAXYZH3lRb7OpUvST+o16WjwvgDq4bCkJRoXFseIcxOalgBvde\nXUk59GTGEWRb6Qsi+Ll+fFdYMKVvn4aAOoCq8ZBMRQKBgQDmIa/SE6Sdqb7rFOAa\n+VWeCjsobJSntfiaPg5UY37XJIPpqDMoHK6JLI5OG4Sn+mqJ/hIWVwewEP/ZVY20\npLV3oiFYkXepObIcbegvn+9vI4dvSrW4NQauJjwcH5gOngtzdykQ/6B0fuDPkom8\nRfYfdTcLRko8aeBFYUk+YfYXwwKBgQC6Apw+7Xr8baYTcmoHN2Tesk4Er/attEXF\nzI/TPsPLdStLrK0np0ijSVFJSL6wE4k842dRWjcC/nWi91STcVylpmncv5gI9yXk\nzkBWjY3NRvd5IYFo6Q4bXm28AsRKHlBR/JX9qN7dUYzr/XzJgtc8G7QC9OY8Gait\nYD0YbU91PQKBgBaQkwbMOkXjUP8H6vl6HTUD180c6G6RXzDwiMMphlReFjkg7vMt\n7McygTmTZSx7V1r0eJ2MJwrSf+O1idF+nPSABzkB+nOzXo1/EVcqHXYOS8dT0gGf\n4WnOAfLX/jbgtEq8EmDCT99cWXrA6ZR2X62x9pW6bKkD0KO86Eufm1u1AoGAGxOu\nMurW8E/10PbiwFIr+M7z1HLY8chAL97rQNDuJ3vS5Z0pR5BuXnaZwpU4TOFLJPXl\nYE5Fm8X20dY3FY928RYcauno88UmWvw7GV5ZufwOoi9iaychypIgXzH36OIoxwaB\nvv8KEiWA4glwVNUbB8Dwn02PBkil6TcNLbUbz/ECgYAwSgbBViEuRRMs4sZT1Whp\nsjU6L6tCskpD/Se4ENZYArZDBM0rrNkRzzuDVPeJ8pJmBH1vtfkEUic9hw1JabUC\nsBWPRQ+A1XB7ONpYtFnBCRryqUM8C4IkAXRkB/UGzk4TIUanC9YRzX76B6NgxpIl\nEKqxq7O7nhCpfTIWtFGc4g==\n-----END PRIVATE KEY-----\n",`),
  FIREBASE_CLIENT_EMAIL: z.string().default('firebase-adminsdk-fbsvc@attendance-8f8b4.iam.gserviceaccount.com'),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('Invalid environment variables:', error);
    process.exit(1);
  }
};

const env = parseEnv();

module.exports = { env };