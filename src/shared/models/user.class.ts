export class User {
  Enrollment: number;
  Name: string;
  Password: string;
  Type: number;
  Active: boolean;

  constructor(Enrollment: number = 0, Name: string = '', Password: string = '', Type: number = 1, Active: boolean = true) {
    this.Enrollment = Enrollment;
    this.Name = Name;
    this.Password = Password;
    this.Type = Type;
    this.Active = Active;
  }
}
