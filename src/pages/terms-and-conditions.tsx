import { GenericButton } from '@components/buttons';
import { useRouter } from 'next/router';
import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <main>
      <div className="home-background-img fixed top-0 left-0 right-0 bottom-0"></div>
      <div className="relative flex justify-center items-start w-full min-h-screen">
        <div className="flex flex-col shadow-md rounded justify-start items-center w-100 lg:w-200 m-4 p-4 bg-secondary-background dark:bg-secondary-background-dark">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Terms and Conditions
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-100">
            <strong>Effective Date: 28.01.2025</strong>
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              1. About Us
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              Progress Pal (“we,” “us,” “our”) is a free web application based
              in the United Kingdom designed to help users track their exercise
              routines and weight progress.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              2. User Accounts
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-100">
              <li>To access certain features, users must create an account.</li>
              <li>
                Users may only create <strong>one account per person</strong>.
              </li>
              <li>You must be at least 18 years old to use this Service.</li>
            </ul>
            <p className="text-gray-600 mt-4 dark:text-gray-100">
              By creating an account, you agree to provide accurate information
              and maintain the confidentiality of your login credentials. You
              are responsible for all activities under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              3. Free Service and Future Monetization
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              Progress Pal is currently a free service. Should it become a paid
              service in the future:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-100 mt-4">
              <li>
                Users will be given <strong>at least one month’s notice</strong>
                .
              </li>
              <li>
                Participation in paid features will be strictly{' '}
                <strong>opt-in</strong>.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              4. Acceptable Use
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              We aim to maintain a safe and respectful environment. By using
              Progress Pal, you agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-100 mt-4">
              <li>
                Engage in hate speech, harassment, cyberbullying, or any form of
                abusive behavior.
              </li>
              <li>
                Hack, manipulate, or use the platform for fraudulent purposes.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-100 mt-4">
              Failure to adhere to these rules may result in suspension or
              termination of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              5. Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              The name <strong>Progress Pal</strong> is a trademark of our
              platform. You may not use it without our prior written consent.
            </p>
            <p className="text-gray-600 dark:text-gray-100 mt-4">
              All content provided by Progress Pal, including logos and
              graphics, remains our intellectual property and may not be
              reproduced, distributed, or modified without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              6. Liability Disclaimer
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-100">
              <li>
                The information provided by Progress Pal is intended for general
                tracking purposes only.{' '}
                <strong>
                  It is your responsibility to use the Service in accordance
                  with your doctor’s or healthcare provider’s recommendations.
                </strong>
              </li>
              <li>
                We disclaim responsibility for any third-party links provided
                within the platform. These links are for convenience only, and
                we do not endorse or assume liability for their content.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              7. Data Collection and Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              To use our Service, we collect and store the following
              information:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-100 mt-4">
              <li>
                <strong>Email Address</strong>: Required for account creation
                and communication.
              </li>
              <li>
                <strong>Exercise and Weight Data</strong>: User-inputted data to
                enable progress tracking.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-100 mt-4">
              Your data is securely stored on an external database, and
              passwords are securely hashed for your protection.
            </p>
            <p className="text-gray-600 dark:text-gray-100 mt-4">
              For more details on how we handle your information, please refer
              to our <strong>Privacy Policy</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              8. Updates to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              We reserve the right to update these Terms and Conditions at any
              time. It is your responsibility to review them periodically.
              Continued use of the Service after changes are made constitutes
              your acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              9. Termination of Service
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              We reserve the right to terminate or suspend your account at any
              time if we believe you have violated these Terms and Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-100">
              10. Contact Information
            </h2>
            <p className="text-gray-600 dark:text-gray-100">
              If you have questions about these Terms and Conditions, please
              email us at <strong>terms@progresspal.co.uk</strong>.
            </p>
          </section>

          <p className="text-gray-600 dark:text-gray-100 my-8">
            By using Progress Pal, you acknowledge that you have read,
            understood, and agreed to these Terms and Conditions.
          </p>

          <GenericButton func={goBack} text="Go back" />
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
