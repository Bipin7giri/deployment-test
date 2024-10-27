import React from "react";
import { FiExternalLink } from "react-icons/fi";

export default function HomeInvestOppurtunity({ latestOpenIpo }) {
  return (
    <>
      {latestOpenIpo?.length > 0 ? (
        <div className="px-5 flex gap-3 items-start">
          <div className="w-[10%]">
            <img
              className="lg:w-10 lg:h-10 w-24 h-24 rounded-full"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAAAFBQWfn5+5ubn8/Pzt7e1GRkbS0tL39/fz8/N1dXXg4ODGxsampqZgYGDj4+NaWlplZWUPDw9tbW2FhYUgICCxsbHAwMAbGxslJSVRUVHv7+8XFxcjIyM9PT0xMTErKyuLi4uWlpbX19c+Pj6SkpJ8fHxKSkqKKK1BAAAOi0lEQVR4nO1dD5+iLBBWE1NL19bKtNp029v2+3/CFwZQaxXE1Lh7fX53+y8EHmcchgEHw5gxY8aMGTNmzJgxY8aMGTMmBfK8k0Nw8jz06s4MCsdNrqvNsojNCnGx3Kyuieu8unO9gUBIvhuuLqYYl1Xo+tUlfxGcw01Grkbzdvi7pIncz7zqviWgVvss/3T/Eil6h20Dk/y42l0XYZLYSRIurrvVMW9gvj14r+6+FMHqQTjLWxis/cay/joIb8sHca6CiXusBOf7XJdIvrOjDooX2bu8ftn5W9dnMniryS7bHZoF1wz/sMtqsnzTUJAoKSopLBdRjyqixbKqokg0MzthWulmSJVMrYe0tBNW+pqGg/eyJ3DfwrJb8ef6yerWn5WNDVXv00iw97xHF3uIDiG7dBX29gD1PdcZw3Av3L68u4PV675zm3NxXyxHvxzdt32MSzuiqmIVmzw4wpH4EVQcX2RysOpES6ZLm2fNSzPWG6b/y+g1qrrA7ZMOFGR4Hr4DpMaADLKkkcXg1cvhHJkOjdv4grVynNyTC1jLG2dU/UGGs2EtTezI7dgTOMV4ZbOncTdBWxw+09DNNIbcZ2I8TjRuIGMdUwFOZ8VDKsZ4PY1JPdDmsomaA6wzelMP4zeFuHXboknHKLTllnv0Rj/LlqYcg1F5Zz/HbmpVmu6pGfIBajVuSzRQkY7jpcmwTmmIY8w2NkAwf5W37+dAcTNS9YhL8Pi6+Ro6cimO0wdKcPPKCSnajKeoiBmZ9zEqV8A7Mzcj3OedFgQ5xcGdVDIc3T3kL1RVau4GH/oPdSPj2V/D1q4EZm4GduDWoBo5u23Y5AwXV1MHomHjIQdl5MEKdcrHwdFn9hL4EGGPh9wNcIRgSXnTXs2QqBTu0HGo6hAzo1UYARhaQow8zwmYQR1IigFMzWpSA4amGKN6jzTQN1DsBhknMKPb2t+6MBx34ER4WCQG9fS8FPG0BYIyBarVpQNDVJBWjs9P4hCL3N+Z5tczNPgAFj4vxKihIh0Y8lv//ILJD6nmYUamA0ODum/mz3N1kBtFHuiHKS9jGB9OTh6sv9bR1nSJ/Q6idWKG0ddXdJ2CoW8SE/iknvqNkW3G8ODm7/Fm44VvxfKElqZp3PIo+fP2FbwtJ5mE0Gj4cxGHbYOOlgxdF/TRv+HnNAnwY4HnpwmWZZBMo6VMT7fycu2gFH4t+zCGFweedsLQP27xsOkFQZRPydCB/vWfBSDjQmdijygtzbtxBYYX4+sLF0bXq7efkiGdtV76P4k2YVH8vr6ypYENDBfrP3+chYneTOc6JUNkFKQX/VfAYJLS4Psxhl9RhLCU0c48YV4L38SPbYIHYteeTIbUBU/7Xh02mhmjGi3eSPTNvOzNJZ4/xkvzcjbTP3iiXEzHkBqbvqtgoIdNM+m7Ed+i/yz+C/s2FUPqvPW7Nmw1xZr4NBTb3kJEsJkravLdNWKIEDjO+z7WNGkVoU4MDSbEpMeFBYiw8SO9GIIQC/XrAkE3uzDsE5SWqlpzAYiCqwc0YCBo8YeAYSBGr1Cf+yZES3fAt1SOC4HHd2n50Bwrmhi3aQRDy2WwH1V109Q3uajNGxqLIRK9fCJgCN7lt2Jj5LUCq03RRpNhT4ZwZ85qTQVCY6EbQxqyVrM1sBrauvShHUNw3ZQ2aSByRd76sXYMDViNUrHeZLVQ4OvpxxB8aJWlEnCE2s2vfgxhcFMI2ICSLts/14+hsVRTU3ASBBw0ZAi73rqHpGB3niBcriFDcL+77+ojlikTfK4hQ4NsQM27tkMWDIVzAx0ZwqDf1TcFN+8gmMvoxxDRAa5rWPFGCotWA/RjyBTv1rEdMhlpmzgBdGQIxkPY6wpk0Uo8RdeS4U6meRVcqUZryRCsR7cREXw84eKxlgxhROwWN13J6tKTIYTGus2giKERr47ryZDsOOhiahDcC7HZVWeIvkQo3755iiEMcl2WEh358r8yQyRJ5HJl5Z5gyDZVdPFqwJSKYx7KDB1Jz/+wck/JEGJLXYwprFeId6cOzpDPRZ9iCMGaLusXV1JQPHLqyRA8lauwCAV5YC1xET0ZwtVdPFOyYJGLi2jKkHimXZYvSMRDsr9YU4ZHUxhdKlGYUtdAU4bEGeuwjojI+o9k8W84hpb5kef5QAzJ7CKWj/geqUlikQaUYVFY53POncTnGMIoIE8WBjZX0v/hGJ5zKy9yiz/3TQzrfxO3AhFF+QwRogGSSchwDNMsi639mW9LumNoLTebn+yuuLgVmPadunVG4hk0MxRktBTIMM6Kc3ovQ/J1FTBhIPfTKgUp7hZ4Y3LHtD9D3299BpoY0k7n+zjOz4/P4e1OEui7mwxVGEqici0MPRWGVvFBv+XF+dGWQjoYZKzi+EbVwmU3RNwte1QZYhUFGSJME5Gv0DX8HX5wTCu24D9FHJtxmsVxzBRwSa7HhS1GEC6C3SDgoyC2lfeFWoqw/DzC0CM/4O4SUILwg2Pu048M/4esg1aWph9xGqdpmllWllGGBGBXFvS+0C15fJazGI5hL1tKeud7PufGwH8jUaJ4b2GxmRmR0od13mN+5/2eMEz35C00WjLGmnuh94XnUOBdyeUMO9rSPuMh9IloKb37QJeqHaMYYVYfVmZlMdmUm51TQjcjr7jh74QhK/qBf7YZQ5a9gTuQiZxhx/EQVkeVfRrE/tMv1bCBH0rMFmEZmh/x3sxisuExS4EZVsn0w8QyNK0fdpM+UsvyvRPI/Q9lyM0skjPs6NMo+aXI2C0Jjkfy5eeH/YC/HeHPb5EBoo3MM2MIMkxjxhAr6wNDbFqIAqByf1TpSh+lDDv6pUZhKswtvmg3UnOP+497fz6DpTyfLWwu8R92CExsxXBv4meQjBPYk9ln8YdFGaKSIbEzMO6YZ7CsZZcXUoYd5xZq80NmxbFoYjNNcbf3kJwnts5xnJnxeWuQ/gLDDI8LTC7w7WxaFib8yNCljyHyzJSme+VqF0gZdp0fKs3xXT7AZfuMKOAHDOP42x4D/3BDIJCI2JTvRR3fqyOwNDN8yYYOoQiPHBEbcXzzTO8HNx1rKcOuc3ylOA1n2IYV9k0QG2R/LYV4hx9WjNx5Uo4SwgJFmCFzDzjDk5Rh1ziNUqxNxNCqHmhgSMfu0hLAD0nFkPWRf37iDPkA58kYdo61KcVL5TJ8ZGgYh7T4udafrjuGvI0Tr6Izw87xUqWYdx+G9F0jSpG9CT8Iw84xb6V1i94MyyH39MCQC9d/ZOiLGXZft1Bbe+rPsDRmP/cMeRdLhtwkODIZdl57Ulo/7M+wpLK7Z8jVzHtk+CVj2HX9UG0N+AmG/NfFPcOk1gjAq10m61XHNWCVdfzhGd5qjRCcudrtJAwV1vFV9mLUGS637xTdGLZoaelYshzaOf89lzBU2Iuhsp+mzpDrF+rGkFf2YGlMnr6IZRDlLnJUv6YJCvtpwNTkogLNDLmG+LW/tTPk2ggf1RnyNF43WgO/1TsZQ4U9UbRuUTRgCIa8/scRn5iAukPHNON0J/cGKO1rU9ib2Jfhu8PCApTuHcNl1WWST4CW24gZKu5NVNhf2och8r0y9ylLeX4fL2UXQdiFJS37lMZLdzLFu0P3PcJ9GJbwbBaLeYwIs+yvwe0W0PwzN3lEWGmPsMI+7z4MHdd1g0P4eayKPa4fpneHLBwKXq69S4r7vLvv1e9vae7we4U0vtlrx/edtX2rnV3T3iXFvfrd37cYjWEz2ruk+L5F93dmRmR494K/jKHqOzPd33vSRYahairszu+u6cJQ+d21zu8fasJQ/f3Dzu+QasKwxzukXd8D1oMhrLUovgfc9V1uPRj2epe74/v4ejDs9T6+PKeCMkPuBh6GZtgvp4I8L4Yyw4Tlk7gOzbBnXgyjqN/3IRgK8BRDGCp65DaR5qfRhmHv/DSyHEN6MHwmx5AsT5QeDJ/JEyXL9aUJw2dyfUnytWnC8Kl8beKce3owfC7nnjhvog4Mn82bKM59qQPDp3NfCvOX/mK48E4EfjQdw2fzlxrCHLS/GDZhZIbP56AV5RHWgOEAeYRFuaBfz3CQXNCCfN6vZzhEPm9DkJP9xQwHy8nenlf/xQwHy6vffjbCSxkOeDZCeb7Fu2YMt0Odb0HQfEbJSxkOeUZJ6zkzL2U48DkzgrOChmWIumb3HPisINF5TwMzlBTjDEc47+nhzC6znEjIus5uhCwxKV9UWYqLsdQLI5zZZTycu/Zl23w/3doWIeAPiiMsZjOTj3xxMapD45y79uvsPP7ngapHCtWNdHbeP3/+IYFeZ1iOgn/8HNL/xVmy//p5wIB//kznu3O5x23oHtOdy107W31SihOerV62tEXTcSRNbfmdnaDRA91tlq0nZLjOwACMfPZn1VxMm+u94qOMkN7UeLKb6rPNr5tphg2fbvI2j1OOUuCkNkTDx4DN9mCO4oq2g2+K2TijKg4yHCbAoWIyCi3zbdrjnn3MLLd5VN7yNEzjcFJXAclWBq+e1BgUJm3kFUdI4w5ES/Y0bsbx4tYb9gQuo5cdVx/yCMp24D6Q+7fllU83KjXA39Y5Doh1VfGrZjIAfKvdi8l06f2p1eY7uO9M/82L+zIFrWDv+e2+2EN0Btllxtr9FOOtFKj2OJrx57NGZ/1ZxVZDDeTHEaZlt/KQDl1qfaOlnTAv60lfamB+AyVF2TdzuehjdqJFLeRdJNpIr0LwZlZv8WS7g4oN9A87nj8QAhUTu2id4XzX3jPD+rqzI7kkUGTf8vpl5+9XeGidEawqSVCNvYXBulmc/joIb6VmsitWuoqvgnfYmr9g5cfV7roIk8ROknBx3a2OecN61PYgT9WlBZD7WdM70cpa7bP809XQuAjgHG6SVPM1XG4HrZ+9BtDlMt8NVzKal1XowmP6dwnwDo6bXFebZVFfpI+L5WZ1Tdy/TXJiIM87OQQnQbbaGTNmzJgxY8aMGTNmzJgxYxz8B534xIz4LyRmAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className="w-[90%]">
            <h4 className="text-[26px] lg:text-[16px] uppercase font-[600]">
              {latestOpenIpo[0]?.company_name}
              <span className="text-[22px] lg:text-[12px]">
                - {latestOpenIpo[0]?.sector}
              </span>
            </h4>
            <div className="flex justify-between items-center">
              <p className="text-[24px] lg:text-[12px] font-[600]">
                <span> {latestOpenIpo[0]?.opening_date} - </span>
                <span> {latestOpenIpo[0]?.closing_date} </span>
              </p>
              <div>
                {latestOpenIpo[0]?.status !== "Coming Soon" ? (
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.open("https://meroshare.cdsc.com.np", "_blank");
                      }
                    }}
                    className="flex items-center justify-center py-[14px] text-3xl lg:text-xs px-2 lg:py-1 font hover:bg-gray-800 bg-[#5e6ea7] text-secondary rounded-md"
                  >
                    <FiExternalLink className="border-1 text-4xl lg:text-[24px] p-1 rounded-full text-secondary linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))" />
                    Apply
                  </button>
                ) : (
                  <p className="bg-black text-white py-1 px-2 rounded text-sm">{latestOpenIpo[0]?.status}</p>
                )}
              </div>
            </div>
            <div className="grid py-6 text-3xl lg:text-sm grid-cols-3 gap-2">
              <div className="flex flex-col">
                <span>Sector:</span>
                <span className="font-[500]">{latestOpenIpo[0]?.sector}</span>
              </div>
              <div className="flex flex-col">
                <span>No.of Shares:</span>
                <span className="font-[500]">{latestOpenIpo[0]?.unit}</span>
              </div>
              <div className="flex flex-col">
                <span>Issue Manager:</span>
                <span className="font-[500]">
                  {latestOpenIpo[0]?.issueManager}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[26px] lg:text-[16px] capitalize italic font-[600] text-center pb-[105px]">
          there May be no recent openings!
        </div>
      )}
    </>
  );
}
