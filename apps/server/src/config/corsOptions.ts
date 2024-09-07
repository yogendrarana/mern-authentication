import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Origin not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: "GET,PUT,PATCH,POST,DELETE",
};
