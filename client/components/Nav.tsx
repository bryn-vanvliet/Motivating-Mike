import {
  Box,
  Button,
  Flex,
  Icon,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Logo from './NavLogo'

export default function Nav() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, logout, loginWithRedirect } = useAuth0()
  // console.log(user)

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/login',
      },
    })
  }

  return (
    <nav>
      <Logo />
      <Box position="absolute" right={3} top={2}>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bgColor="#EFD9AA" paddingTop={12}>
            <DrawerCloseButton m={6} />
            <DrawerHeader></DrawerHeader>

            <DrawerBody>
              <Flex direction="column" gap={4}>
                <IfAuthenticated>
                  <Button bgColor="#B3D9E1" onClick={() => navigate(`/`)}>
                    Home
                  </Button>
                  <Button
                    bgColor="#D7C2DB"
                    onClick={() => navigate(`/profile`)}
                  >
                    Profile
                  </Button>
                  <Button
                    bgColor="#B1CFB7"
                    onClick={() => navigate(`/todo-list`)}
                  >
                    Todos
                  </Button>
                </IfAuthenticated>
                <IfNotAuthenticated>
                  <Button bgColor="#D7C2DB" onClick={() => navigate(`/`)}>
                    Home
                  </Button>
                  <Button
                    bgColor="#B3D9E1"
                    onClick={() => navigate(`/profile`)}
                  >
                    Profile
                  </Button>
                  <Button
                    bgColor="#B1CFB7"
                    onClick={() => navigate(`/todo-list`)}
                  >
                    Todos
                  </Button>
                </IfNotAuthenticated>
              </Flex>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Flex justify="flex-end" gap={6} marginTop={4}>
          <IfAuthenticated>
            <Button
              variant="outline"
              color="#123456"
              borderColor="#D7C2DB"
              borderWidth="4px"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Button bgColor="#D7C2DB" onClick={handleSignIn}>
              Sign In
            </Button>
          </IfNotAuthenticated>
          <Icon
            as={HamburgerIcon}
            boxSize={10}
            color="#EFD9AA"
            onClick={onOpen}
            marginTop={0.5}
            marginRight={4}
          />
        </Flex>
      </Box>
    </nav>
  )
}
