// import Head from 'next/head'
import { FormEvent, useState } from 'react';
import { Image, Flex, Link, Button, Text } from '@chakra-ui/core'
import Input from '../components/Input'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const [email, setEmail] = useState('');

  function handleSignUpToNewsletter(event: FormEvent){
    event.preventDefault()
    axios.post('/api/subscribe', {email}).then(response => {
      if(response.status === 201){
        console.log('yes')
        return toast.success('Cadastro realizado com sucesso')
      }

      toast.error('Parece que algo deu errado... Estamos trabalhando nisso')
    })
  }
  return (
    <Flex
      as="main"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Toaster />
      <Flex
        as="form"
        onSubmit={handleSignUpToNewsletter}
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={8}
        marginTop={4}
        width="100%" 
        maxW="400px"
      >
        <Image marginBottom={5} width="100%"  src="/Octocat.png" alt="Simbolo do github, um gato com corpo de polvo (conhecido como octocat)" />
  
        <Text textAlign="center" fontSize="sm" color="gray.400" marginBottom={2}>
          Obrigado por visitar meu repositório! 
          Este formulário irá cadastrar seu e-mail em um banco cloud mongodb.
          Este formulário foi produzido para fundamentos academicos, mas tudo 
          está funcionando perfeitamente!
        </Text>
  
        <Input
          placeholder="Seu melhor e-mail"
          marginTop={2}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
  
        <Button
          type="submit"
          backgroundColor="purple.500"
          height="50px"
          borderRadius="sm"
          marginTop={6}
          _hover={{ backgroundColor: 'purple.600' }}
        >
          INSCREVER
        </Button>
      </Flex>
    </Flex>
  )
}
