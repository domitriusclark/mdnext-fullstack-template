import { Flex, Button, Link, Text, Input, Textarea } from '@chakra-ui/react';
import { Layout } from '@components/Layout';

import Posts from '@components/Posts';
import PostForm from '@components/PostForm';

import { useUser } from '@auth0/nextjs-auth0';

export default function Index() {
  const { user } = useUser()

  return (
    <Layout>
      <Flex direction="column">

        {user ? (
          <>
            <Text textAlign="center" mb={3}>Welcome, {user.name}</Text>
            <Button
              as={Link}
              href="/api/auth/logout"
              textDecoration="none"
              _hover={{
                textDecoration: "none"
              }}
            >
              Logout
            </Button>

            <PostForm />

            <Flex mt={5}>
              <Posts />
            </Flex>

          </>
        ) : (
          <Button
            as={Link}
            href="/api/auth/login"
            textDecoration="none"
            _hover={{
              textDecoration: "none"
            }}
          >
            Login
          </Button>
        )}

      </Flex>
    </Layout>
  );
}
