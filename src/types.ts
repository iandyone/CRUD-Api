export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | null;
}

/* 
id— уникальный идентификатор ( string, uuid), сгенерированный на стороне сервера
username— имя пользователя ( string, обязательно )
age— возраст пользователя ( number, обязательно )
hobbies— хобби пользователя ( arrayиз stringsили пусто array, обязательно )

*/
