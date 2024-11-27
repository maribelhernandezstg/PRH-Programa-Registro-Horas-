import { Advisee } from './advisee.class';
import { Advisor } from './advisor.class';
import { LearningUnit } from './learning-unit.class';

export class AdvisorySession {
  Identity: number;
  LearningUnitIdentity: number;
  Topic: string;
  Professor: string;
  ClassType: string;
  AdvisorIdentity: number;
  AdviseeIdentity: number;
  SessionDate: Date;
  StartTime: string;
  EndTime: string;
  UserCreation: number;
  CreatedAt: Date;
  UserUpdate: number;
  UpdatedAt: Date;
  Active: boolean;

  learningUnit: LearningUnit;
  advisor: Advisor;
  advisee: Advisee;

  constructor(Identity: number = 0, learningUnit: any = {}, advisor: any = {}, advisee: any = {}, LearningUnitIdentity: number = 0, Topic: string = '', Professor: string = '', ClassType: string = '', AdvisorIdentity: number = 0, AdviseeIdentity: number = 0, SessionDate: Date = new Date(), StartTime: string = '', EndTime: string = '', UserCreation: number = 0, CreatedAt: Date = new Date(), UserUpdate: number = 0, UpdatedAt: Date = new Date(), Active: boolean = true) {
    this.Identity = Identity;
    this.learningUnit = learningUnit;
    this.advisor = advisor;
    this.advisee = advisee;
    this.LearningUnitIdentity = LearningUnitIdentity;
    this.Topic = Topic;
    this.Professor = Professor;
    this.ClassType = ClassType;
    this.AdvisorIdentity = AdvisorIdentity;
    this.AdviseeIdentity = AdviseeIdentity;
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
