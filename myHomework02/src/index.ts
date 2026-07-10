// ===========================
// TYPE DEFINITIONS
// ===========================

type Category = "computer" | "accessory" | "network";

type Membership = "regular" | "silver" | "gold";

type ErrorCode =
  | "CUSTOMER_NOT_FOUND"
  | "PRODUCT_NOT_FOUND"
  | "INVALID_QUANTITY"
  | "OUT_OF_STOCK"
  | "INVALID_PRICE"
  | "INVALID_DISCOUNT"
  | "EMPTY_ORDER";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: Category;
  discount?: number;
};

type Customer = {
  id: number;
  name: string;
  email: string;
  membership: Membership;
  phone?: string;
};

type OrderItem = {
  productId: number;
  quantity: number;
};

type Order = {
  orderId: number;
  customerId: number;
  items: OrderItem[];
  shippingAddress: string;
  note?: string;
};

type SuccessResult = {
  success: true;
  orderId: number;
  customerName: string;
  subtotal: number;
  shippingFee: number;
  totalPayment: number;
  message: string;
};

type FailedResult = {
  success: false;
  orderId: number;
  errorCode: ErrorCode;
  message: string;
};

type OrderResult = SuccessResult | FailedResult;

// ===========================
// SAMPLE DATA
// ===========================

const products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 1500,
    stock: 5,
    category: "computer",
    discount: 10,
  },

  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 120,
    stock: 20,
    category: "accessory",
    discount: 5,
  },

  {
    id: 3,
    name: "Gaming Mouse",
    price: 80,
    stock: 15,
    category: "accessory",
  },

  {
    id: 4,
    name: "WiFi Router",
    price: 300,
    stock: 10,
    category: "network",
    discount: 20,
  },
];

const customers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    membership: "gold",
    phone: "0901111111",
  },

  {
    id: 2,
    name: "Alice",
    email: "alice@gmail.com",
    membership: "silver",
  },

  {
    id: 3,
    name: "Bob",
    email: "bob@gmail.com",
    membership: "regular",
  },
];

// ===========================
// GENERIC FUNCTION
// ===========================

function findById<T extends { id: number }>(
  list: T[],
  id: number,
): T | undefined {
  return list.find((item) => item.id === id);
}

// ===========================
// FIND FUNCTIONS
// ===========================

function findCustomer(id: number): Customer | undefined {
  return findById(customers, id);
}

function findProduct(id: number): Product | undefined {
  return findById(products, id);
}

// ===========================
// VALIDATION
// ===========================

function validateQuantity(quantity: number, stock: number): true | ErrorCode {
  if (quantity <= 0) {
    return "INVALID_QUANTITY";
  }

  if (quantity > stock) {
    return "OUT_OF_STOCK";
  }

  return true;
}

function validatePrice(price: number): true | ErrorCode {
  if (price < 0) {
    return "INVALID_PRICE";
  }

  return true;
}

function validateDiscount(discount?: number): true | ErrorCode {
  if (discount === undefined) {
    return true;
  }

  if (discount < 0 || discount > 100) {
    return "INVALID_DISCOUNT";
  }

  return true;
}

// ===========================
// DISCOUNT
// ===========================

function applyProductDiscount(product: Product): number {
  const check = validateDiscount(product.discount);

  if (check !== true) {
    return product.price;
  }

  if (product.discount === undefined) {
    return product.price;
  }

  return product.price * (1 - product.discount / 100);
}

function getMemberDiscountRate(member: Membership): number {
  switch (member) {
    case "regular":
      return 0;

    case "silver":
      return 5;

    case "gold":
      return 10;
  }
}

function applyMemberDiscount(subtotal: number, membership: Membership): number {
  const rate = getMemberDiscountRate(membership);

  return subtotal * (1 - rate / 100);
}

// ===========================
// SHIPPING
// ===========================

function calculateShipping(total: number, membership: Membership): number {
  if (membership === "gold") {
    return 0;
  }

  if (total >= 500) {
    return 0;
  }

  return total * 0.3;
}

// ===========================
// MERGE DUPLICATE PRODUCT
// ===========================

function mergeOrderItems(items: OrderItem[]): OrderItem[] {
  const result: OrderItem[] = [];

  for (const item of items) {
    const existing = result.find((x) => x.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      result.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }
  }

  return result;
}

// ===========================
// CALCULATE SUBTOTAL
// ===========================

function calculateSubtotal(items: OrderItem[]): number | ErrorCode {
  let subtotal = 0;

  for (const item of items) {
    const product = findProduct(item.productId);

    if (!product) {
      return "PRODUCT_NOT_FOUND";
    }

    const priceCheck = validatePrice(product.price);

    if (priceCheck !== true) {
      return priceCheck;
    }

    const quantityCheck = validateQuantity(item.quantity, product.stock);

    if (quantityCheck !== true) {
      return quantityCheck;
    }

    const finalPrice = applyProductDiscount(product);

    subtotal += finalPrice * item.quantity;
  }

  return Number(subtotal.toFixed(2));
}

// ===========================
// UPDATE STOCK
// ===========================

function updateStock(items: OrderItem[]): void {
  for (const item of items) {
    const product = findProduct(item.productId);

    if (product) {
      product.stock -= item.quantity;
    }
  }
}

// ===========================
// PROCESS ORDER
// ===========================

function processOrder(order: Order): OrderResult {
  if (order.items.length === 0) {
    return {
      success: false,
      orderId: order.orderId,
      errorCode: "EMPTY_ORDER",
      message: "Order is empty.",
    };
  }

  const customer = findCustomer(order.customerId);

  if (!customer) {
    return {
      success: false,
      orderId: order.orderId,
      errorCode: "CUSTOMER_NOT_FOUND",
      message: "Customer not found.",
    };
  }

  const mergedItems = mergeOrderItems(order.items);

  const subtotalResult = calculateSubtotal(mergedItems);

  if (typeof subtotalResult !== "number") {
    return {
      success: false,
      orderId: order.orderId,
      errorCode: subtotalResult,
      message: subtotalResult,
    };
  }

  const afterMemberDiscount = applyMemberDiscount(
    subtotalResult,
    customer.membership,
  );

  const shippingFee = calculateShipping(
    afterMemberDiscount,
    customer.membership,
  );

  const totalPayment = Number((afterMemberDiscount + shippingFee).toFixed(2));

  updateStock(mergedItems);

  return {
    success: true,
    orderId: order.orderId,
    customerName: customer.name,
    subtotal: Number(subtotalResult.toFixed(2)),
    shippingFee,
    totalPayment,
    message: "Order processed successfully.",
  };
}

// ===========================
// TEST CASES
// ===========================

const order1: Order = {
  orderId: 1001,
  customerId: 1,
  shippingAddress: "Ho Chi Minh City",
  items: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

const order2: Order = {
  orderId: 1002,
  customerId: 100,
  shippingAddress: "Ha Noi",
  items: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const order3: Order = {
  orderId: 1003,
  customerId: 2,
  shippingAddress: "Da Nang",
  items: [
    {
      productId: 3,
      quantity: 100,
    },
  ],
};

const order4: Order = {
  orderId: 1004,
  customerId: 3,
  shippingAddress: "Can Tho",
  items: [],
};

console.log(processOrder(order1));
console.log(processOrder(order2));
console.log(processOrder(order3));
console.log(processOrder(order4));
console.log(products);
