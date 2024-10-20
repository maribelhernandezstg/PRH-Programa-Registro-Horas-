export interface AdvisorySession {
  Identity: number;
  LearningUnitIdentity: number;
  Topic: string;
  Professor: string;
  ClassType: string;
  AdvisorIdentity: number;
  AdviseeIdentity: number;
  SessionDate: Date;
  StartTime: Date;
  EndTime: Date;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;
}
