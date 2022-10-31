import { v4  } from 'uuid';

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(name: string, email: string, id: string | null = null) {
    this._id = id ?? v4();
    this._name = name;
    this._email = email;
    this._updatedAt = new Date();
    this._createdAt ??= new Date();
  }

  get name(){
    return this._name;
  }
  set name(value: string){
    this._name = value;
  }

  get email(){
    return this._email;
  }
  set email(value: string){
    this._email = value;
  }

  get createdAt(){
    return this._createdAt;
  }
  set createdAt(value: Date){
    this._createdAt = value;
  }
  
  get updatedAt(){
    return this._updatedAt;
  }
  set updatedAt(value: Date){
    this._updatedAt = value;
  }

  get id(){
    return this._id;
  }
  set id(value: string){
    this._id = value;
  }
}