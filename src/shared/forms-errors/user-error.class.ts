export class UserErrors {
  Enrollment?: string;
  Name?: string;
  Password?: string;
  Type?: string;

  constructor(Enrollment?: string, Name?: string, Password?: string, Type?: string) {
    this.Enrollment = Enrollment;
    this.Name = Name;
    this.Password = Password;
    this.Type = Type;
  }
}
