export class Degree {
  Identity: number;
  DegreeName: string;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  constructor(Identity: number = 0, DegreeName: string = '', UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Identity = Identity;
    this.DegreeName = DegreeName;
    this.UserCreation = UserCreation;
    this.CreatedAt = CreatedAt;
    this.UserUpdate = UserUpdate;
    this.UpdatedAt = UpdatedAt;
    this.Active = Active;
  }
}
