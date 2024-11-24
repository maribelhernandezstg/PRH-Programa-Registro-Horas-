import { Degree } from './degree.class';

export class Advisee {
  Enrollment: number;
  Gender: string;
  Name: string;
  DegreeIdentity: number;
  degree: Degree;
  Active: boolean;
  //------------------------------------------------
  constructor(Enrollment: number = 0, Gender: string = '', Name: string = '', DegreeIdentity: number = 0, degree: any = {}, Active = true) {
    this.Enrollment = Enrollment;
    this.Gender = Gender;
    this.degree = degree;
    this.Name = Name;
    this.DegreeIdentity = DegreeIdentity;
    this.Active = Active;
  }
}
