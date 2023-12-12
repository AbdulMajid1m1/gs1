import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



export const getAllCountries = async (req, res, next) => {
    try {
        const countries = await prisma.countries.findMany();

        res.json(countries);
    } catch (error) {
        next(error);
    }
};
export const getAllStates = async (req, res, next) => {
    try {
        const states = await prisma.states.findMany();
        if (states.length === 0) {
            return next(createError(404, 'No states found'));
        }
        res.json(states);
    } catch (error) {
        next(error);
    }
};
export const getAllCities = async (req, res, next) => {
    try {
        const cities = await prisma.cities.findMany();
        if (cities.length === 0) {
            return next(createError(404, 'No Cities found'));
        }
        res.json(cities);
    } catch (error) {
        next(error);
    }
};
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







