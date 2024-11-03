export class LearningUnit {
  Identity: number;
  Name: string;
  DegreeIdentity: number;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  constructor(Identity: number = 0, Name: string = '', DegreeIdentity: number = 0, UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Identity = Identity;
    this.Name = Name;
    this.DegreeIdentity = DegreeIdentity;
    this.UserCreation = UserCreation;
    this.CreatedAt = CreatedAt;
    this.UserUpdate = UserUpdate;
    this.UpdatedAt = UpdatedAt;
    this.Active = Active;
  }
}
