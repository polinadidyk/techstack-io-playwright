export class CredentialsDTO {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}

  static validAdmin(): CredentialsDTO {
    return new CredentialsDTO("admin", "123");
  }

  static invalid(): CredentialsDTO {
    return new CredentialsDTO("kjgh", "321");
  }

  static empty(): CredentialsDTO {
    return new CredentialsDTO("", "");
  }
}
