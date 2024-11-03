export class AdvisorySession {
  Identity: number;
  //------------------------------------------------
  //Este dato me lo debe traer con mi LearningUnitIdentity
  // LearningUnitIdentity: number;
  LearningUnitIdentity: string;
  //------------------------------------------------
  Topic: string;
  Professor: string;
  ClassType: string;
  //------------------------------------------------
  //Este dato me lo debe traer con mi AdvisorIdentity
  // AdvisorIdentity: number;
  AdvisorIdentity: string;
  //------------------------------------------------
  //Este dato me lo debe traer con mi AdviseeIdentity
  //AdviseeIdentity: number;
  AdviseeIdentity: string;
  //------------------------------------------------
  //Este dato me lo debe traer con mi AdviseeIdentity
  //------------------------------------------------
  AdviseeStudentId: string;
  //------------------------------------------------
  SessionDate: Date;
  StartTime: Date;
  EndTime: Date;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  constructor(Identity: number = 0, LearningUnitIdentity: string = '', Topic: string = '', Professor: string = '', ClassType: string = '', AdvisorIdentity: string = '', AdviseeIdentity: string = '', AdviseeStudentId: string = '', SessionDate: Date = new Date(), StartTime: Date = new Date(), EndTime: Date = new Date(), UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Identity = Identity;
    this.LearningUnitIdentity = LearningUnitIdentity;
    this.Topic = Topic;
    this.Professor = Professor;
    this.ClassType = ClassType;
    this.AdvisorIdentity = AdvisorIdentity;
    this.AdviseeIdentity = AdviseeIdentity;
    this.AdviseeStudentId = AdviseeStudentId;
    this.SessionDate = SessionDate;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
    this.UserCreation = UserCreation;
    this.CreatedAt = CreatedAt;
    this.UserUpdate = UserUpdate;
    this.UpdatedAt = UpdatedAt;
    this.Active = Active;
  }
}
