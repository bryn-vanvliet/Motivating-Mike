import { useEffect, useState } from 'react'
import { Box, Button, Flex, Spinner, VStack } from '@chakra-ui/react'
import PickAvatar from '../components/PickAvatar'
import TaskHistory from '../components/TaskHistory'
import UserProfile from '../components/UserProfile'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../components/Authenticated'
import useUserDataAuth from '../apis/use-user-data-auth'
import { useAuth0 } from '@auth0/auth0-react'

export default function UserHomePage() {
  const { data: userData, isPending, error } = useUserDataAuth()
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const [selectedAvatarId, setSelectedAvatarId] = useState<
    number | null | undefined
  >(userData?.avatarId)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)
  const [stopLoading, setStopLoading] = useState(false)

  useEffect(() => {
    if (userData?.avatarId !== undefined) {
      setSelectedAvatarId(userData.avatarId)
    }
  }, [userData?.avatarId])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStopLoading(true)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  const handleSignIn = () => {
    loginWithRedirect()
  }

  if (isPending && !stopLoading) {
    return (
      <Box height="100vh" backgroundColor="#B3D9E1">
        <Flex height="100%" align="center" justify="center">
          <VStack>
            <h2>Loading profile</h2>
            <Spinner />
          </VStack>
        </Flex>
      </Box>
    )
  }

  // -- IfNotAuthenticated Path -- //
  if (!isAuthenticated && stopLoading) {
    return (
      <Box height="100vh" backgroundColor="#B3D9E1">
        <Flex height="100%" align="center" justify="center">
          <VStack>
            <Button onClick={handleSignIn}>Sign In</Button>
            <p>Sign in to see your data</p>
          </VStack>
        </Flex>
      </Box>
    )
  }
  if (
    !userData ||
    userData.id === undefined ||
    userData.avatarId === undefined
  ) {
    return (
      <Box height="100vh" backgroundColor="#B3D9E1">
        <Flex height="100%" align="center" justify="center">
          <VStack>
            <Button onClick={handleSignIn}>Sign In</Button>
            <h2>No user data found</h2>
          </VStack>
        </Flex>
      </Box>
    )
  }
  if (error) {
    ;<Box height="100vh" backgroundColor="#B3D9E1">
      <Flex height="100%" align="center" justify="center">
        <VStack>
          return <h2>Error: {error.message}</h2>
        </VStack>
      </Flex>
    </Box>
  }

  return (
    <Box minHeight="100vh" bg="#D7C2DB">
      <IfAuthenticated>
        <Flex
          direction={['column', 'column', 'row', 'row']}
          justify="space-between"
          align="flex-start"
          px={[4, 8]}
          py={8}
          gap={[8, 4]}
          bg="#D7C2DB;"
          paddingTop={['10rem', '12rem', '14rem', '17rem']}
          overflow="hidden"
        >
          {/* Left Panel: Profile + Avatar Change */}
          <Box
            flexBasis={['100%', '30%']}
            display="flex"
            flexDirection="column"
            height="45vh"
            marginX="auto"
            alignItems="center"
            gap={6}
            bg="#FAF9F6"
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            position="relative"
          >
            <UserProfile
              userId={userData?.id}
              selectedAvatarId={selectedAvatarId}
            />
            <Button
              colorScheme="blue"
              onClick={openDrawer}
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              // _hover={{ bg: 'gray.400' }}
              // _expanded={{ bg: 'blue.400' }}
              // _focus={{ boxShadow: 'outline' }}
            >
              Change Avatar
            </Button>
          </Box>

          {/* Middle Panel: Task History */}
          <Box
            flexBasis={['100%', '60%']}
            display="flex"
            flexDirection="column"
            height="45vh"
            marginX="auto"
            overflowY="auto"
            position="relative"
          >
            <TaskHistory userId={userData?.id} />
          </Box>

          {/* Right Panel (optional/empty) */}
          {/* <Box flexBasis="20%" /> */}

          <PickAvatar
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            setSelectedAvatarId={setSelectedAvatarId}
            userId={userData?.id}
          />
        </Flex>
        {/* <Button onClick={() => navigate(`/todo-list`)}>Add Todo</Button> */}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Button onClick={handleSignIn}>Add Todo</Button>
        <p>Sign in to see your data</p>
      </IfNotAuthenticated>
    </Box>
  )
}
