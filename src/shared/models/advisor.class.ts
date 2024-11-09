export class Advisor {
  Enrollment: number;
  Gender: string;
  Name: string;
  //Este dato me lo debe traer con mi DegreeIdentity
  // DegreeIdentity: number;
  DegreeIdentity: string;
  //------------------------------------------------

  constructor(Enrollment: number = 0, Gender: string = 'Masculino', Name: string = '', DegreeIdentity: string = '') {
    this.Enrollment = Enrollment;
    this.Gender = Gender;
    this.Name = Name;
    this.DegreeIdentity = DegreeIdentity;
  }
}
