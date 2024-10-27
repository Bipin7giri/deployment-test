import api from "@/api/axios";

export const getPromoCodeDetails = async (user_id) => {
  const res = await api.get(`/promo-codes/get_details_by_userID/${user_id}`);
  return res.data.data;
};

// paid
export const promoCodeColumns = [
  {
    title: "Sno",
    dataIndex: "sno",
    key: "sno",
    align: "center",
    sorter: (a, b) => a.Sno - b.Sno,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },

  {
    title: "PackageAmount",
    dataIndex: "packageAmount",
    key: "packageAmount",
    align: "center",
    sorter: (a, b) => a.packageAmount - b.packageAmount,
  },
  {
    title: "Commission Amount",
    dataIndex: "commissionAmount",
    key: "commissionAmount",
    align: "center",
    sorter: (a, b) => a.commissionAmount - b.commissionAmount,
  },
];

// unpaid

export const promoCodeColumnsForUnpaidUser = [
  {
    title: "Sno",
    dataIndex: "sno",
    key: "sno",
    align: "center",
    sorter: (a, b) => a.Sno - b.Sno,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
];
