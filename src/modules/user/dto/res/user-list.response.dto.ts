export class UserListResponseDto {
  data: UserListItemResponseDto[];
  total: number;
}

export class UserListItemResponseDto {
  id: string;
  userName: string;
  age: number;
  createdAt: Date;
}
