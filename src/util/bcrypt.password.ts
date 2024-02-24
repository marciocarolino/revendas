import * as bcrypt from 'bcrypt';

export class BcryptPaswword {
  async crypt(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
