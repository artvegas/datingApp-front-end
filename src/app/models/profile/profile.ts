import { User } from "../user/user";
export class Profile {

  public constructor(
  ) {  }

  public profileId: string;
  public profileName: string;
  public age: number;
  public m_f: string;
  public hobbies: string;
  public weight: number;
  public height: number;
  public hairColor: string;
  public datingAgeRangeStart: number;
  public datingAgeRangeEnd: number;
  public datingGeoRange: number;
  public user: User;
  public creationDate: Date;
  public lastModDate: Date;

  public setUser(user: User){
    this.user = user;
  }
  public setProfileName(profileName : string){
    this.profileName = name;
  }

  public setAge(age: number){
    this.age = age;
  }

  public setM_F(m_f: string){
    this.m_f = m_f;
  }

  public setHobbies(hobbies: string){
    this.hobbies = hobbies;
  }

  public setWeight(weight: number){
    this.weight = weight;
  }

  public setHeight(height: number){
    this.height = height;
  }

  public setHairColor(hairColor: string){
    this.hairColor = hairColor;
  }

  public setDatingAgeRangeStart(start: number){
    this.datingAgeRangeStart = start;
  }

  public setDatingAgeRangeEnd(end: number){
    this.datingAgeRangeEnd = end;
  }

  public setDatingGeoRange(miles: number){
    this.datingGeoRange = miles;
  }

  public setCreationDate(date: Date){
    this.creationDate = date;
  }

  public setLastModDate(date: Date){
    this.lastModDate = date;
  }



}
