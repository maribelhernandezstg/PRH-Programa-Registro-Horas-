export class AdvisorySessionErrors {
  AdvisorIdentity?: string;
  AdviseeIdentity?: string;
  AdviseeStudentId?: string;
  LearningUnitIdentity?: string;
  Topic?: string;
  StartTime?: string;
  EndTime?: string;

  constructor(AdvisorIdentity?: string, AdviseeIdentity?: string, AdviseeStudentId?: string, LearningUnitIdentity?: string, Topic?: string, StartTime?: string, EndTime?: string) {
    this.AdvisorIdentity = AdvisorIdentity;
    this.AdviseeIdentity = AdviseeIdentity;
    this.AdviseeStudentId = AdviseeStudentId;
    this.LearningUnitIdentity = LearningUnitIdentity;
    this.Topic = Topic;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
  }
}
