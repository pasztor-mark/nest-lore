import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "./auth.constants";
import {JwtBlacklistUtil} from "./jwt-blacklist.util";
import {UnauthorizedException} from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor
    (private readonly jwtBlacklistUtil: JwtBlacklistUtil) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }
    async validate(payload: any) {
        return {userId: payload.sub, email: payload.email};
    }
}