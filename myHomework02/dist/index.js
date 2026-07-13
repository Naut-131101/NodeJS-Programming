"use strict";
const customers = [
    { id: "c1", name: "Nguyen Van A", email: "a@mail.com", membership: "gold" },
    { id: "c2", name: "Tran Thi B", email: "b@mail.com", membership: "silver" },
];
const products = [
    { id: "p1", name: "Laptop Dell", price: 1000, stock: 10, category: "computer" },
    { id: "p2", name: "Mouse Logitech", price: 20, stock: 50, category: "accessory", discount: 10 },
];
// ===== Tìm customer va product =====
function findCustomer(customerId) {
    return customers.find((c) => c.id === customerId);
}
function findProduct(productId) {
    return products.find((p) => p.id === productId);
}
// ===== Kiểm tra quantity, price, discount =====
function isValidQuantity(quantity, stock) {
    return quantity > 0 && quantity <= stock;
}
function isValidPrice(price) {
    return price >= 0;
}
function isValidDiscount(discount) {
    if (discount === undefined)
        return true;
    return discount >= 0 && discount <= 100;
}
// ===== Giảm giá sản phẩm, thành viên, phí giao hàng, cập nhật tồn kho =====
function applyProductDiscount(price, discount) {
    if (!discount)
        return price;
    return price - (price * discount) / 100;
}
function applyMembershipDiscount(amount, membership) {
    const rate = membership === "gold" ? 10 : membership === "silver" ? 5 : 0;
    return amount - (amount * rate) / 100;
}
function calculateShippingFee(subtotal, membership) {
    if (membership === "gold")
        return 0;
    if (subtotal >= 500)
        return 0;
    return subtotal * 0.3;
}
function round(value) {
    return Math.round(value * 100) / 100;
}
function processOrder(order) {
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
    const mergedItemsMap = new Map();
    for (const item of order.items) {
        const current = mergedItemsMap.get(item.productId) ?? 0;
        mergedItemsMap.set(item.productId, current + item.quantity);
    }
    let subtotal = 0;
    const stockUpdates = [];
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
