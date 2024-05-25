import React, { useEffect } from "react";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
function TermsandCondition() {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Flex direction={"column"}>
      <Flex
        justify={"center"}
        background={
          isDesktop
            ? "linear-gradient(90deg, #fff +2.38%, #c49bee 98.36%)"
            : "#f8f4fd"
        }
      >
        <Flex
          align="center"
          justify={"center"}
          minH="25vh"
          direction={"column"}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="700"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            Terms of Service
          </Heading>
          <Box w={"70%"}>
            <Text textAlign={"center"}>
              Please read these Terms of Service carefully as they contain
              important information for the use of HomeBasket
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex direction={"column"} my={20} width={"100%"} align={"center"}>
        <Flex
          direction={"column"}
          borderColor={"black"}
          borderWidth={1}
          width={"80%"}
          // align={"center"}
          p={10}
        >
          <Text>
            These terms tell you the rules for using our App, site together with
            any related applications or platforms Who we are and how to contact
            us HOMEBASKET APP is a property of COAK BASE NIGERIA LIMITED, a
            Private Limited company registered under the laws of the Federal
            Republic of Nigeria, having its registered office at No 3 Aburime
            Street Isihor Benin City, Edo State, Nigeria THE HOMEBASKET LIMITED,
            is a product of COAK BAZE NIGERIA LIMITED. Any reference to us, we,
            our or the Group within these terms and conditions includes all or
            any of the direct or indirect parent or subsidiary undertakings. You
            can contact us here or view our Help Centre. By using our APP you
            accept these terms By using our APP, you confirm that you accept
            these terms of use (terms) and that you agree to comply with them.
            If you do not agree to these terms, you must not use our APP. We
            recommend that you print or make a digital copy of these terms for
            future reference. There are other terms that may apply to you These
            terms refer to the following additional terms, which also apply to
            your use of our APP: Our Privacy Policy and Privacy Notices See
            further how we may use your personal information. Our Acceptable Use
            Policy, outlined below, which sets out the permitted and prohibited
            uses of our APP. When using our APP, products and services, you must
            comply with this Acceptable Use Policy. Our Cookie Policy, which
            sets out information about the cookies on our APP.
          </Text>
          <Text>
            Some of our products and services may have specific terms or be
            governed by third party terms which will apply in addition to, or
            sometimes in replacement of these terms. Where possible, we will
            notify you of such terms before you sign up to the relevant service
            to give you an opportunity to review them.
          </Text>

          <Heading mt={10}>Website Terms and Conditions of Use</Heading>
          <Text mt={10}>
            Please Read These Terms Of Service Carefully Before Using The
            Service As They Contain Important Information Regarding The Legal
            Rights, Remedies And Obligations. Your Access To And Use Of The
            Service Is Conditioned On Your Acceptance Of And Compliance With
            These Terms. These Terms Apply To All Visitors, Users And Others Who
            Access Or Use The Service.
          </Text>
          <Text mt={5}>
            By Accessing This App, Accessible From the app or play store, You
            Are Agreeing To Be Bound By These Website Terms And Conditions Of
            Use And Agree That You Are Responsible For The Agreement With Any
            Applicable Local Laws. If You Disagree With Any Of These Terms, You
            Are Prohibited From Accessing This Site. The Materials Contained In
            This Website Are Protected By Copyright And Trademark Law. You Agree
            That metricks Reserves The Right To Update And Change These Terms
            From Time To Time Without Notice.
          </Text>
          <Text mt={5}>
            Any New Updates, Features Or Options That Will Be Added To The
            Service, Including The Release Of New Tools And Resources, Shall Be
            Subject To These Terms. Please Note That These Terms May Be Amended
            From Time To Time. In Continuing To Use The Service You Confirm That
            You Accept The Then-Current Terms And Conditions In Full At The Time
            You Use The Service.
          </Text>

          <Heading mt={10}>We may suspend or withdraw Our App</Heading>
          <Text mt={10}>
            We do not guarantee that our Site, or any content on it, will always
            be available or be uninterrupted. We may suspend or withdraw or
            restrict the availability of all or any part of our APP for business
            and operational reasons.
          </Text>
          <Text mt={5}>
            We are not responsible for the accuracy or completeness of our APP,
            products or services, or any lack or loss of functionality of our
            APP, products or services.
          </Text>
          <Text mt={5}>
            We may transfer our rights and obligations under these terms to
            another organization. Where required by law, we will tell you in
            writing if this happens and we will ensure that the transfer will
            not affect your rights under the contract.
          </Text>
          <Text mt={5}>
            This APP, its content (including information and material) ,
            products or services provided in relation to the same are only
            targeted to, and intended for use by, individuals (consumers and
            businesses) located in the Permitted Territory. By continuing to
            access, view or make use of this APP and any related content,
            products and services, you hereby warrant and represent to us that
            you are located in the Permitted Territory. If you are not a
            resident in the Permitted Territory, you must immediately
            discontinue use of this MOBIL APP and any related content, products
            and services.
          </Text>

          <Heading mt={10}>You must keep your account details safe</Heading>
          <Text mt={10}>
            Our products or services will require you to create an account. When
            you create an account, or you are provided with a user
            identification code, password or any other piece of information as
            part of our security procedures, you must treat such information as
            confidential. You must not disclose it to any third party. You will
            ensure that your account will not be used by any third party. You
            will be responsible for all activity that occurs or that is
            submitted on your account under your log in details.
          </Text>
          <Text mt={5}>
            We have the right to disable any user identification code or
            password, whether chosen by you or allocated by us, at any time for
            business or operational reasons or if, in our reasonable opinion,
            you have failed to comply with any of the provisions of these terms.
          </Text>
          <Text mt={5}>
            If you know or suspect that anyone other than you knows your user
            identification code or password, you must promptly notify us here
          </Text>
          <Text mt={5}>
            When you use our APP, products or services that require a user to
            log in, you will ensure that your account will not be used by any
            third party. You will be responsible for all activity that occurs or
            that is submitted on your account under your log in details.
          </Text>

          <Heading mt={10}>How you may use content on our MOBILEAPP</Heading>
          <Text mt={10}>
            We are the owner or the licensee of all intellectual property rights
            in our APP, content available on the APP, and any database operated
            by us, any proprietary software utilized by us to enable you to use
            APP, and the underlying source code. These are protected by
            copyright laws and treaties around the world. Much of the content is
            protected by copyright, trade mark, database rights, design rights
            (including in the "look and feel" and other visual or non-literal
            elements), and/or other intellectual property rights (whether
            registered or unregistered). Our logos, together with our trademarks
            and/or service marks, may not be copied or reproduced without our
            prior written consent. All such rights are reserved.
          </Text>
          <Text mt={5}>
            You may print off one copy, and may download and share extracts, of
            any page(s) from our MOBILEAPP for your personal use only. Our
            status (and that of any identified contributors) as the authors of
            content on our APP must always be acknowledged.
          </Text>
          <Text mt={5}>
            You must not modify the paper or digital copies of any content you
            have printed off or downloaded in any way, and you must not use any
            illustrations, photographs, video or audio sequences or any graphics
            separately from any accompanying text.
          </Text>
          <Text mt={5}>
            You must not use any part of the content on our MOBILEAPP for
            commercial purposes without obtaining a license from us to do so.
            This includes not using the content on our APP for the purposes of
            developing or contributing towards a solution utilizing artificial
            intelligence.
          </Text>
          <Text mt={5}>
            If you print off, copy, download, share or repost any content or
            part of our APP in breach of these terms, your right to use our APP
            will cease immediately and you must, at our option, return or
            destroy any copies of the content you have made. We reserve the
            right to take further legal action in respect of any such breach.
          </Text>
          <Text mt={5}>No text or data mining, or web scraping</Text>
          <Text mt={5}>
            You shall not conduct, facilitate, authorize or permit any text or
            data mining or web scraping in relation to our APP or any product or
            services provided via, or in relation to, our MOBILEAPP. This
            includes but is not limited to using (or permitting, authorizing or
            attempting the use of):
          </Text>
          <Text mt={5}>
            Any "robot", "bot", "spider", "scraper" or other automated device,
            program, tool, algorithm, code, process or methodology to access,
            obtain, copy, monitor or republish any portion of the MOBILEAPP or
            any data, content, information or services accessed via the same.
          </Text>
          <Text mt={5}>
            Any automated analytical technique aimed at analyzing text and data
            in digital form to generate information which includes but is not
            limited to patterns, trends and correlations.
          </Text>
          <Text mt={5}>
            The provisions in this clause should be treated as an express
            reservation of our rights in this regard. This clause shall not
            apply insofar as (but only to the extent that) we are unable to
            exclude or limit text or data mining or web scraping activity by
            contract under the laws which are applicable to us.
          </Text>

          <Heading mt={10}>Do not rely on content on this APP</Heading>
          <Text mt={10}>
            Unless we explicitly agree otherwise, the content, and the products
            or services that we provide on our APP (including, but not limited
            to, properties available, guides, reports and resources provided by
            third parties such as calculators (including mortgage calculators)
            and quoting services we make available on our APP) is provided for
            general information only. It is not intended to amount to advice on
            which you should rely. You must obtain professional or specialist
            advice before taking, or refraining from, any action on the basis of
            the content on our APP.
          </Text>
          <Text mt={5}>
            IN PARTICULAR, PLEASE NOTE WE ARE NOT AN ESTATE AGENT, LETTINGS
            AGENT OR NEW HOME DEVELOPER (AGENT). SOME PARTS OF OUR APP PROVIDE A
            SERVICE WHERE AGENTS MAY MARKET AND YOU MAY VIEW PROPERTY
            INFORMATION. THE AGENTS THAT POST THE PROPERTY INFORMATION ARE
            SOLELY RESPONSIBLE FOR THEIR ACCURACY AND FOR FIELDING ENQUIRIES
            RELATING TO THOSE PROPERTIES. WE DO NOT PARTICIPATE IN ANY
            COMMUNICATIONS BETWEEN YOU AND AGENTS NOR IN ANY PART OF A
            SUBSEQUENT PROPERTY TRANSACTION MANAGED SOLELY BY THE AGENT. 
          </Text>
          <Text mt={5}>
            Although we make reasonable efforts to update the content on our
            APP, we make no representations, warranties or guarantees, whether
            expressed or implied, that the content on our APP is accurate,
            complete or up to date.
          </Text>
          <Text mt={5}>
            We are not responsible for third party advertising or APP we link to
          </Text>
          <Text mt={5}>
            Where our APP contains links to other websites, applications or
            platforms (including social media sites) and resources provided by
            third parties, including but not limited to calculators and quoting
            services, these are provided for your information only. Any links
            which include the option to contact third parties such as agents are
            to be completed at your own risk. Such links should not be
            interpreted as approval by us of those linked websites,
            applications, platforms or information you may obtain from them.
          </Text>
          <Text mt={5}>
            We have no control over the contents, material or information which
            you may provide to those websites, applications, platforms or
            resources
          </Text>
          <Text mt={5}>
            This Site may also contain advertising from third parties and we are
            not responsible for any misleading or inaccurate advertisements
            which are the sole responsibility of the advertiser. Any links or
            advertisements on this Site should not be taken as an endorsement by
            us of any kind. Furthermore, this Site contains data provided by
            third parties and we accept no responsibility for any inaccuracies
            in this material. You agree to release us from claims or disputes of
            any kind arising from or in any way connected to such disputes with
            third parties.
          </Text>
          <Text mt={5}>User-generated content is not approved by us</Text>
          <Text mt={5}>
            This Site may include content uploaded by business users of the
            Site, including links to social media pages, video-sharing websites,
            bulletin boards and chat rooms. This content has not been verified
            or approved by us. The views expressed by other users on our APP do
            not represent our views or values. No consumer user generated
            content is permitted on this Site.
          </Text>

          <Heading mt={10}>How to complain about or report content</Heading>
          <Text mt={10}>
            If you become aware of any content that could comprise or be
            connected to child sexual abuse or exploitation or that could
            comprise terrorist content or be connected to terrorism, please
            contact us immediately using this form.
          </Text>
          <Text mt={5}>
            If you wish to report errors about a listing, please use the Report
            this Listing which is on every property listing page.
          </Text>
          <Text mt={5}>
            If you wish to complain about any other information, content or
            material, please contact us using this form.
          </Text>

          <Heading mt={10}>
            Our responsibility for loss or damage suffered by you
          </Heading>
          <Text mt={10}>
            Whether you are a consumer or a business user: The APP (including
            all content) is provided by us on an "as is" and "as available"
            basis and we make no representations, guarantees or warranties of
            any kind, either express or implied, including without limitation,
            warranties as to quality, suitability for any purpose,
            compatibility, reliability, accuracy, completeness, timeliness,
            access or use. It is your responsibility to evaluate the quality,
            suitability, accuracy, completeness and reliability of our APP and
            content contained therein. We accept no responsibility and make no
            representations, guarantees, or warranties that the App will operate
            continuously, without interruptions or be fault-free. We may need to
            make the App unavailable with or without notice to carry out
            maintenance or upgrade work. We accept no liability for any
            interruption or loss of service.
          </Text>
          <Text mt={5}>
            Any value estimate provided on our APP is intended for general
            interest and information purposes only and should not be relied upon
            for any commercial transaction or similar use. These estimates are
            based on publicly available information and typical factors in a
            certain location which may be inaccurate or incomplete, without the
            benefit of a physical inspection. They will not take account of any
            factors which are unknown to us and should only be used as a general
            estimate. None of the information available on our Site is intended
            to be a substitute for independent professional advice and users are
            recommended to seek advice from suitably qualified professionals
            such as surveyors and solicitors if relevant to their particular
            circumstances. We shall not be liable for any losses suffered as a
            result of relying on our value estimates.
          </Text>
          <Text mt={5}>
            Property descriptions and other information provided on our APP are
            intended for information and marketing purposes and, whilst
            displayed in good faith, we will not in any circumstances accept
            responsibility for their accuracy. The property advert pages on our
            APP do not constitute property particulars, these should be
            available directly from the agent marketing the property. It is the
            responsibility of prospective buyers/tenants to satisfy themselves
            as to the accuracy of any property descriptions displayed and the
            responsibility of agents to ensure the accuracy and integrity of
            property descriptions provided on our MOBILEAPP and in any property
            particulars.
          </Text>
          <Text mt={5}>
            We do not exclude or limit in any way our liability to you where it
            would be unlawful to do so. This includes liability for death or
            personal injury caused by our negligence or the negligence of our
            employees, representatives or subcontractors and for fraud or
            fraudulent misrepresentation. To the extent permitted by law, we
            exclude all conditions, warranties, representations or other terms
            which may apply to our MOBILEAPP or any content on it, whether
            express or implied.
          </Text>
          <Text mt={5}>
            Different limitations and exclusions of liability will apply to
            liability arising as a result of the supply of any products or
            services to you, which will be set out in our other terms and
            conditions depending on the products or services you buy and/or
            interact with.
          </Text>
          <Heading mt={10}>If you are a business user:</Heading>
          <Text mt={10}>
            We exclude all implied conditions, warranties, representations or
            other terms that may apply to our APP or any content on it.
          </Text>
          <Text mt={5}>
            We will not be liable to you for any loss or damage, whether in
            contract, tort (including negligence), breach of statutory duty, or
            otherwise, even if foreseeable, arising under or in connection with:
          </Text>
          <Text mt={5}>
            use of, or inability to use, our APP; or use of or reliance on any
            content displayed on our APP.
          </Text>
          <Heading mt={10}>In particular, we will not be liable for:</Heading>
          <Text mt={10}>
            Loss of profits, sales, business, or revenue; Business interruption;
            loss of anticipated savings; loss of business opportunity, goodwill
            or reputation; or any indirect or consequential loss or damage.
          </Text>
          <Heading mt={10}>If you are a consumer user:</Heading>
          <Text mt={10}>
            Please note that we only provide our MOBILEAPP, for domestic,
            personal and private use. You agree not to use our APP for any
            commercial or business purposes, and we have no liability to you for
            any loss of profit, loss of business, business interruption, or loss
            of business opportunity.
          </Text>
          <Text mt={5}>
            To the fullest extent permitted by applicable laws, we will not be
            liable for any losses caused (either directly or indirectly) by your
            use of (i) third party products or services available on our APP; or
            (ii) links to third party websites, applications or platforms that
            may be included on our APP.
          </Text>

          <Heading mt={10}>How we may use your personal information</Heading>
          <Text mt={10}>
            We will only use your personal information as set out in our Privacy
            Policy. Where you choose to use or purchase a product or service
            provided by us, your personal information may be further processed
            as set out in any product or service privacy notice. You must please
            read our Privacy Policy together with any more specific privacy
            notices. For any processing of your personal data by a third party,
            you must read their privacy policy which will govern their
            processing activities.
          </Text>
          <Text mt={5}>
            When you create an account you may be given the opportunity to
            opt-in or out of receiving electronic marketing from us, our Group,
            or third parties. You can manage your marketing preferences via our
            APP or unsubscribe from emails at any time. From time to time, we
            may need to send you electronic messages to fulfil contractual,
            legal, regulatory or business obligations regarding products and
            services you use.
          </Text>
          <Text mt={5}>
            When it comes to our products and services we don't compromise on
            security. If you have noticed something that doesn't seem quite
            right with our MOBILEAPP you can let us know by emailing security
            @support.HOMEBASKET.com your name, details of the vulnerability and
            how to reproduce it. For more information on our Vulnerability
            Disclosure Policy, see our Privacy Policy.
          </Text>

          <Heading mt={10}>Making an enquiry through our MOBILEAPP </Heading>
          <Text mt={10}>
            There are limited circumstances where you can submit an enquiry on
            our APP. You must not, nor do we allow you to, upload content onto
            our MOBILEAPP. Anything you submit will be considered
            non-confidential and non-proprietary. You retain all of your
            ownership rights in your content, but you are required to grant us
            and other users of our APP a limited license to use, store and copy
            that content and to distribute and make it available to third
            parties.
          </Text>
          <Text mt={5}>
            We also have the right to disclose your identity to any third party
            who is claiming that any content posted by you to our APP
            constitutes a violation of their intellectual property rights or of
            their right to privacy.
          </Text>
          <Text mt={5}>
            You agree to use our APP in a way which complies with our Acceptable
            Use Policy, detailed below.
          </Text>
          <Heading mt={10}>Disclaimer</Heading>
          <Text mt={10}>
            We are not responsible for viruses and you must not introduce them
          </Text>

          <Text mt={5}>
            We do not guarantee that our APP will be secure or free from bugs or
            viruses.
          </Text>
          <Text mt={5}>
            You are responsible for configuring your information technology,
            computer programmes and platform to access our APP. You should use
            your own virus protection software.
          </Text>
          <Text mt={5}>
            You must not misuse our APP by knowingly introducing viruses,
            Trojans, worms, logic bombs or other material that is malicious or
            technologically harmful. You must not attempt to gain unauthorized
            access to our APP, the server on which our APP is stored or any
            server, computer or database connected to our APP. You must not
            attack our APP via a denial-of-service attack or a distributed
            denial-of service attack. By breaching this provision, you would
            commit a criminal offence under the Computer Misuse Act 1990. We
            will report any such breach to the relevant law enforcement
            authorities and we will cooperate with those authorities by
            disclosing your identity to them. In the event of such a breach,
            your right to use our APP will cease immediately.
          </Text>
          <Text mt={5}>
            We will not be liable for any loss or damage caused by a virus,
            distributed denial-of-service attack, or other technologically
            harmful material that may infect your computer equipment
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TermsandCondition;
