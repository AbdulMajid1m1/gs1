import express from 'express';
import {
    createRole,
    updateRole,
    deleteRole,
    getRoles,
    getRole,
    assignRoleToAdmin,
    getRolesAssignedToAdmin,
    deleteRoleAssignedToAdmin,
} from '../../controllers/roleController.js';

const router = express.Router();

// Create a new role
router.post('/', createRole);

// Get all roles
router.get('/', getRoles);


// Get a single role by ID
router.get('/:id', getRole);



// Update a role by ID
router.put('/:id', updateRole);

// Delete a role by ID
router.delete('/:id', deleteRole);


// Assign a role to an admin user
router.post('/adminRoles/assignRole', assignRoleToAdmin);


router.get('/adminRoles/getAssignRolesToAdmin', getRolesAssignedToAdmin);

router.delete('/adminRoles/assignRole', deleteRoleAssignedToAdmin);

export default router;