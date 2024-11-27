export class AdvisorySessionErrors {
  AdvisorIdentity?: string;
  AdviseeIdentity?: string;
  AdviseeStudentId?: string;
  LearningUnitIdentity?: string;
  Professor?: string;
  Topic?: string;
  ClassType?: string;
  StartTime?: string;
  EndTime?: string;

  constructor(AdvisorIdentity?: string, AdviseeIdentity?: string, ClassType?: string, Professor?: string, AdviseeStudentId?: string, LearningUnitIdentity?: string, Topic?: string, StartTime?: string, EndTime?: string) {
    this.AdvisorIdentity = AdvisorIdentity;
    this.AdviseeIdentity = AdviseeIdentity;
    this.AdviseeStudentId = AdviseeStudentId;
    this.LearningUnitIdentity = LearningUnitIdentity;
    this.Professor = Professor;
    this.ClassType = ClassType;
    this.Topic = Topic;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
  }
}
