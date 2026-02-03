export class UserDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string
  ) {}

  static random(): UserDTO {
    const ts = Date.now();
    return new UserDTO("Test", "User", `test.user.${ts}@mail.com`);
  }
}
