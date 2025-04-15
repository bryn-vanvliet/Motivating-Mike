import { Box, Text } from '@chakra-ui/react'

const SpeechBubble = ({ message }: { message: string }) => {
  return (
    <Box
      maxW="300px"
      p={2}
      bg="white"
      color="black"
      borderRadius="xl"
      border="4px solid black"
      position="relative"
      boxShadow="lg"
      fontFamily="'Comic Sans MS', 'Comic Neue', cursive"
      mt="20"
    >
      <Text fontSize="lg">{message}</Text>

      {/* Cartoon tail */}
      <Box
        position="absolute"
        bottom="-20px"
        left="30px"
        width="0"
        height="0"
        borderLeft="15px solid transparent"
        borderRight="15px solid transparent"
        borderTop="20px solid black"
        zIndex="1"
      />
      <Box
        position="absolute"
        bottom="-18px"
        left="32px"
        width="0"
        height="0"
        borderLeft="13px solid transparent"
        borderRight="13px solid transparent"
        borderTop="18px solid white"
        zIndex="2"
      />
    </Box>
  )
}

export default SpeechBubble
