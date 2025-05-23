export class EndPoints {
  static readonly LOGIN = 'http://localhost:8082/login/authenticate';
  static readonly REGISTER = 'http://localhost:8082/user/register';
  static readonly UPDATE_USER = 'http://localhost:8082/api/user';
  static readonly GET_USERS = 'http://localhost:8082/api/users';
  static readonly POST_USER = 'http://localhost:8082/api/user';
  static readonly DELETE_USER = 'http://localhost:8082/api/user';
  static readonly GET_CATEGORIES = 'http://localhost:8082/api/categories';
  static readonly POST_CATEGORY = 'http://localhost:8082/api/category';
  static readonly PUT_CATEGORY = 'http://localhost:8082/api/category';
  static readonly DELETE_CATEGORY = 'http://localhost:8082/api/category';
  static readonly GET_ITEMS = 'http://localhost:8082/api/items';
  static readonly POST_ITEM = 'http://localhost:8082/api/item';
  static readonly DELETE_ITEM = 'http://localhost:8082/api/item';
  static readonly PUT_ITEM = 'http://localhost:8082/api/item';
  static readonly PUT_ITEM_CATEGORY = 'http://localhost:8082/api/item';
  static readonly GET_ORDERS = 'http://localhost:8082/api/orders';
  static readonly DELETE_ORDER = 'http://localhost:8082/api/order';
  static readonly CREATE_ORDER = 'http://localhost:8082/api/order';
  static readonly GET_ORDER = 'http://localhost:8082/api/order';
  static readonly GET_USER_ORDERS = 'http://localhost:8082/api/orders';
}
