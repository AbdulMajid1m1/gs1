import { wtracePrisma, gs1dlPrisma } from '../../prismaMultiClinets.js';

export const ifBatch = async (request) => {
    let getLatLong = [];
    if (request.serial) {
        getLatLong = await wtracePrisma.tblGLNTagIDEvents.findMany({
            where: {
                AND: [
                    { ItemRefNo: request.gtin },
                    { Batch: request.batch },
                    { Serial: request.serial },
                ],
            },
            include: {
                tbltrxEventMaster: {
                    select: {
                        TrxEventDescription: true,
                    },
                },
            },
        });
    } else {
        getLatLong = await wtracePrisma.tblGLNTagIDEvents.findMany({
            where: {
                AND: [
                    { ItemRefNo: request.gtin },
                    { Batch: request.batch },
                ],
            },
            include: {
                tbltrxEventMaster: {
                    select: {
                        TrxEventDescription: true,
                    },
                },
            },
        });
    }
    return getLatLong;
};

export const ifSerial = async (request) => {
    let getLatLong = [];
    if (request.batch) {
        getLatLong = await gs1dlPrisma.tblGLNTagIDEvents.findMany({
            where: {
                AND: [
                    { ItemRefNo: request.gtin },
                    { Batch: request.batch },
                    { Serial: request.serial },
                ],
            },
            include: {
                tbltrxEventMaster: {
                    select: {
                        TrxEventDescription: true,
                    },
                },
            },
        });
    } else {
        getLatLong = await gs1dlPrisma.tblGLNTagIDEvents.findMany({
            where: {
                AND: [
                    { ItemRefNo: request.gtin },
                    { Serial: request.serial },
                ],
            },
            include: {
                tbltrxEventMaster: {
                    select: {
                        TrxEventDescription: true,
                    },
                },
            },
        });
    }
    return getLatLong;
};

export const normalSearch = async (request) => {
    return await wtracePrisma.tblGLNTagIDEvents.findMany({
        where: {
            OR: [
                { ItemRefNo: request.gtin },
                { Batch: request.batch },
                { Serial: request.serial },
            ],
        },
    });
};

export const brandOwnerMarkers = async (request) => {
    let markerDetails = [];
    if (request.checkBox == 1) {
        const getGTIN = await prisma.products.findFirst({
            where: {
                barcode: request.gtin,
            },
            select: {
                user_id: true,
            },
        });
        const user = await prisma.users.findFirst({
            where: {
                id: getGTIN.user_id,
            },
            select: {
                company_name_eng: true,
            },
        });
        const getBrandOwnerData = await prisma.add_member_gln_products.findMany({
            where: {
                user_id: user.id,
            },
            select: {
                latitude: true,
                longitude: true,
                AddressEn: true,
                locationNameEn: true,
            },
        });

        if (getBrandOwnerData) {
            markerDetails = getBrandOwnerData.map((value) => ({
                latitude: value.latitude,
                longitude: value.longitude,
                name: value.AddressEn,
                description: user.company_name_eng,
                locationName: value.locationNameEn,
                serial: '',
                type: 'brand_owner',
            }));
        }
    }
    return markerDetails;
};