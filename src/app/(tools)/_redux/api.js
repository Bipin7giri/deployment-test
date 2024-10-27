import request, { METHOD_TYPE } from '../../../api/request';

export const getAllIpoDataReq = async (data) => {
    const IpoData = await request({
        url: `ipo/get/all`,
        method: METHOD_TYPE.GET,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return IpoData;
};
export const getAuctionData = async (data) => {
    const auctionData = await request({
        url: `auction/getAuctionData`,
        method: METHOD_TYPE.GET,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return auctionData;
};

export const getBuyCalculateReq = async (data) => {
    const buyCalculate = await request({
        url: `tools/calculator/buy`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return buyCalculate;
};

export const getSellCalculateReq = async (data) => {
    const sellCalculate = await request({
        url: `tools/calculator/sell`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return sellCalculate;
}

export const getCalenderInfoReq = async (data) => {
    const response = await request({
        url: `tools/get_info_calender/${data?.period}`,
        method: METHOD_TYPE.GET,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}

export const postPromoCodeRequestReq = async (data) => {
    const response = await request({
        url: `/promo-codes/collab-request`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}

export const postScreenerV2Req = async (data) => {
    const response = await request({
        url: `/screener/v2/ratios`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data?.action?.payload),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}

export const saveScrennerReq = async (data) => {
    const response = await request({
        url: `/screener/layout/save`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data?.action?.payload),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}

export const updateScreenerV2 = async (data) => {
    const response = await request({
        url: `/screener/layout/${data?.action?.payload.id}`,
        method: METHOD_TYPE.PATCH,
        data: JSON.stringify(data?.action?.payload),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}



export const getAllSavedScrennerReq = async ({ user_id }) => {
    const response = await request({
        url: `/screener/layout/load_by_uid/${user_id}`,
        method: METHOD_TYPE.GET,
        data: JSON.stringify(user_id),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}

export const getSavedScrennerByIDReq = async ({ id }) => {
    const response = await request({
        url: `/screener/layout/load/${id}`,
        method: METHOD_TYPE.GET,
        data: JSON.stringify(id),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
}

export const delScreenerById = async ({ id }) => {
    const response = await request({
        url: `/screener/layout/${id}`,
        method: METHOD_TYPE.DELETE,
    });
    return response;
}
export const getSectorRotation = async () => {
    const res = await request({
        url: "/sectorRotation/get_current_sector_rotatation",
        method: METHOD_TYPE.GET
    })
    return res?.data?.data;
};