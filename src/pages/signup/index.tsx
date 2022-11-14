import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { IUser } from '../../interface'
import { queries } from '../../services/queries'

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .required()
      .min(5),
    surname: yup.string().required(),
    confirmPassword: yup
                .string()
                .required()
                .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required()
const SignUp = () => {
  const { mutate } = queries.CreateUser({
    onSuccess: () => {
      toast.success('Consentimento criado!')
    },
    onError: (error: AxiosError) => {
      console.log('This Error: ', error)
    }
  })
  const data: IUser = {
    name: 'luzia Gabriela',
    surname: 'Luluca',
    category: ['Pop', 'Mundo', 'Mercados'],
    email: 'aluziagabriela@gmail.com',
    password: '123456'
  }
  const onSubmit = (data: IUser) => {
    mutate(data)
  }
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    resolver: yupResolver(schema)
  })
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Inscreva-se
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'} textAlign='center'>
            Seja <b>Pocket coin forever</b> e aproveite todas as novidades
            quentinhas 😍✨
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Box>
                <FormControl id='firstName' isRequired>
                  <FormLabel>Nome</FormLabel>
                  <Input type='text' {...register('name')} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id='surname'>
                  <FormLabel>Apelido </FormLabel>
                  <Input type='text' {...register('surname')} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id='email' isRequired>
              <FormLabel>Email </FormLabel>
              <Input type='email' {...register('email')} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    type='submit'
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText='Submitting'
                size='lg'
                colorScheme='purple'
                type='submit'
              >
                Confirmar
              </Button>
            </Stack>
          </form>
        </Box>
        <Text align={'center'} textAlign='center'>
          Já está cadastrado ?
          <Link color='purple.500' href='login' fontWeight={700} fontSize='md'>
            {' '}
            Login
          </Link>
        </Text>
      </Stack>
    </Flex>
  )
}
export default SignUp