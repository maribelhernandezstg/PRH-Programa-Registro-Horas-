export class EntryExitErrors {
  AdvisorIdentity?: string;
  StartTime?: string;
  EndTime?: string;

  constructor(AdvisorIdentity?: string, StartTime?: string, EndTime?: string) {
    this.AdvisorIdentity = AdvisorIdentity;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
  }
}
