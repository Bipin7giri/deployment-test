import { store } from "../../store";

// Makes requests to CryptoCompare API
export async function makeApiRequest(path) {
  try {
    const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
    return response.json();
  } catch (error) {
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

// export async function makeSaralApiRequest(path) {
//     try {
//         const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${path}`,{
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               "Permission": "2021D@T@f@RSt6&%2-D@T@"
//             }
//           });
//         return response.json();
//     } catch(error) {
//         throw new Error(`CryptoCompare request error: ${error.status}`);
//     }
// }

export async function makeSaralApiRequest(path) {
  try {
    // if (path !== undefined && path !== null && path !== '/company/get_active_company_name/' && !path.includes("sector")) {
    //   store.dispatch({
    //     type: 'market/setChoosedTechinicalSymbol', payload: path === "/company/chart_data/1/1371100000"
    //       ? path?.split("chart_data/")?.[1]?.split("/")?.[0]
    //       : null
    //   });
    //   // store.dispatch({
    //   //   type: 'market/setChoosedTechinicalSector', payload: null
    //   // });
    // // } else if (path.includes("sector")) {
    // //   const newPath = path?.split("chart_data/")?.[1]?.split("/")?.[0]
    // //   store.dispatch({
    // //     type: 'market/setChoosedTechinicalSector', payload: newPath
    // //   });
    // //   store.dispatch({
    // //     type: 'market/setChoosedTechinicalSymbol', payload: null
    // //   });
    // } else {

    // }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Permission: "2021D@T@f@RSt6&%2-D@T@",
      },
    });
    return response.json();
  } catch (error) {
    throw new Error(`CryptoCompare request error: ${error.status}`);
  }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange, symbol) {
  const short = `${symbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
  if (!match) {
    return null;
  }
  return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}

export function getSectorTypeValue(sector) {
  switch (sector) {
    case "Development Banks":
      return 1;
    case "Manufacturing And Processing":
      return 2;
    case "Micro Finance":
      return 3;
    case "Life Insurance":
      return 4;
    case "Mutual Fund":
      return 5;
    case "Commercial Banks":
      return 6;
    case "Hotels And Tourism":
      return 7;
    case "Others":
      return 8;
    case "Hydro Power":
      return 9;
    case "Non Life Insurance":
      return 10;
    case "Finance":
      return 11;
    case "Trading":
      return 12;
    case "Investment":
      return 13;
    default:
      return 0; // Return 0 for cases not explicitly handled
  }
}

export function getIndicesTypeValue(indices) {
  switch (indices) {
    case "NEPSE":
      return 1;
    default:
      return 1;
  }
}
