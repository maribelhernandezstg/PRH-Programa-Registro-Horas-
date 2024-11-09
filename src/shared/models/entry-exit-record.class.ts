export class EntryExitRecord {
  Identity: number;
  AdvisorIdentity: number;
  EntryTime: Date;
  ExitTime: Date;
  CurrentDate: Date;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  constructor(Identity: number = 0, AdvisorIdentity: number = 0, EntryTime: Date = new Date(), ExitTime: Date = new Date(), CurrentDate: Date = new Date(), UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Identity = Identity;
    this.AdvisorIdentity = AdvisorIdentity;
    this.EntryTime = EntryTime;
    this.ExitTime = ExitTime;
    this.CurrentDate = CurrentDate;
    this.UserCreation = UserCreation;
    this.CreatedAt = CreatedAt;
    this.UserUpdate = UserUpdate;
    this.UpdatedAt = UpdatedAt;
    this.Active = Active;
  }
}
