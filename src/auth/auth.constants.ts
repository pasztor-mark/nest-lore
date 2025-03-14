import {env} from "node:process";

export const jwtConstants = {
    secret: env.JWT_SECRET
}
