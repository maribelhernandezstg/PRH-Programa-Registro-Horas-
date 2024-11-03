export class AdvisorErrors {
  Enrollment?: string;
  Gender?: string;
  Name?: string;
  DegreeIdentity?: string;

  constructor(Enrollment?: string, Gender?: string, Name?: string, DegreeIdentity?: string) {
    this.Enrollment = Enrollment;
    this.Gender = Gender;
    this.Name = Name;
    this.DegreeIdentity = DegreeIdentity;
  }
}
