import express from 'express';
import {
    createPermission,
    createBulkPermissions,
    updatePermission,
    deletePermission,
    getAllPermissions,
} from '../../controllers/permissionController.js';
const router = express.Router();

// Create a new permission
router.post('/', createPermission);

// Create multiple permissions in bulk
router.post('/bulk', createBulkPermissions);

// Get all permissions
router.get('/', getAllPermissions);

// Update a permission by ID
router.put('/:id', updatePermission);

// Delete a permission by ID
router.delete('/:id', deletePermission);

export default router;
