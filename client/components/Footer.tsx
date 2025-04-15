import { Box, Flex, Image } from '@chakra-ui/react'

export default function Footer() {
  return (
    <>
      <Box
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        textAlign="center"
      >
        <p>© 2025 Motivating Mike. All rights reserved.</p>
      </Box>
      <Flex>
        <Box>
          <Image
            src="/funPhotos/big-blue-fish.webp"
            alt="A large fish"
            boxSize="82px"
            position="absolute"
            top="8%"
            left="85%"
            zIndex="1"
            width="auto"
          />
          <Image
            src="/images/motivation-mike-logo-edit.png"
            alt="Motivating Mike"
            boxSize="140px"
            position="absolute"
            top="7%"
            left="4%"
            zIndex="1"
            width="auto"
          />
          <Image
            src="/funPhotos/tree.webp"
            alt="A lovely tree"
            boxSize="280px"
            position="absolute"
            top="69%"
            left="84%"
            zIndex="1"
            width="auto"
          />
          <Image
            src="/funPhotos/bush-2.webp"
            alt="A bush"
            boxSize="150px"
            position="absolute"
            left="5%"
            top="82%"
            zIndex="2"
            width="auto"
          />
          <Image
            src="/funPhotos/bush-1.webp"
            alt="A bush"
            boxSize="150px"
            position="absolute"
            left="10%"
            top="81%"
            zIndex="1"
            width="auto"
          />
          <Image
            src="/funPhotos/bush-3.webp"
            alt="A bush"
            boxSize="150px"
            position="absolute"
            left="2%"
            top="81%"
            zIndex="1"
            width="auto"
          />
          <Image
            src="/funPhotos/squirell.webp"
            alt="A squirell holding an acorn"
            boxSize="120px"
            position="absolute"
            left="11%"
            top="79%"
            zIndex="1"
            width="auto"
          />
          
        </Box>
      </Flex>
    </>
  )
}
