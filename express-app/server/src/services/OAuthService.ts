import jwt from "jsonwebtoken";

export interface ITokenPayload {
  id: string;
  email: string;
}

export default class OAuthService {
  private static readonly SECRET_KEY = "secret";

  public static generateToken(payload: ITokenPayload): string {
    return jwt.sign(payload, OAuthService.SECRET_KEY);
  }

  public static verifyToken(token: string): ITokenPayload | null {
    try {
      const payload = jwt.verify(token, OAuthService.SECRET_KEY) as ITokenPayload;
      return payload;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}