/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    DIRECT_URL: string;

    PWD_HASH: string;

    SESSION_SECRET: string;
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
    ACCESS_TOKEN_DURATION: string;

    BLOB_READ_WRITE_TOKEN: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URL: string;

    GMAIL_USER: string;
    GMAIL_SECRET: string;

    RECAPTCHA_PROJECT_ID: string;
    RECAPTCHA_SITE_KEY: string;
    GOOGLE_API_KEY: string;

    HELLO_ASSO_CLIENT_ID: string;
    HELLO_ASSO_CLIENT_SECRET: string;
  }
}
