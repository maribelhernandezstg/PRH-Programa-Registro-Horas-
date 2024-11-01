export interface Advisor {
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
}
