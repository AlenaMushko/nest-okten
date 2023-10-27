export class UserCreateProfileDto {
    id:string;
    userName:string;
    city:string;
    age:number;
    status:boolean
}

export class UserUpdateDto {
    id:string;
    userName:string;
    email:string;
    age:number;
    country:string;
    city:string;
    status:boolean
}
