export class User {
  Enrollment: number;
  Name: string;
  Password: string;
  Type: number;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  constructor(Enrollment: number = 0, Name: string = '', Password: string = '', Type: number = 0, UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Enrollment = Enrollment;
    this.Name = Name;
    this.Password = Password;
    this.Type = Type;
    this.UserCreation = UserCreation;
    this.CreatedAt = CreatedAt;
    this.UserUpdate = UserUpdate;
    this.UpdatedAt = UpdatedAt;
    this.Active = Active;
  }
}
