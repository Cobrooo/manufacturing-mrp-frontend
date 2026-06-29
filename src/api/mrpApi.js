// src/api/mrpApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Items
export const getAllItems = () => apiClient.get('/items');
export const getFinishedGoods = () => apiClient.get('/items/finished-goods');
export const getItemById = (id) => apiClient.get(`/items/${id}`);

// BOM Links
export const getBomLinksByParent = (parentId) =>
    apiClient.get(`/bom-links/parent/${parentId}`);

// MRP Explosion
export const explodeBom = (productId, targetQuantity) =>
    apiClient.post('/mrp/explode', { productId, targetQuantity });

// Inventory
export const getAllInventory = () => apiClient.get('/inventory');

// Purchase Orders
export const getPendingPurchaseOrders = () =>
    apiClient.get('/purchase-orders/status/PENDING');

export const approvePurchaseOrder = (id) =>
    apiClient.put(`/purchase-orders/${id}/approve`);

export const rejectPurchaseOrder = (id) =>
    apiClient.put(`/purchase-orders/${id}/reject`);

export default apiClient;