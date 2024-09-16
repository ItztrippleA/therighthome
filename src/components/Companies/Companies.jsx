import { Flex, Image } from "@chakra-ui/react";

const Companies = () => {
  const companies = [
    { src: "./prologis.png", alt: "Prologis" },
    { src: "./tower.png", alt: "Tower" },
    { src: "./equinix.png", alt: "Equinix" },
    { src: "./realty.png", alt: "Realty" },
  ];

  return (
    <Flex
      w="100%"
      justify="space-around"
      align="center"
      gap="1rem"
      p="2rem"
      flexDirection={["column", "row"]}
    >
      {companies.map((company) => (
        <Image key={company.alt} src={company.src} alt={company.alt} w="9rem" />
      ))}
    </Flex>
  );
};

export default Companies;
