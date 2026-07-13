type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: Category;
  discount?: number;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  membership: Membership;
  phone?: string;
};

type OrderItem = {
  productId: string;
  quantity: number;
};

type Order = {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  shippingAddress: string;
  note?: string;
};

type Category = "computer" | "accessory" | "network";
type Membership = "regular" | "silver" | "gold";

type OrderSuccess = {
  success: true;
  orderId: string;
  customerName: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  message: string;
};

type OrderFailure = {
  success: false;
  orderId: string;
  errorCode: ErrorCode;
  message: string;
};

type ErrorCode =
  | "CUSTOMER_NOT_FOUND"
  | "PRODUCT_NOT_FOUND"
  | "INVALID_QUANTITY"
  | "OUT_OF_STOCK"
  | "INVALID_PRICE"
  | "INVALID_DISCOUNT"
  | "EMPTY_ORDER";

type OrderResult = OrderSuccess | OrderFailure;

const customers: Customer[] = [
  { id: "c1", name: "Nguyen Van A", email: "a@mail.com", membership: "gold" },
  { id: "c2", name: "Tran Thi B", email: "b@mail.com", membership: "silver" },
];

const products: Product[] = [
  { id: "p1", name: "Laptop Dell", price: 1000, stock: 10, category: "computer" },
  { id: "p2", name: "Mouse Logitech", price: 20, stock: 50, category: "accessory", discount: 10 },
];

// ===== Tìm customer va product =====
function findCustomer(customerId: string): Customer | undefined {
  return customers.find((c) => c.id === customerId);
}

function findProduct(productId: string): Product | undefined {
  return products.find((p) => p.id === productId);
}

// ===== Kiểm tra quantity, price, discount =====
function isValidQuantity(quantity: number, stock: number): boolean {
  return quantity > 0 && quantity <= stock;
}

function isValidPrice(price: number): boolean {
  return price >= 0;
}

function isValidDiscount(discount?: number): boolean {
  if (discount === undefined) return true;
  return discount >= 0 && discount <= 100;
}

// ===== Giảm giá sản phẩm, thành viên, phí giao hàng, cập nhật tồn kho =====
function applyProductDiscount(price: number, discount?: number): number {
  if (!discount) return price;
  return price - (price * discount) / 100;
}

function applyMembershipDiscount(amount: number, membership: Membership): number {
  const rate = membership === "gold" ? 10 : membership === "silver" ? 5 : 0;
  return amount - (amount * rate) / 100;
}

function calculateShippingFee(subtotal: number, membership: Membership): number {
  if (membership === "gold") return 0;
  if (subtotal >= 500) return 0;
  return subtotal * 0.3;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function processOrder(order: Order): OrderResult {
  const customer = findCustomer(order.customerId);
  if (!customer) {
    return {
      success: false,
      orderId: order.orderId,
      errorCode: "CUSTOMER_NOT_FOUND",
      message: "Không tìm thấy khách hàng.",
    };
  }

  if (order.items.length === 0) {
    return {
      success: false,
      orderId: order.orderId,
      errorCode: "EMPTY_ORDER",
      message: "Đơn hàng không có sản phẩm nào.",
    };
  }

  // Gộp sản phẩm trùng, cộng dồn quantity
  const mergedItemsMap = new Map<string, number>();
  for (const item of order.items) {
    const current = mergedItemsMap.get(item.productId) ?? 0;
    mergedItemsMap.set(item.productId, current + item.quantity);
  }

  let subtotal = 0;
  const stockUpdates: { product: Product; quantity: number }[] = [];

  for (const [productId, quantity] of mergedItemsMap) {
    const product = findProduct(productId);
    if (!product) {
      return {
        success: false,
        orderId: order.orderId,
        errorCode: "PRODUCT_NOT_FOUND",
        message: `Không tìm thấy sản phẩm ${productId}.`,
      };
    }

    if (!isValidQuantity(quantity, product.stock)) {
      if (quantity <= 0) {
        return {
          success: false,
          orderId: order.orderId,
          errorCode: "INVALID_QUANTITY",
          message: `Số lượng không hợp lệ cho sản phẩm ${product.name}.`,
        };
      }
      return {
        success: false,
        orderId: order.orderId,
        errorCode: "OUT_OF_STOCK",
        message: `Sản phẩm ${product.name} không đủ hàng trong kho.`,
      };
    }

    if (!isValidPrice(product.price)) {
      return {
        success: false,
        orderId: order.orderId,
        errorCode: "INVALID_PRICE",
        message: `Giá sản phẩm ${product.name} không hợp lệ.`,
      };
    }

    if (!isValidDiscount(product.discount)) {
      return {
        success: false,
        orderId: order.orderId,
        errorCode: "INVALID_DISCOUNT",
        message: `Discount của sản phẩm ${product.name} không hợp lệ.`,
      };
    }

    const priceAfterDiscount = applyProductDiscount(product.price, product.discount);
    subtotal += priceAfterDiscount * quantity;
    stockUpdates.push({ product, quantity });
  }

  // Giảm giá thành viên
  subtotal = applyMembershipDiscount(subtotal, customer.membership);

  // Phí giao hàng
  const shippingFee = calculateShippingFee(subtotal, customer.membership);
  const total = round(subtotal + shippingFee);

  // Cập nhật tồn kho (chỉ khi toàn bộ hợp lệ)
  for (const { product, quantity } of stockUpdates) {
    product.stock -= quantity;
  }

  return {
    success: true,
    orderId: order.orderId,
    customerName: customer.name,
    subtotal: round(subtotal),
    shippingFee: round(shippingFee),
    total,
    message: "Đặt hàng thành công.",
  };
}

// ===== Ví dụ sử dụng =====
const result = processOrder({
  orderId: "o1",
  customerId: "c1",
  items: [
    { productId: "p1", quantity: 1 },
    { productId: "p2", quantity: 2 },
  ],
  shippingAddress: "123 Đường ABC, Q1, TP.HCM",
});

console.log(result);