import { useAuth0 } from '@auth0/auth0-react'
import useUserDataAuth from '../apis/use-user-data-auth'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '@fontsource/indie-flower'

import {
  Box,
  Button,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import { IfAuthenticated } from '../components/Authenticated'

type FormState = {
  name: string
  avatarId: number | null
}

const avatars = [
  { id: 1, src: '/images/avatars/mike.WebP' },
  { id: 2, src: '/images/avatars/mandy.WebP' },
  { id: 3, src: '/images/avatars/slappy-the-seal.WebP' },
]
export default function Login() {
  const { user, getAccessTokenSilently } = useAuth0()
  const { data: userData, add } = useUserDataAuth()
  const [formState, setFormState] = useState<FormState>({
    name: '',
    avatarId: null,
  })
  const [currentAvatar, setCurrentAvatar] = useState<
    number | undefined | null
  >()
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      navigate('/')
    }
  }, [userData, navigate])

  const addUserData = async () => {
    const token = await getAccessTokenSilently()

    if (user) {
      add.mutateAsync({
        newUser: {
          name: formState.name,
          authId: user.sub as string,
          avatarId: currentAvatar,
        },
        token,
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.id]: event.target.value })
  }

  const handleSelectAvatar = (avatarId: number) => {
    setCurrentAvatar(avatarId)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formState.name == '') {
      alert('Please enter a name')
      return
    }

    await addUserData()
  }

  return (
    <Box
      height="100vh"
      flex="1"
      flexDir="column"
      backgroundColor="#B1CFB7"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="monospace"
      border="1px solid #ccc"
      borderRadius="md"
      boxShadow="md"
      fontWeight="bold"
    >
      <IfAuthenticated>
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor="name" as="h3" fontSize="2xl" mb={4}>
            What shall we call you?
          </FormLabel>
          <Input
            id="name"
            type="text"
            spellCheck="false"
            value={formState.name}
            onChange={handleChange}
          />
          <FormLabel htmlFor="avatarId" as="h3" fontSize="2xl" mb={4} mt={8}>
            Choose your Motivational avatar
          </FormLabel>
          <SimpleGrid columns={3} spacing={6}>
            {avatars.map((avatar) => (
              <Button
                key={avatar.id}
                style={{ width: '250px', height: '250px' }}
                type="button"
                onClick={() => handleSelectAvatar(avatar.id)}
              >
                <Image key={avatar.id} src={avatar.src} />
              </Button>
            ))}
          </SimpleGrid>
          <Button marginTop={6} type="submit">submit</Button>

        </form>
      </IfAuthenticated>
    </Box >
  )
}
