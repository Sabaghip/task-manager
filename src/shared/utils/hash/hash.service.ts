import { Injectable } from '@nestjs/common'
import { genSalt, hash, compareSync } from 'bcrypt'

@Injectable()
export class HashService {
  private saltRounds = 10

  async md5er(phrase: string): Promise<string> {
    const salt = await this._saltGenerator()
    const hashedPhrase = await hash(phrase, salt)
    return hashedPhrase
  }

  verify(plainText: string, hashed: string): boolean {
    return compareSync(plainText, hashed)
  }

  private async _saltGenerator(): Promise<string> {
    return await genSalt(this.saltRounds)
  }
}
