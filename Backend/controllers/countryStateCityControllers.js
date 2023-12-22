import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

const countrySchema = Joi.object({
    name_en: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255),
    country_code: Joi.string().max(255).required(),
    country_shortName: Joi.string().max(255),
    status: Joi.number().integer().min(0).max(1),
});
const stateSchema = Joi.object({
    name: Joi.string().max(255).required(),
    country_id: Joi.number().required(),
});
const citiesSchema = Joi.object({
    name: Joi.string().max(255).required(),
    state_id: Joi.number().required(),
});
//--------------------Country---------------------------------------
export const getAllCountries = async (req, res, next) => {
    try {
        const countries = await prisma.countries.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });

        res.json(countries);
    } catch (error) {
        next(error);
    }
};
export const getAllCountriesName = async (req, res, next) => {
    try {
        const countries = await prisma.countries.findMany({
            select: {
                name_en: true,
                id: true,
            },
        });

        res.json(countries);
    } catch (error) {
        next(error);
    }
};
export const createCountries = async (req, res, next) => {
    try {
        const { error, value } = countrySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.countries.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getCountriesById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.countries.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'countries not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateCountries = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = countrySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name_en, name_ar,country_code,country_shortName,status } = req.body;
        const updatedUNSPSC = await prisma.countries.update({
            where: {id: id },
            data: {
                name_en,
                name_ar,
                country_code,
                country_shortName,
                status
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteCountries = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.countries.delete({
            where: { id: id },
        });
        return res.json({ message: 'countries deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//--------------------STATE---------------------------------------
export const getAllStates = async (req, res, next) => {
    try {
        const states = await prisma.states.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });
        if (states.length === 0) {
            return next(createError(404, 'No states found'));
        }
        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const getAllStatesName = async (req, res, next) => {
    try {
        const states = await prisma.states.findMany({
            select: {
                name: true,
                id: true,
            },
        });
        if (states.length === 0) {
            return next(createError(404, 'No states found'));
        }
        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const createStates = async (req, res, next) => {
    try {
        const { error, value } = stateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.states.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getStatesById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.states.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'states not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateStates = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = stateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, country_id } = req.body;
        const updatedUNSPSC = await prisma.states.update({
            where: {id: id },
            data: {
                name,
                country_id,
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteStates = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.states.delete({
            where: { id: id },
        });
        return res.json({ message: 'States deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//---------------------CITIES-----------------------------------------
export const getAllCities = async (req, res, next) => {
    try {
        const cities = await prisma.cities.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });
        if (cities.length === 0) {
            return next(createError(404, 'No Cities found'));
        }
        res.json(cities);
    } catch (error) {
        next(error);
    }
};
export const createCities = async (req, res, next) => {
    try {
        const { error, value } = citiesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.cities.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getCitiesById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.cities.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'cities not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateCities = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = citiesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, state_id } = req.body;
        const updatedUNSPSC = await prisma.cities.update({
            where: {id: id },
            data: {
                name,
                state_id,
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteCities = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.cities.delete({
            where: { id: id },
        });
        return res.json({ message: 'cities deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//--------------------------------------------------------------------
export const getStateByCountryId = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const states = await prisma.states.findMany({
            where: {
                country_id: +id,
            },
        });

        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const getCityByStateId = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cities = await prisma.cities.findMany({
            where: {
                state_id: +id,
            },
        });

        res.json(cities);
    } catch (error) {
        next(error);
    }
}







