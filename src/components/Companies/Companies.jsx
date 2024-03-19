import { Flex, Image } from "@chakra-ui/react";
const Companies = () => {
  return (
    <Flex
      w={"100%"}
      justify={"space-around"}
      align={"center"}
      gap={"1rem"}
      p={"2rem"}
      flexDirection={["column", "row"]}
    >
      <Image src="./prologis.png" alt="Prologis" w={"9rem"} />
      <Image src="./tower.png" alt="tower" w={"9rem"} />
      <Image src="./equinix.png" alt="equinix" w={"9rem"} />
      <Image src="./realty.png" alt="realty" w={"9rem"} />
    </Flex>
  );
};

export default Companies;
