import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtBlacklistUtil {
    private blacklistedTokens: Set<string> = new Set();

    addBlacklistedToken(token: string) {
        this.blacklistedTokens.add(token);
    }
    isTokenBlacklisted(token: string) {
        return this.blacklistedTokens.has(token);
    }
}