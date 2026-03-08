import dotenv from 'dotenv'

dotenv.config();

interface EnvConfig {
    EMAILJS_SERVICE_ID: string;
    EMAILJS_TEMPLATE_ID: string;
    EMAILJS_PUBLIC_KEY: string;
}

const loadEnvVariables = (): EnvConfig => {

    const requiredEnvVariable = [
        'EMAILJS_SERVICE_ID',
        'EMAILJS_TEMPLATE_ID',
        'EMAILJS_PUBLIC_KEY',
    ]

    requiredEnvVariable.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Environment variable ${variable} is required but not set in .env file.`)
        }
    })
    return {
        EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID as string,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID as string,
        EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY as string,
    }
}

export const envVars = loadEnvVariables();