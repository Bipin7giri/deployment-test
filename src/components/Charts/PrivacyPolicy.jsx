import React, { useEffect } from "react";
import Link from "next/link";
const PrivacyPolicy = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div className="bg-[#F4F6F9]">
        <div className="lg:container px-10 lg:w-full mx-auto py-5 mt-40 lg:mt-0">
          <div className="mb-[20px] mt-[20px]">
            <h1 className="text-[24px] font-[600] mt-[20px] uppercase"></h1>
            <p className="text-[12px]">Last updated Aug 22, 2023 </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Acceptance of Terms:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              Welcome to Saral Lagani, a stock analytical tool
              (&quot;Platform&quot;) designed to provide comprehensive analytics
              of listed companies in the stock market. These Terms and
              Conditions (&quot;Terms&quot;) constitute a legally binding
              agreement between you (&quot;User,&quot; &quot;you,&quot; or
              &quot;your&quot;) and Saral Lagani (&quot;Company,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing
              or using the Platform, you agree to comply with these Terms. If
              you do not agree with these Terms, please refrain from using the
              Platform.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Use of Platform:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              The Platform is intended for informational and analytical purposes
              only. It is not intended to provide financial advice,
              recommendations, or endorsements of any specific investments. You
              acknowledge that any investment decisions made based on
              information from the Platform are solely at your own risk. You
              agree to use the Platform solely for lawful and non-commercial
              purposes.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Registration and Account:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              Any content you upload, submit, or generate through the Platform
              (&quot;User Content&quot;) remains your property. However, by
              using the Platform, you grant us a non-exclusive, royalty-free,
              worldwide license to use, reproduce, modify, adapt, publish, and
              display your User Content for the purpose of operating, improving,
              and promoting the Platform. You represent and warrant that you
              have the necessary rights to grant this license.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Data Accuracy and Reliability:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              While we strive to provide accurate and up-to-date information, we
              do not guarantee the accuracy, completeness, or reliability of the
              data and information presented on the Platform. You acknowledge
              that the stock market is subject to fluctuations and risks, and
              you should independently verify any information obtained from the
              Platform. The Company shall not be held liable for any loss or
              damages resulting from the use of inaccurate or outdated
              information.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Prohibited Activities:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              You agree not to use the Platform for any illegal, fraudulent, or
              unauthorized purpose. Prohibited activities include, but are not
              limited to, unauthorized access to the Platform, data scraping,
              reverse engineering, introducing malicious software, and engaging
              in any behavior that disrupts the functionality of the Platform or
              interferes with other users&apos; access.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Intellectual Property:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              The Platform and its content, including but not limited to text,
              graphics, logos, and software, are protected by intellectual
              property laws. You acknowledge and agree that all rights, titles,
              and interests in the Platform&apos;s content are owned by the
              Company. You may not reproduce, distribute, modify, create
              derivative works, or reverse engineer the Platform or its
              components without our explicit consent.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Pricing and Subscription:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              The Platform offers two categories of access:
              <li>
                <p className="ml-[22px]">
                  This option provides limited access to certain features of the
                  Platform at no cost to you.
                </p>{" "}
              </li>
              <li>
                {" "}
                <span className="font-[600]"> Saral Lagani Plus: </span>{" "}
                <p className="ml-[22px]">
                  {" "}
                  This is a subscription-based service that offers enhanced
                  features, analytics, and tools for a monthly fee. The specific
                  features and pricing details for Saral Lagani Plus are
                  outlined on the Platform&apos;s subscription page.
                </p>{" "}
              </li>
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Disclaimer of Warranty:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              The Platform is provided &quot;as is&quot; without any warranties,
              express or implied. We do not warrant that the Platform will be
              error-free, uninterrupted, or free from harmful components. Your
              use of the Platform is at your own risk. The Company disclaims any
              warranties regarding the accuracy, completeness, or reliability of
              the information presented on the Platform.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Limitation of Liability:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              To the extent permitted by law, we shall not be liable for any
              indirect, incidental, consequential, or punitive damages arising
              from your use of the Platform, including but not limited to loss
              of profits, data, or business opportunities. The Company&apos;s
              total liability under these Terms shall not exceed the amount you
              paid, if any, to access the Platform.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Modifications and Termination:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              We reserve the right to modify, suspend, or terminate the Platform
              at any time without notice. We may also suspend or terminate your
              access to the Platform if you violate these Terms or engage in
              activities that are detrimental to the Platform or other users.
              You acknowledge that the Company shall not be liable for any
              losses or damages resulting from such modifications, suspensions,
              or terminations.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Governing Law:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              These Terms shall be governed by and construed in accordance with
              the laws of [Your Jurisdiction], without regard to its conflict of
              law principles.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Severability:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions shall remain in full force
              and effect.
            </p>
          </div>
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Entire Agreement:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              These Terms constitute the entire agreement between you and the
              Company regarding your use of the Platform, superseding any prior
              agreements or understandings.
            </p>
          </div>
          {/* <div className='mt-[40px] mb-[30px]'>
                        <h2 className='text-[18px] mb-[5px] font-[600] uppercase'>CANCELLATION</h2>
                        <p className='text-18px mb-[20px]'>
                            For any questions or concerns regarding these Terms, please contact us at 
                        </p>
                        <p className='text-18px mb-[20px]'>
                            If you are unsatisfied with our services, please email us at  <Link href="mailto:info@sarallagani.com" className=' hover:underline'>info@sarallagani.com</Link>
                        </p>
                    </div> */}
          <div className="mt-[40px] mb-[30px]">
            <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
              Contact Information:{" "}
            </h2>
            <p className="text-18px mb-[20px]">
              For any questions or concerns regarding these Terms, please
              contact us at{" "}
              <Link
                href="mailto:info@sarallagani.com"
                className=" hover:underline"
              >
                info@sarallagani.com
              </Link>
            </p>
            <p className="text-18px mb-[20px]">
              By using the Saral Lagani Stock Analytical Tool, you acknowledge
              that you have read, understood, and agreed to these extensive
              Terms and Conditions, including the pricing and subscription
              details.
            </p>
          </div>
          {/* <div className='mt-[40px] mb-[30px]'>
                        <h2 className='text-[18px] mb-[5px] font-[600] uppercase'>USER DATA</h2>
                        <p className='text-18px mb-[20px]'>
                            We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site.
                            Although we perform regular routine backups of data, you are solely responsible for all the data that you transmit or that relates to any activity you have undertaken
                            using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data. And you hereby waive any right of action against us arising
                            from any such loss or corruption of such data.
                        </p>
                        <p className='text-18px mb-[20px]'>
                            If you are unsatisfied with our services, please email us at  <Link href="mailto:info@sarallagani.com" className=' hover:underline'>info@sarallagani.com</Link>
                        </p>
                    </div> */}
        </div>
      </div>
    </>
  );
};
export default PrivacyPolicy;

// const PrivacyPolicy = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <div className="bg-[#F4F6F9]">
//         <div className="lg:container px-10 lg:w-full mx-auto py-5 mt-40 lg:mt-0">
//           <div className="mb-[20px] mt-[20px]">
//             <h1 className="text-[24px] font-[600] mt-[20px] uppercase"></h1>
//             <p className="text-[12px]">Last updated Aug 22, 2023 </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Acceptance of Terms:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               Welcome to Saral Lagani, a stock analytical tool
//               (&quot;Platform&quot;) designed to provide comprehensive analytics
//               of listed companies in the stock market. These Terms and
//               Conditions (&quot;Terms&quot;) constitute a legally binding
//               agreement between you (&quot;User,&quot; &quot;you,&quot; or
//               &quot;your&quot;) and Saral Lagani (&quot;Company,&quot;
//               &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing
//               or using the Platform, you agree to comply with these Terms. If
//               you do not agree with these Terms, please refrain from using the
//               Platform.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Use of Platform:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               The Platform is intended for informational and analytical purposes
//               only. It is not intended to provide financial advice,
//               recommendations, or endorsements of any specific investments. You
//               acknowledge that any investment decisions made based on
//               information from the Platform are solely at your own risk. You
//               agree to use the Platform solely for lawful and non-commercial
//               purposes.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Registration and Account:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               Any content you upload, submit, or generate through the Platform
//               (&quot;User Content&quot;) remains your property. However, by
//               using the Platform, you grant us a non-exclusive, royalty-free,
//               worldwide license to use, reproduce, modify, adapt, publish, and
//               display your User Content for the purpose of operating, improving,
//               and promoting the Platform. You represent and warrant that you
//               have the necessary rights to grant this license.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Data Accuracy and Reliability:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               While we strive to provide accurate and up-to-date information, we
//               do not guarantee the accuracy, completeness, or reliability of the
//               data and information presented on the Platform. You acknowledge
//               that the stock market is subject to fluctuations and risks, and
//               you should independently verify any information obtained from the
//               Platform. The Company shall not be held liable for any loss or
//               damages resulting from the use of inaccurate or outdated
//               information.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Prohibited Activities:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               You agree not to use the Platform for any illegal, fraudulent, or
//               unauthorized purpose. Prohibited activities include, but are not
//               limited to, unauthorized access to the Platform, data scraping,
//               reverse engineering, introducing malicious software, and engaging
//               in any behavior that disrupts the functionality of the Platform or
//               interferes with other users access.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Intellectual Property:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               The Platform and its content, including but not limited to text,
//               graphics, logos, and software, are protected by intellectual
//               property laws. You acknowledge and agree that all rights, titles,
//               and interests in the Platforms content are owned by the Company.
//               You may not reproduce, distribute, modify, create derivative
//               works, or reverse engineer the Platform or its components without
//               our explicit consent.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Pricing and Subscription:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               The Platform offers two categories of access:
//               <li>
//                 <p className="ml-[22px]">
//                   This option provides limited access to certain features of the
//                   Platform at no cost to you.
//                 </p>{" "}
//               </li>
//               <li>
//                 {" "}
//                 <span className="font-[600]"> Saral Lagani Plus: </span>{" "}
//                 <p className="ml-[22px]">
//                   {" "}
//                   This is a subscription-based service that offers enhanced
//                   features, analytics, and tools for a monthly fee. The specific
//                   features and pricing details for Saral Lagani Plus are
//                   outlined on the Platforms subscription page.
//                 </p>{" "}
//               </li>
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Disclaimer of Warranty:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               The Platform is provided &quot;as is&quot; without any warranties,
//               express or implied. We do not warrant that the Platform will be
//               error-free, uninterrupted, or free from harmful components. Your
//               use of the Platform is at your own risk. The Company disclaims any
//               warranties regarding the accuracy, completeness, or reliability of
//               the information presented on the Platform.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Limitation of Liability:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               To the extent permitted by law, we shall not be liable for any
//               indirect, incidental, consequential, or punitive damages arising
//               from your use of the Platform, including but not limited to loss
//               of profits, data, or business opportunities. The Companys total
//               liability under these Terms shall not exceed the amount you paid,
//               if any, to access the Platform.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Modifications and Termination:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               We reserve the right to modify, suspend, or terminate the Platform
//               at any time without notice. We may also suspend or terminate your
//               access to the Platform if you violate these Terms or engage in
//               activities that are detrimental to the Platform or other users.
//               You acknowledge that the Company shall not be liable for any
//               losses or damages resulting from such modifications, suspensions,
//               or terminations.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Governing Law:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               These Terms shall be governed by and construed in accordance with
//               the laws of [Your Jurisdiction], without regard to its conflict of
//               law principles.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Severability:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               If any provision of these Terms is found to be invalid or
//               unenforceable, the remaining provisions shall remain in full force
//               and effect.
//             </p>
//           </div>
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Entire Agreement:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               These Terms constitute the entire agreement between you and the
//               Company regarding your use of the Platform, superseding any prior
//               agreements or understandings.
//             </p>
//           </div>
//           {/* <div className='mt-[40px] mb-[30px]'>
//                         <h2 className='text-[18px] mb-[5px] font-[600] uppercase'>CANCELLATION</h2>
//                         <p className='text-18px mb-[20px]'>
//                             For any questions or concerns regarding these Terms, please contact us at
//                         </p>
//                         <p className='text-18px mb-[20px]'>
//                             If you are unsatisfied with our services, please email us at  <Link href="mailto:info@sarallagani.com" className=' hover:underline'>info@sarallagani.com</Link>
//                         </p>
//                     </div> */}
//           <div className="mt-[40px] mb-[30px]">
//             <h2 className="text-[18px] mb-[5px] font-[600] uppercase">
//               Contact Information:{" "}
//             </h2>
//             <p className="text-18px mb-[20px]">
//               For any questions or concerns regarding these Terms, please
//               contact us at{" "}
//               <Link
//                 href="mailto:info@sarallagani.com"
//                 className=" hover:underline"
//               >
//                 info@sarallagani.com
//               </Link>
//             </p>
//             <p className="text-18px mb-[20px]">
//               By using the Saral Lagani Stock Analytical Tool, you acknowledge
//               that you have read, understood, and agreed to these extensive
//               Terms and Conditions, including the pricing and subscription
//               details.
//             </p>
//           </div>
//           {/* <div className='mt-[40px] mb-[30px]'>
//                         <h2 className='text-[18px] mb-[5px] font-[600] uppercase'>USER DATA</h2>
//                         <p className='text-18px mb-[20px]'>
//                             We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site.
//                             Although we perform regular routine backups of data, you are solely responsible for all the data that you transmit or that relates to any activity you have undertaken
//                             using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data. And you hereby waive any right of action against us arising
//                             from any such loss or corruption of such data.
//                         </p>
//                         <p className='text-18px mb-[20px]'>
//                             If you are unsatisfied with our services, please email us at  <Link href="mailto:info@sarallagani.com" className=' hover:underline'>info@sarallagani.com</Link>
//                         </p>
//                     </div> */}
//         </div>
//       </div>
//     </>
//   );
// };
