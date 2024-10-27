import request, { METHOD_TYPE } from '../../../../api/request';

export const getCompanyCompareReq = async (data) => {
    const response = await request({
        url: `company/compare`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
};

export const getCompanyBySectorReq = async (data) => {
    const response = await request({
        url: `company/company_by_sector`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
};

export const getCompanyRecentQuaterReq = async (data) => {
    const response = await request({
        url: `utils/get_recent_quater/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
};

export const getCompanyLineChartData = async (data) => {
    const response = await request({
        url: `company/compare_all/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return response;
};

