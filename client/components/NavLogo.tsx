import { keyframes } from '@emotion/react'
import '@fontsource/indie-flower'
import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

// Define the phasing glow animation
const phase = keyframes`
  0% { opacity: 1 }
  50% { opacity: 0.4 }
  100% { opacity: 1 }
`

const animation = `${phase} 3s ease-in-out infinite`

const fadeInOutBlue = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }`

export default function NavLogo() {
  return (
    <Flex align="center" justify="center">
      <Box position="relative" display="inline-block">
        <Link to="/">
          <Text
            className="motivating"
            position="absolute"
            top={['4rem', '3rem', '2rem', '1rem']}
            transform="translate(-55%, 0%)"
            zIndex="1"
            fontFamily="Bangers"
            fontSize={['5xl', '7xl', '8xl', '9xl']}
            color="#D7C2DB"
            animation={animation}
            textShadow="0px 0px 10px #D100FF"
            textAlign="center"
          >
            Motivating
          </Text>
        </Link>
        <Text
          className="mike"
          as="h1"
          position="absolute"
          top={['6rem', '7rem', '8rem', '9rem']}
          transform="translate(95%, 0%)"
          textShadow="0px 0px 10px #0059b3"
          fontSize={['5xl', '6xl', '7xl', '8xl']}
          color="#00BFFF"
          fontFamily="Bangers"
          textAlign="center"
          zIndex="1"
          animation={`${fadeInOutBlue} 3s ease-in-out infinite`}
        >
          Mike
        </Text>
      </Box>
    </Flex>
  )
}
