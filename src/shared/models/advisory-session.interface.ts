export interface AdvisorySession {
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
}
