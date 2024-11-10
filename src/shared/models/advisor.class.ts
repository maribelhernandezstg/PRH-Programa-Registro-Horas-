import { Degree } from './degree.class';

export class Advisor {
  Enrollment: number;
  Gender: string;
  Name: string;
  DegreeIdentity: number;
  degree: Degree;
  //------------------------------------------------
  constructor(Enrollment: number = 0, Gender: string = '', Name: string = '', DegreeIdentity: number = 0, degree: any = {}) {
    this.Enrollment = Enrollment;
    this.Gender = Gender;
    this.degree = degree;
    this.Name = Name;
    this.DegreeIdentity = DegreeIdentity;
  }
}
