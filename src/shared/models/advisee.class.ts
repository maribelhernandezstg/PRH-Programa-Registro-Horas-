export class Advisee {
  Enrollment: number;
  Gender: string;
  Name: string;
  //Este dato me lo debe traer con mi DegreeIdentity
  // DegreeIdentity: number;
  DegreeIdentity: string;
  //------------------------------------------------
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  constructor(Enrollment: number = 0, Gender: string = '', Name: string = '', DegreeIdentity: string = '', UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Enrollment = Enrollment;
    this.Gender = Gender;
    this.Name = Name;
    this.DegreeIdentity = DegreeIdentity;
    this.UserCreation = UserCreation;
    this.CreatedAt = CreatedAt;
    this.UserUpdate = UserUpdate;
    this.UpdatedAt = UpdatedAt;
    this.Active = Active;
  }
}
