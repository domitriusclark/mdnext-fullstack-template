import { useQuery, useQueryClient } from 'react-query';
import { gql } from 'graphql-request';
import { fetchGQL } from '@lib/fetchGQL';
import { Flex, Heading, Text } from '@chakra-ui/react';

const queryPosts = gql`
  {    
    posts {
      body
      created_at
      title
      id
    }    
  }
`

function Post({ post }) {
  return (
    <Flex direction="column">
      <Heading as="h1">{post.title}</Heading>
      <Text>{post.body}</Text>
    </Flex>
  )
}

export default function Posts() {
  const { data, isLoading } = useQuery('posts', () => fetchGQL(queryPosts));

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      {data.posts.map(post => <Post post={post} />)}
    </div>
  )

}