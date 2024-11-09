export class Degree {
  Identity: number;
  DegreeName: string;
  ShortName: string;

  constructor(Identity: number = 0, DegreeName: string = '', ShortName: string = '') {
    this.Identity = Identity;
    this.DegreeName = DegreeName;
    this.ShortName = ShortName;
  }
}
